import { UmbMediaTypeItemModel } from './types.js';
import { UmbMediaTypeItemServerDataSource } from './media-type-item.server.data.js';
import { UMB_MEDIA_TYPE_ITEM_STORE_CONTEXT } from './media-type-item.store.js';
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbItemRepositoryBase } from '@umbraco-cms/backoffice/repository';

export class UmbMediaTypeItemRepository extends UmbItemRepositoryBase<UmbMediaTypeItemModel> {
	constructor(host: UmbControllerHost) {
		super(host, UmbMediaTypeItemServerDataSource, UMB_MEDIA_TYPE_ITEM_STORE_CONTEXT);
	}
}
