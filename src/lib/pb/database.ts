/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
interface BaseCollectionRecord {
	id: string;
	created: string;
	updated: string;
	collectionId: string;
	collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
interface BaseCollectionRecordCreate {
	id?: string;
}

// https://pocketbase.io/docs/collections/#auth-collection
interface AuthCollectionRecord extends BaseCollectionRecord {
	username: string;
	email: string;
	emailVisibility: boolean;
	verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
interface AuthCollectionRecordCreate extends BaseCollectionRecordCreate {
	username?: string;
	email?: string;
	emailVisibility?: boolean;
	verified?: boolean;
	password: string;
	passwordConfirm: string;
}

// https://pocketbase.io/docs/api-records/#update-record
interface AuthCollectionRecordUpdate {
	username?: string;
	email?: string;
	emailVisibility?: boolean;
	verified?: boolean;
	password?: string;
	passwordConfirm?: string;
}

// https://pocketbase.io/docs/collections/#view-collection
interface ViewCollectionRecord {
	id: string;
}

// utilities

type MaybeArray<T> = T | T[];

// ===== pocketbook_user =====

export interface PocketbookUserResponse extends AuthCollectionRecord {
	collectionName: 'pocketbook_user';
	avatar: string;
	access_token: string;
	bio: string;
	github_login: string;
	github_avatar: string;
}

export interface PocketbookUserCreate extends AuthCollectionRecordCreate {
	avatar?: string | URL;
	access_token?: string;
	bio?: string;
	github_login?: string;
	github_avatar?: string | URL;
}

export interface PocketbookUserUpdate extends AuthCollectionRecordUpdate {
	avatar?: string | URL;
	access_token?: string;
	bio?: string;
	github_login?: string;
	github_avatar?: string | URL;
}

export interface PocketbookUserCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'pocketbook_user';
	response: PocketbookUserResponse;
	create: PocketbookUserCreate;
	update: PocketbookUserUpdate;
	relations: {
		'pocketbook_reactions(user)': PocketbookReactionsCollection[];
		'pocketbook_posts(user)': PocketbookPostsCollection[];
		'pocketbook_friends(user_a)': PocketbookFriendsCollection[];
		'pocketbook_friends(user_b)': PocketbookFriendsCollection[];
		'pocketbook_friendship(user_a)': PocketbookFriendshipCollection[];
		'pocketbook_friendship(user_b)': PocketbookFriendshipCollection[];
	};
}

// ===== pocketbook_reactions =====

export interface PocketbookReactionsResponse extends BaseCollectionRecord {
	collectionName: 'pocketbook_reactions';
	post: string;
	user: string;
	liked: 'yes' | 'no';
}

export interface PocketbookReactionsCreate extends BaseCollectionRecordCreate {
	post: string;
	user: string;
	liked: 'yes' | 'no';
}

export interface PocketbookReactionsUpdate {
	post?: string;
	user?: string;
	liked?: 'yes' | 'no';
}

export interface PocketbookReactionsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'pocketbook_reactions';
	response: PocketbookReactionsResponse;
	create: PocketbookReactionsCreate;
	update: PocketbookReactionsUpdate;
	relations: {
		post: PocketbookPostsCollection;
		user: PocketbookUserCollection;
	};
}

// ===== mashamba_listings =====

export interface MashambaListingsResponse extends BaseCollectionRecord {
	collectionName: 'mashamba_listings';
	location: string;
	longitude: number;
	latitude: number;
	images: Array<string>;
	amenities: any;
	owner: string;
	price: number;
	status: 'available' | 'sold';
	type: '' | 'land' | 'house';
	description: string;
	property: any;
}

export interface MashambaListingsCreate extends BaseCollectionRecordCreate {
	location: string;
	longitude?: number;
	latitude?: number;
	images: MaybeArray<string>;
	amenities?: any;
	owner?: string;
	price: number;
	status: 'available' | 'sold';
	type?: '' | 'land' | 'house';
	description?: string;
	property?: any;
}

export interface MashambaListingsUpdate {
	location?: string;
	longitude?: number;
	'longitude+'?: number;
	'longitude-'?: number;
	latitude?: number;
	'latitude+'?: number;
	'latitude-'?: number;
	images?: MaybeArray<string>;
	'images-'?: MaybeArray<string>;
	amenities?: any;
	owner?: string;
	price?: number;
	'price+'?: number;
	'price-'?: number;
	status?: 'available' | 'sold';
	type?: '' | 'land' | 'house';
	description?: string;
	property?: any;
}

