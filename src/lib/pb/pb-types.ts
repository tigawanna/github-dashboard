
/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
	/**
	 * 15 characters string to store as record ID.
	 */
	id: string;
	/**
	 * Date string representation for the creation date.
	 */
	created: string;
	/**
	 * Date string representation for the creation date.
	 */
	updated: string;
	/**
	 * The collection id.
	 */
	collectionId: string;
	/**
	 * The collection name.
	 */
	collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
	/**
	 * 15 characters string to store as record ID.
	 * If not set, it will be auto generated.
	 */
	id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
	/**
	 * The username of the auth record.
	 */
	username: string;
	/**
	 * Auth record email address.
	 */
	email: string;
	/**
	 * Auth record email address.
	 */
	tokenKey?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility: boolean;
	/**
	 * Indicates whether the auth record is verified or not.
	 */
	verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
	/**
	 * The username of the auth record.
	 * If not set, it will be auto generated.
	 */
	username?: string;
	/**
	 * Auth record email address.
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Auth record password.
	 */
	password: string;
	/**
	 * Auth record password confirmation.
	 */
	passwordConfirm: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
	/**
	 * The username of the auth record.
	 */
	username?: string;
	/**
	 * The auth record email address.
	 * This field can be updated only by admins or auth records with "Manage" access.
	 * Regular accounts can update their email by calling "Request email change".
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Old auth record password.
	 * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
	 */
	oldPassword?: string;
	/**
	 * New auth record password.
	 */
	password?: string;
	/**
	 * New auth record password confirmation.
	 */
	passwordConfirm?: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
	id: string;
}

// utilities

type MaybeArray<T> = T | T[];

// ===== _mfas block =====
// ===== _mfas =====

export interface MfasResponse extends BaseCollectionResponse {
	collectionName: '_mfas';
	id: string;
	collectionRef: string;
	recordRef: string;
	method: string;
	created: string;
	updated: string;
}

