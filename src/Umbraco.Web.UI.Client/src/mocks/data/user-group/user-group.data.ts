import type { UserGroupItemResponseModel, UserGroupResponseModel } from '@umbraco-cms/backoffice/external/backend-api';

export type UmbMockUserGroupModel = UserGroupResponseModel & UserGroupItemResponseModel;

export const data: Array<UmbMockUserGroupModel> = [
	{
		id: 'user-group-administrators-id',
		name: 'Administrators',
		icon: 'icon-medal',
		documentStartNode: { id: 'all-property-editors-document-id' },
		permissions: [
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Read'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Create'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Update'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Delete'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.CreateBlueprint'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Notifications'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Publish'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Permissions'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Unpublish'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Copy'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Move'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Sort'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.CultureAndHostnames'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.PublicAccess'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Rollback'] },

			{ $type: 'DocumentPermissionModel', verbs: ['Umb.Document.Rollback'], document: { id: 'simple-document-id' } },
		],
		sections: [],
		languages: [],
		hasAccessToAllLanguages: true,
		documentRootAccess: true,
		mediaRootAccess: true,
		isSystemGroup: true,
	},
	{
		id: 'user-group-editors-id',
		name: 'Editors',
		icon: 'icon-tools',
		documentStartNode: { id: 'all-property-editors-document-id' },
		permissions: [
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Read'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Create'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Update'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Delete'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.CreateBlueprint'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Notifications'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Publish'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Unpublish'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Copy'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Move'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Sort'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.PublicAccess'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Rollback'] },
		],
		sections: [],
		languages: [],
		hasAccessToAllLanguages: true,
		documentRootAccess: true,
		mediaRootAccess: true,
		isSystemGroup: true,
	},
	{
		id: 'user-group-sensitive-data-id',
		name: 'Sensitive data',
		icon: 'icon-lock',
		documentStartNode: { id: 'all-property-editors-document-id' },
		permissions: [],
		sections: [],
		languages: [],
		hasAccessToAllLanguages: true,
		documentRootAccess: true,
		mediaRootAccess: true,
		isSystemGroup: true,
	},
	{
		id: 'user-group-translators-id',
		name: 'Translators',
		icon: 'icon-globe',
		documentStartNode: { id: 'all-property-editors-document-id' },
		permissions: [
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Read'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Update'] },
		],
		sections: [],
		languages: [],
		hasAccessToAllLanguages: true,
		documentRootAccess: true,
		mediaRootAccess: true,
		isSystemGroup: true,
	},
	{
		id: 'user-group-writers-id',
		name: 'Writers',
		icon: 'icon-edit',
		documentStartNode: { id: 'all-property-editors-document-id' },
		permissions: [
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Read'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Create'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Update'] },
			{ $type: 'FallbackPermissionModel', verbs: ['Umb.Document.Notifications'] },
		],
		sections: [],
		languages: [],
		hasAccessToAllLanguages: true,
		documentRootAccess: true,
		mediaRootAccess: true,
		isSystemGroup: false,
	},
];