export interface MashambaListingsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'mashamba_listings';
	response: MashambaListingsResponse;
	create: MashambaListingsCreate;
	update: MashambaListingsUpdate;
	relations: {
		owner: MashambaOwnerCollection;
		'mashamba_user(listings)': MashambaUserCollection[];
	};
}

// ===== mashamba_owner =====

export interface MashambaOwnerResponse extends BaseCollectionRecord {
	collectionName: 'mashamba_owner';
	name: string;
	email: string;
	phone: string;
	location: string;
	image: string;
	whatsapp: string;
}

export interface MashambaOwnerCreate extends BaseCollectionRecordCreate {
	name: string;
	email: string;
	phone: string;
	location: string;
	image: string;
	whatsapp?: string;
}

export interface MashambaOwnerUpdate {
	name?: string;
	email?: string;
	phone?: string;
	location?: string;
	image?: string;
	whatsapp?: string;
}

export interface MashambaOwnerCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'mashamba_owner';
	response: MashambaOwnerResponse;
	create: MashambaOwnerCreate;
	update: MashambaOwnerUpdate;
	relations: {
		'mashamba_listings(owner)': MashambaListingsCollection[];
	};
}

// ===== utility_staff =====

export interface UtilityStaffResponse extends AuthCollectionRecord {
	collectionName: 'utility_staff';
	name: string;
	type: 'caretaker' | 'manager' | 'cashier';
	avatar: string;
}

export interface UtilityStaffCreate extends AuthCollectionRecordCreate {
	name: string;
	type: 'caretaker' | 'manager' | 'cashier';
	avatar?: string;
}

export interface UtilityStaffUpdate extends AuthCollectionRecordUpdate {
	name?: string;
	type?: 'caretaker' | 'manager' | 'cashier';
	avatar?: string;
}

export interface UtilityStaffCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'utility_staff';
	response: UtilityStaffResponse;
	create: UtilityStaffCreate;
	update: UtilityStaffUpdate;
	relations: {
		'tasky_tasks(created_by)': TaskyTasksCollection[];
		'tasky_tasks(updated_by)': TaskyTasksCollection[];
		'tasky_tasks(approved_by)': TaskyTasksCollection[];
		'tasky_tasks(funded_by)': TaskyTasksCollection[];
		'tasky_tasks(marked_completed_by)': TaskyTasksCollection[];
		'tasky_tasks(rejected_by)': TaskyTasksCollection[];
		'tasky_tasks(marked_in_progress_by)': TaskyTasksCollection[];
		'tasky_staff_details(leave_requested_by)': TaskyStaffDetailsCollection[];
		'tasky_staff_details(leave_approved_by)': TaskyStaffDetailsCollection[];
	};
}

// ===== tasky_tasks =====

export interface TaskyTasksResponse extends BaseCollectionRecord {
	collectionName: 'tasky_tasks';
	title: string;
	description: string;
	type: 'todo' | 'repairs' | 'maintenance' | 'recurring' | 'other';
	status: 'created' | 'approved' | 'funded' | 'in_progress' | 'completed' | 'rejected';
	created_by: string;
	updated_by: string;
	approved_by: string;
	funded_by: string;
	marked_completed_by: string;
	approved_on: string;
	funded_on: string;
	completed_on: string;
	quotation: string;
	deadline: string;
	frequency: '' | 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	rejected_by: string;
	marked_in_progress_by: string;
	rejected_on: string;
	marked_in_progress_on: string;
}

export interface TaskyTasksCreate extends BaseCollectionRecordCreate {
	title: string;
	description: string;
	type: 'todo' | 'repairs' | 'maintenance' | 'recurring' | 'other';
	status: 'created' | 'approved' | 'funded' | 'in_progress' | 'completed' | 'rejected';
	created_by: string;
	updated_by?: string;
	approved_by?: string;
	funded_by?: string;
	marked_completed_by?: string;
	approved_on?: string | Date;
	funded_on?: string | Date;
	completed_on?: string | Date;
	quotation?: string | URL;
	deadline?: string | Date;
	frequency?: '' | 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	rejected_by?: string;
	marked_in_progress_by?: string;
	rejected_on?: string | Date;
	marked_in_progress_on?: string | Date;
}