export interface MfasCreate extends BaseCollectionCreate {
	id?: string;
	collectionRef: string;
	recordRef: string;
	method: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface MfasUpdate extends BaseCollectionUpdate {
	id: string;
	collectionRef: string;
	recordRef: string;
	method: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface MfasCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_mfas';
	response: MfasResponse;
	create: MfasCreate;
	update: MfasUpdate;
	relations: Record<string, never>;
}

// ===== _otps block =====
// ===== _otps =====

export interface OtpsResponse extends BaseCollectionResponse {
	collectionName: '_otps';
	id: string;
	collectionRef: string;
	recordRef: string;
	created: string;
	updated: string;
}

export interface OtpsCreate extends BaseCollectionCreate {
	id?: string;
	collectionRef: string;
	recordRef: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface OtpsUpdate extends BaseCollectionUpdate {
	id: string;
	collectionRef: string;
	recordRef: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface OtpsCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_otps';
	response: OtpsResponse;
	create: OtpsCreate;
	update: OtpsUpdate;
	relations: Record<string, never>;
}

// ===== _externalAuths block =====
// ===== _externalAuths =====

export interface ExternalAuthsResponse extends BaseCollectionResponse {
	collectionName: '_externalAuths';
	id: string;
	collectionRef: string;
	recordRef: string;
	provider: string;
	providerId: string;
	created: string;
	updated: string;
}

export interface ExternalAuthsCreate extends BaseCollectionCreate {
	id?: string;
	collectionRef: string;
	recordRef: string;
	provider: string;
	providerId: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface ExternalAuthsUpdate extends BaseCollectionUpdate {
	id: string;
	collectionRef: string;
	recordRef: string;
	provider: string;
	providerId: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface ExternalAuthsCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_externalAuths';
	response: ExternalAuthsResponse;
	create: ExternalAuthsCreate;
	update: ExternalAuthsUpdate;
	relations: Record<string, never>;
}

// ===== _authOrigins block =====
// ===== _authOrigins =====

export interface AuthOriginsResponse extends BaseCollectionResponse {
	collectionName: '_authOrigins';
	id: string;
	collectionRef: string;
	recordRef: string;
	fingerprint: string;
	created: string;
	updated: string;
}

export interface AuthOriginsCreate extends BaseCollectionCreate {
	id?: string;
	collectionRef: string;
	recordRef: string;
	fingerprint: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface AuthOriginsUpdate extends BaseCollectionUpdate {
	id: string;
	collectionRef: string;
	recordRef: string;
	fingerprint: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface AuthOriginsCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_authOrigins';
	response: AuthOriginsResponse;
	create: AuthOriginsCreate;
	update: AuthOriginsUpdate;
	relations: Record<string, never>;
}

// ===== _superusers block =====
// ===== _superusers =====

export interface SuperusersResponse extends AuthCollectionResponse {
	collectionName: '_superusers';
	id: string;
	tokenKey: string;
	email: string;
	emailVisibility: boolean;
	verified: boolean;
	created: string;
	updated: string;
}

export interface SuperusersCreate extends AuthCollectionCreate {
	id?: string;
	email: string;
	emailVisibility?: boolean;
	verified?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface SuperusersUpdate extends AuthCollectionUpdate {
	id: string;
	email: string;
	emailVisibility?: boolean;
	verified?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface SuperusersCollection {
	type: 'auth';
	collectionId: string;
	collectionName: '_superusers';
	response: SuperusersResponse;
	create: SuperusersCreate;
	update: SuperusersUpdate;
	relations: Record<string, never>;
}

// ===== property_user block =====
// ===== property_user =====

export interface PropertyUserResponse extends AuthCollectionResponse {
	collectionName: 'property_user';
	id: string;
	tokenKey: string;
	email: string;
	emailVisibility: boolean;
	verified: boolean;
	username: string;
	avatar: string;
	phone: string;
	tenant: string;
	staff: string;
}

export interface PropertyUserCreate extends AuthCollectionCreate {
	id?: string;
	email: string;
	emailVisibility?: boolean;
	verified?: boolean;
	username?: string;
	avatar?: File | null;
	phone?: string;
	tenant?: string;
	staff?: string;
}

export interface PropertyUserUpdate extends AuthCollectionUpdate {
	id: string;
	email: string;
	emailVisibility?: boolean;
	verified?: boolean;
	username?: string;
	avatar?: File | null;
	phone?: string;
	tenant?: string;
	staff?: string;
}

export interface PropertyUserCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'property_user';
	response: PropertyUserResponse;
	create: PropertyUserCreate;
	update: PropertyUserUpdate;
	relations: {
		tenant: PropertyTenantsListCollection;
		staff: PropertyStaffListCollection;
		property_users_list_via_account: PropertyUsersListCollection[];
		property_staff_list_via_account: PropertyStaffListCollection[];
		property_tenants_list_via_account: PropertyTenantsListCollection[];
		property_todos_via_author: PropertyTodosCollection[];
		property_todos_via_participants: PropertyTodosCollection[];
	};
}

// ===== property_users_list block =====
// ===== property_users_list =====

export interface PropertyUsersListResponse extends BaseCollectionResponse {
	collectionName: 'property_users_list';
	id: string;
	account: string;
}

export interface PropertyUsersListCreate extends BaseCollectionCreate {
	id?: string;
	account: string;
}

export interface PropertyUsersListUpdate extends BaseCollectionUpdate {
	id: string;
	account: string;
}

export interface PropertyUsersListCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_users_list';
	response: PropertyUsersListResponse;
	create: PropertyUsersListCreate;
	update: PropertyUsersListUpdate;
	relations: {
		account: PropertyUserCollection;
	};
}

// ===== property_staff_list block =====
// ===== property_staff_list =====

export interface PropertyStaffListResponse extends BaseCollectionResponse {
	collectionName: 'property_staff_list';
	id: string;
	name: string;
	account: string;
	created: string;
	updated: string;
}

export interface PropertyStaffListCreate extends BaseCollectionCreate {
	id?: string;
	name?: string;
	account: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyStaffListUpdate extends BaseCollectionUpdate {
	id: string;
	name?: string;
	account: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyStaffListCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_staff_list';
	response: PropertyStaffListResponse;
	create: PropertyStaffListCreate;
	update: PropertyStaffListUpdate;
	relations: {
		property_user_via_staff: PropertyUserCollection[];
		account: PropertyUserCollection;
		property_shop_payments_via_staff: PropertyShopPaymentsCollection[];
	};
}

// ===== property_tenants_list block =====
// ===== property_tenants_list =====

export interface PropertyTenantsListResponse extends BaseCollectionResponse {
	collectionName: 'property_tenants_list';
	id: string;
	name: string;
	account: string;
	created: string;
	updated: string;
}

export interface PropertyTenantsListCreate extends BaseCollectionCreate {
	id?: string;
	name?: string;
	account?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyTenantsListUpdate extends BaseCollectionUpdate {
	id: string;
	name?: string;
	account?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyTenantsListCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_tenants_list';
	response: PropertyTenantsListResponse;
	create: PropertyTenantsListCreate;
	update: PropertyTenantsListUpdate;
	relations: {
		property_user_via_tenant: PropertyUserCollection[];
		account: PropertyUserCollection;
		property_shops_via_tenant: PropertyShopsCollection[];
		property_shop_history_via_tenant: PropertyShopHistoryCollection[];
	};
}

// ===== property_shops block =====
// ===== property_shops =====

export interface PropertyShopsResponse extends BaseCollectionResponse {
	collectionName: 'property_shops';
	id: string;
	shop_number: string;
	tenant: string;
	utils: '' | 'elec' | 'water' | 'both' | 'none';
	order: number;
	is_vacant: boolean;
	monthly_rent: number;
	dummy_record: boolean;
	gallery: MaybeArray<string>;
	created: string;
	updated: string;
}

export interface PropertyShopsCreate extends BaseCollectionCreate {
	id?: string;
	shop_number?: string;
	tenant: string;
	utils?: '' | 'elec' | 'water' | 'both' | 'none';
	order?: number;
	is_vacant?: boolean;
	monthly_rent?: number;
	dummy_record?: boolean;
	gallery?: MaybeArray<File>;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyShopsUpdate extends BaseCollectionUpdate {
	id: string;
	shop_number?: string;
	tenant: string;
	utils?: '' | 'elec' | 'water' | 'both' | 'none';
	order?: number;
	'order+'?: number;
	'order-'?: number;
	is_vacant?: boolean;
	monthly_rent?: number;
	'monthly_rent+'?: number;
	'monthly_rent-'?: number;
	dummy_record?: boolean;
	gallery?: MaybeArray<File>;
	'gallery-'?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyShopsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_shops';
	response: PropertyShopsResponse;
	create: PropertyShopsCreate;
	update: PropertyShopsUpdate;
	relations: {
		tenant: PropertyTenantsListCollection;
		property_shop_payments_via_shop: PropertyShopPaymentsCollection[];
		property_shop_history_via_shop: PropertyShopHistoryCollection[];
		property_bills_via_shop: PropertyBillsCollection[];
	};
}

// ===== property_shop_payments block =====
// ===== property_shop_payments =====

export interface PropertyShopPaymentsResponse extends BaseCollectionResponse {
	collectionName: 'property_shop_payments';
	id: string;
	year: number;
	month: number;
	amount: number;
	type: 'deposit' | 'rent' | 'water' | 'elec' | 'fines';
	reciept_number: string;
	shop: string;
	staff: string;
	created: string;
	updated: string;
}

export interface PropertyShopPaymentsCreate extends BaseCollectionCreate {
	id?: string;
	year: number;
	month: number;
	amount: number;
	type: 'deposit' | 'rent' | 'water' | 'elec' | 'fines';
	reciept_number?: string;
	shop: string;
	staff: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyShopPaymentsUpdate extends BaseCollectionUpdate {
	id: string;
	year: number;
	'year+'?: number;
	'year-'?: number;
	month: number;
	'month+'?: number;
	'month-'?: number;
	amount: number;
	'amount+'?: number;
	'amount-'?: number;
	type: 'deposit' | 'rent' | 'water' | 'elec' | 'fines';
	reciept_number?: string;
	shop: string;
	staff: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyShopPaymentsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_shop_payments';
	response: PropertyShopPaymentsResponse;
	create: PropertyShopPaymentsCreate;
	update: PropertyShopPaymentsUpdate;
	relations: {
		shop: PropertyShopsCollection;
		staff: PropertyStaffListCollection;
	};
}

// ===== property_shop_history block =====
// ===== property_shop_history =====

export interface PropertyShopHistoryResponse extends BaseCollectionResponse {
	collectionName: 'property_shop_history';
	id: string;
	shop: string;
	tenant: string;
	monthly_rent: number;
	utils: 'elec' | 'water' | 'both' | 'none';
	shop_number: string;
	created: string;
	updated: string;
}

export interface PropertyShopHistoryCreate extends BaseCollectionCreate {
	id?: string;
	shop: string;
	tenant: string;
	monthly_rent: number;
	utils: 'elec' | 'water' | 'both' | 'none';
	shop_number: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyShopHistoryUpdate extends BaseCollectionUpdate {
	id: string;
	shop: string;
	tenant: string;
	monthly_rent: number;
	'monthly_rent+'?: number;
	'monthly_rent-'?: number;
	utils: 'elec' | 'water' | 'both' | 'none';
	shop_number: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyShopHistoryCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_shop_history';
	response: PropertyShopHistoryResponse;
	create: PropertyShopHistoryCreate;
	update: PropertyShopHistoryUpdate;
	relations: {
		shop: PropertyShopsCollection;
		tenant: PropertyTenantsListCollection;
	};
}

// ===== property_bills block =====
// ===== property_bills =====

export interface PropertyBillsResponse extends BaseCollectionResponse {
	collectionName: 'property_bills';
	id: string;
	shop: string;
	elec_readings: number;
	water_readings: number;
	month: number;
	year: number;
	created: string;
	updated: string;
}

export interface PropertyBillsCreate extends BaseCollectionCreate {
	id?: string;
	shop: string;
	elec_readings?: number;
	water_readings?: number;
	month?: number;
	year?: number;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyBillsUpdate extends BaseCollectionUpdate {
	id: string;
	shop: string;
	elec_readings?: number;
	'elec_readings+'?: number;
	'elec_readings-'?: number;
	water_readings?: number;
	'water_readings+'?: number;
	'water_readings-'?: number;
	month?: number;
	'month+'?: number;
	'month-'?: number;
	year?: number;
	'year+'?: number;
	'year-'?: number;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyBillsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_bills';
	response: PropertyBillsResponse;
	create: PropertyBillsCreate;
	update: PropertyBillsUpdate;
	relations: {
		shop: PropertyShopsCollection;
	};
}

// ===== property_staff_tracking_sheet block =====
// ===== property_staff_tracking_sheet =====

export interface PropertyStaffTrackingSheetResponse extends BaseCollectionResponse {
	collectionName: 'property_staff_tracking_sheet';
	id: string;
	created: string;
	updated: string;
}

export interface PropertyStaffTrackingSheetCreate extends BaseCollectionCreate {
	id?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyStaffTrackingSheetUpdate extends BaseCollectionUpdate {
	id: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyStaffTrackingSheetCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_staff_tracking_sheet';
	response: PropertyStaffTrackingSheetResponse;
	create: PropertyStaffTrackingSheetCreate;
	update: PropertyStaffTrackingSheetUpdate;
	relations: Record<string, never>;
}

// ===== property_todos block =====
// ===== property_todos =====

export interface PropertyTodosResponse extends BaseCollectionResponse {
	collectionName: 'property_todos';
	id: string;
	title: string;
	description: string;
	author: string;
	participants: Array<string>;
	created: string;
	updated: string;
}

export interface PropertyTodosCreate extends BaseCollectionCreate {
	id?: string;
	title?: string;
	description?: string;
	author: string;
	participants?: MaybeArray<string>;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyTodosUpdate extends BaseCollectionUpdate {
	id: string;
	title?: string;
	description?: string;
	author: string;
	participants?: MaybeArray<string>;
	'participants+'?: MaybeArray<string>;
	'participants-'?: MaybeArray<string>;
	created?: string | Date;
	updated?: string | Date;
}

export interface PropertyTodosCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_todos';
	response: PropertyTodosResponse;
	create: PropertyTodosCreate;
	update: PropertyTodosUpdate;
	relations: {
		author: PropertyUserCollection;
		participants: PropertyUserCollection[];
	};
}

// ===== Schema =====

export type Schema = {
	_mfas: MfasCollection;
	_otps: OtpsCollection;
	_externalAuths: ExternalAuthsCollection;
	_authOrigins: AuthOriginsCollection;
	_superusers: SuperusersCollection;
	property_user: PropertyUserCollection;
	property_users_list: PropertyUsersListCollection;
	property_staff_list: PropertyStaffListCollection;
	property_tenants_list: PropertyTenantsListCollection;
	property_shops: PropertyShopsCollection;
	property_shop_payments: PropertyShopPaymentsCollection;
	property_shop_history: PropertyShopHistoryCollection;
	property_bills: PropertyBillsCollection;
	property_staff_tracking_sheet: PropertyStaffTrackingSheetCollection;
	property_todos: PropertyTodosCollection;
}