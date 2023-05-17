import { UmbItemRepository } from 'src/libs/repository';
import { UmbControllerHostElement } from 'src/libs/controller-api';
import { UmbArrayState, UmbObserverController } from 'src/libs/observable-api';
import { createExtensionClass } from 'src/libs/extension-api';
import { umbExtensionsRegistry } from 'src/libs/extension-registry';
import {
	UMB_CONFIRM_MODAL,
	UMB_MODAL_CONTEXT_TOKEN,
	UmbModalContext,
	UmbModalToken,
	UmbPickerModalData,
} from 'src/libs/modal';
import { UmbContextConsumerController } from 'src/libs/context-api';
import { ItemResponseModelBaseModel } from 'src/libs/backend-api';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/events';

export class UmbPickerInputContext<ItemType extends ItemResponseModelBaseModel> {
	host: UmbControllerHostElement;
	modalAlias: string | UmbModalToken;
	repository?: UmbItemRepository<ItemType>;
	#getUnique: (entry: ItemType) => string | undefined;

	public modalContext?: UmbModalContext;

	public pickableFilter?: (item: ItemType) => boolean = () => true;

	#init: Promise<unknown>;

	#selection = new UmbArrayState<string>([]);
	selection = this.#selection.asObservable();

	#selectedItems = new UmbArrayState<ItemType>([]);
	selectedItems = this.#selectedItems.asObservable();

	#selectedItemsObserver?: UmbObserverController<ItemType[]>;

	max = Infinity;
	min = 0;

	/* TODO: find a better way to have a getUniqueMethod. If we want to support trees/items of different types,
	then it need to be bound to the type and can't be a generic method we pass in. */
	constructor(
		host: UmbControllerHostElement,
		repositoryAlias: string,
		modalAlias: string | UmbModalToken,
		getUniqueMethod?: (entry: ItemType) => string | undefined
	) {
		this.host = host;
		this.modalAlias = modalAlias;
		this.#getUnique = getUniqueMethod || ((entry) => entry.id || '');

		//TODO: The promise can probably be done in a cleaner way.
		const repositoryPromise: Promise<void> = new Promise((resolve) => {
			new UmbObserverController(
				this.host,

				// TODO: this code is reused in multiple places, so it should be extracted to a function
				umbExtensionsRegistry.getByTypeAndAlias('repository', repositoryAlias),
				async (repositoryManifest) => {
					if (!repositoryManifest) return;

					try {
						const result = await createExtensionClass<UmbItemRepository<ItemType>>(repositoryManifest, [this.host]);
						this.repository = result;
						resolve();
					} catch (error) {
						throw new Error('Could not create repository with alias: ' + repositoryAlias + '');
					}
				}
			);
		});

		this.#init = Promise.all([
			repositoryPromise,
			new UmbContextConsumerController(this.host, UMB_MODAL_CONTEXT_TOKEN, (instance) => {
				this.modalContext = instance;
			}).asPromise(),
		]);
	}

	getSelection() {
		return this.#selection.value;
	}

	setSelection(selection: string[]) {
		this.#selection.next(selection);

		//TODO: Check if it's safe to call requestItems here.
		this.#requestItems();
	}

	// TODO: If modalAlias is a ModalToken, then via TS, we should get the correct type for pickerData. Otherwise fallback to unknown.
	openPicker(pickerData?: Partial<UmbPickerModalData<ItemType>>) {
		if (!this.modalContext) throw new Error('Modal context is not initialized');

		const modalHandler = this.modalContext.open(this.modalAlias, {
			multiple: this.max === 1 ? false : true,
			selection: [...this.getSelection()],
			pickableFilter: this.pickableFilter,
			...pickerData,
		});

		modalHandler?.onSubmit().then(({ selection }: any) => {
			this.setSelection(selection);
			this.host.dispatchEvent(new UmbChangeEvent());
			// TODO: we only want to request items that are not already in the selectedItems array
		});
	}

	async requestRemoveItem(unique: string) {
		await this.#init;
		if (!this.repository) throw new Error('Repository is not initialized');

		// TODO: id won't always be available on the model, so we need to get the unique property from somewhere. Maybe the repository?
		const item = this.#selectedItems.value.find((item) => this.#getUnique(item) === unique);
		if (!item) throw new Error('Could not find item with unique: ' + unique);

		const modalHandler = this.modalContext?.open(UMB_CONFIRM_MODAL, {
			color: 'danger',
			headline: `Remove ${item.name}?`,
			content: 'Are you sure you want to remove this item',
			confirmLabel: 'Remove',
		});

		await modalHandler?.onSubmit();
		this.#removeItem(unique);
	}

	async #requestItems() {
		await this.#init;
		if (!this.repository) throw new Error('Repository is not initialized');
		if (this.#selectedItemsObserver) this.#selectedItemsObserver.destroy();

		const { asObservable } = await this.repository.requestItems(this.getSelection());

		if (asObservable) {
			this.#selectedItemsObserver = new UmbObserverController(this.host, asObservable(), (data) =>
				this.#selectedItems.next(data)
			);
		}
	}

	#removeItem(unique: string) {
		const newSelection = this.getSelection().filter((value) => value !== unique);
		this.#selection.next(newSelection);
		// remove items items from selectedItems array
		// TODO: id won't always be available on the model, so we need to get the unique property from somewhere. Maybe the repository?
		const newSelectedItems = this.#selectedItems.value.filter((item) => this.#getUnique(item) !== unique);
		this.#selectedItems.next(newSelectedItems);
	}
}