export interface TaskyTasksUpdate {
	title?: string;
	description?: string;
	type?: 'todo' | 'repairs' | 'maintenance' | 'recurring' | 'other';
	status?: 'created' | 'approved' | 'funded' | 'in_progress' | 'completed' | 'rejected';
	created_by?: string;
	updated_by?: string;
	approved_by?: string;
	funded_by?: string;
	marked_completed_by?: string;
	approved_on?: string | Date;
	funded_on?: string | Date;
	completed_on?: string | Date;
	quotation?: string | URL;
	deadline?: string | Date;
	frequency?: '' | 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	rejected_by?: string;
	marked_in_progress_by?: string;
	rejected_on?: string | Date;
	marked_in_progress_on?: string | Date;
}

export interface TaskyTasksCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'tasky_tasks';
	response: TaskyTasksResponse;
	create: TaskyTasksCreate;
	update: TaskyTasksUpdate;
	relations: {
		created_by: UtilityStaffCollection;
		updated_by: UtilityStaffCollection;
		approved_by: UtilityStaffCollection;
		funded_by: UtilityStaffCollection;
		marked_completed_by: UtilityStaffCollection;
		rejected_by: UtilityStaffCollection;
		marked_in_progress_by: UtilityStaffCollection;
	};
}

// ===== tasky_staff_details =====

export interface TaskyStaffDetailsResponse extends BaseCollectionRecord {
	collectionName: 'tasky_staff_details';
	leave_type: 'sick' | 'annual' | 'maternity' | 'other';
	leave_reason: string;
	leave_start: string;
	leave_end: string;
	leave_requested_by: string;
	leave_approved_by: string;
	leave_request_status: 'pending' | 'approved' | 'rejected';
	remaining_leave_days: number;
	remaining_sick_leave_days: number;
	leave_approved_on: string;
}

export interface TaskyStaffDetailsCreate extends BaseCollectionRecordCreate {
	leave_type: 'sick' | 'annual' | 'maternity' | 'other';
	leave_reason: string;
	leave_start: string | Date;
	leave_end: string | Date;
	leave_requested_by: string;
	leave_approved_by?: string;
	leave_request_status: 'pending' | 'approved' | 'rejected';
	remaining_leave_days: number;
	remaining_sick_leave_days: number;
	leave_approved_on?: string | Date;
}

export interface TaskyStaffDetailsUpdate {
	leave_type?: 'sick' | 'annual' | 'maternity' | 'other';
	leave_reason?: string;
	leave_start?: string | Date;
	leave_end?: string | Date;
	leave_requested_by?: string;
	leave_approved_by?: string;
	leave_request_status?: 'pending' | 'approved' | 'rejected';
	remaining_leave_days?: number;
	'remaining_leave_days+'?: number;
	'remaining_leave_days-'?: number;
	remaining_sick_leave_days?: number;
	'remaining_sick_leave_days+'?: number;
	'remaining_sick_leave_days-'?: number;
	leave_approved_on?: string | Date;
}

export interface TaskyStaffDetailsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'tasky_staff_details';
	response: TaskyStaffDetailsResponse;
	create: TaskyStaffDetailsCreate;
	update: TaskyStaffDetailsUpdate;
	relations: {
		leave_requested_by: UtilityStaffCollection;
		leave_approved_by: UtilityStaffCollection;
	};
}

// ===== pocketbook_notifications =====

export interface PocketbookNotificationsResponse extends BaseCollectionRecord {
	collectionName: 'pocketbook_notifications';
	name: string;
	message: string;
	item_id: string;
	type: 'like' | 'reply' | 'follow';
}

export interface PocketbookNotificationsCreate extends BaseCollectionRecordCreate {
	name: string;
	message: string;
	item_id?: string;
	type: 'like' | 'reply' | 'follow';
}

export interface PocketbookNotificationsUpdate {
	name?: string;
	message?: string;
	item_id?: string;
	type?: 'like' | 'reply' | 'follow';
}

export interface PocketbookNotificationsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'pocketbook_notifications';
	response: PocketbookNotificationsResponse;
	create: PocketbookNotificationsCreate;
	update: PocketbookNotificationsUpdate;
	relations: Record<string, never>;
}

// ===== utility_shops =====

export interface UtilityShopsResponse extends BaseCollectionRecord {
	collectionName: 'utility_shops';
	shop_number: string;
	tenant: string;
	utils: '' | 'elec' | 'water' | 'both' | 'none';
	order: number;
	is_vacant: boolean;
}

export interface UtilityShopsCreate extends BaseCollectionRecordCreate {
	shop_number: string;
	tenant?: string;
	utils?: '' | 'elec' | 'water' | 'both' | 'none';
	order?: number;
	is_vacant?: boolean;
}

export interface UtilityShopsUpdate {
	shop_number?: string;
	tenant?: string;
	utils?: '' | 'elec' | 'water' | 'both' | 'none';
	order?: number;
	'order+'?: number;
	'order-'?: number;
	is_vacant?: boolean;
}

export interface UtilityShopsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'utility_shops';
	response: UtilityShopsResponse;
	create: UtilityShopsCreate;
	update: UtilityShopsUpdate;
	relations: {
		tenant: UtilityTenantsCollection;
		'utility_bills(shop)': UtilityBillsCollection[];
	};
}

// ===== utility_tenants_base =====

export interface UtilityTenantsBaseResponse extends BaseCollectionRecord {
	collectionName: 'utility_tenants_base';
	name: string;
	contact: string;
	email: string;
	details: string;
	supa_id: string;
}

export interface UtilityTenantsBaseCreate extends BaseCollectionRecordCreate {
	name: string;
	contact?: string;
	email?: string;
	details?: string;
	supa_id?: string;
}

export interface UtilityTenantsBaseUpdate {
	name?: string;
	contact?: string;
	email?: string;
	details?: string;
	supa_id?: string;
}

export interface UtilityTenantsBaseCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'utility_tenants_base';
	response: UtilityTenantsBaseResponse;
	create: UtilityTenantsBaseCreate;
	update: UtilityTenantsBaseUpdate;
	relations: Record<string, never>;
}

// ===== utility_bills =====

export interface UtilityBillsResponse extends BaseCollectionRecord {
	collectionName: 'utility_bills';
	shop: string;
	elec_readings: number;
	water_readings: number;
	month: number;
	year: number;
}

export interface UtilityBillsCreate extends BaseCollectionRecordCreate {
	shop: string;
	elec_readings?: number;
	water_readings?: number;
	month: number;
	year: number;
}

export interface UtilityBillsUpdate {
	shop?: string;
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
}

export interface UtilityBillsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'utility_bills';
	response: UtilityBillsResponse;
	create: UtilityBillsCreate;
	update: UtilityBillsUpdate;
	relations: {
		shop: UtilityShopsCollection;
	};
}

// ===== pocketbook_posts =====

export interface PocketbookPostsResponse extends BaseCollectionRecord {
	collectionName: 'pocketbook_posts';
	body: string;
	media: string;
	user: string;
	parent: string;
	depth: number;
}

export interface PocketbookPostsCreate extends BaseCollectionRecordCreate {
	body?: string;
	media?: string;
	user: string;
	parent?: string;
	depth?: number;
}

export interface PocketbookPostsUpdate {
	body?: string;
	media?: string;
	user?: string;
	parent?: string;
	depth?: number;
	'depth+'?: number;
	'depth-'?: number;
}

export interface PocketbookPostsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'pocketbook_posts';
	response: PocketbookPostsResponse;
	create: PocketbookPostsCreate;
	update: PocketbookPostsUpdate;
	relations: {
		'pocketbook_reactions(post)': PocketbookReactionsCollection[];
		user: PocketbookUserCollection;
		parent: PocketbookPostsCollection;
		'pocketbook_posts(parent)': PocketbookPostsCollection[];
	};
}

// ===== pocketbook_friends =====

export interface PocketbookFriendsResponse extends BaseCollectionRecord {
	collectionName: 'pocketbook_friends';
	user_a: string;
	user_b: string;
	user_a_follow_user_b: '' | 'yes' | 'no';
	user_b_follow_user_a: '' | 'yes' | 'no';
}

export interface PocketbookFriendsCreate extends BaseCollectionRecordCreate {
	user_a?: string;
	user_b?: string;
	user_a_follow_user_b?: '' | 'yes' | 'no';
	user_b_follow_user_a?: '' | 'yes' | 'no';
}

export interface PocketbookFriendsUpdate {
	user_a?: string;
	user_b?: string;
	user_a_follow_user_b?: '' | 'yes' | 'no';
	user_b_follow_user_a?: '' | 'yes' | 'no';
}

export interface PocketbookFriendsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'pocketbook_friends';
	response: PocketbookFriendsResponse;
	create: PocketbookFriendsCreate;
	update: PocketbookFriendsUpdate;
	relations: {
		user_a: PocketbookUserCollection;
		user_b: PocketbookUserCollection;
	};
}

// ===== utility_tenants =====

export interface UtilityTenantsResponse extends AuthCollectionRecord {
	collectionName: 'utility_tenants';
	phone: string;
	avatar: string;
}

export interface UtilityTenantsCreate extends AuthCollectionRecordCreate {
	phone?: string;
	avatar?: string;
}

export interface UtilityTenantsUpdate extends AuthCollectionRecordUpdate {
	phone?: string;
	avatar?: string;
}

export interface UtilityTenantsCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'utility_tenants';
	response: UtilityTenantsResponse;
	create: UtilityTenantsCreate;
	update: UtilityTenantsUpdate;
	relations: {
		'utility_shops(tenant)': UtilityShopsCollection[];
	};
}

// ===== pocketbook_friendship =====

export interface PocketbookFriendshipResponse extends ViewCollectionRecord {
	collectionName: 'pocketbook_friendship';
	user_a: string;
	user_b: string;
	user_a_follow_user_b: '' | 'yes' | 'no';
	user_b_follow_user_a: '' | 'yes' | 'no';
	user_a_name: string;
	user_b_name: string;
	user_a_avatar: string;
	user_b_avatar: string;
	user_a_email: string;
	user_b_email: string;
}

export interface PocketbookFriendshipCollection {
	type: 'view';
	collectionId: string;
	collectionName: 'pocketbook_friendship';
	response: PocketbookFriendshipResponse;
	relations: {
		user_a: PocketbookUserCollection;
		user_b: PocketbookUserCollection;
	};
}

// ===== mashamba_user =====

export interface MashambaUserResponse extends AuthCollectionRecord {
	collectionName: 'mashamba_user';
	listings: Array<string>;
}

export interface MashambaUserCreate extends AuthCollectionRecordCreate {
	listings?: MaybeArray<string>;
}

export interface MashambaUserUpdate extends AuthCollectionRecordUpdate {
	listings?: MaybeArray<string>;
	'listings+'?: MaybeArray<string>;
	'listings-'?: MaybeArray<string>;
}

export interface MashambaUserCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'mashamba_user';
	response: MashambaUserResponse;
	create: MashambaUserCreate;
	update: MashambaUserUpdate;
	relations: {
		listings: MashambaListingsCollection[];
	};
}

// ===== github_oauth =====

export interface GithubOauthResponse extends AuthCollectionRecord {
	collectionName: 'github_oauth';
	accessToken: string;
}

export interface GithubOauthCreate extends AuthCollectionRecordCreate {
	accessToken?: string;
}

export interface GithubOauthUpdate extends AuthCollectionRecordUpdate {
	accessToken?: string;
}

export interface GithubOauthCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'github_oauth';
	response: GithubOauthResponse;
	create: GithubOauthCreate;
	update: GithubOauthUpdate;
	relations: Record<string, never>;
}

// ===== Schema =====

export type Schema = {
	// pocketbook_user: PocketbookUserCollection;
	// pocketbook_reactions: PocketbookReactionsCollection;
	// mashamba_listings: MashambaListingsCollection;
	// mashamba_owner: MashambaOwnerCollection;
	// utility_staff: UtilityStaffCollection;
	// tasky_tasks: TaskyTasksCollection;
	// tasky_staff_details: TaskyStaffDetailsCollection;
	// pocketbook_notifications: PocketbookNotificationsCollection;
	// utility_shops: UtilityShopsCollection;
	// utility_tenants_base: UtilityTenantsBaseCollection;
	// utility_bills: UtilityBillsCollection;
	// pocketbook_posts: PocketbookPostsCollection;
	// pocketbook_friends: PocketbookFriendsCollection;
	// utility_tenants: UtilityTenantsCollection;
	// pocketbook_friendship: PocketbookFriendshipCollection;
	// mashamba_user: MashambaUserCollection;
	github_oauth: GithubOauthCollection;
};
