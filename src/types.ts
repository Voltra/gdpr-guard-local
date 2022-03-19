export interface LocalStore {
	has(key: string): Promise<boolean>;

	set(key: string, value: any, expiration: Date): Promise<void>;

	remove(key: string): Promise<void>;

	get(key: string): Promise<any>;

	removeExpiredKeys(): Promise<void>;
}

export type Version = string | number;
export type VersionComparator = (oldVersion: Version, newVersion: Version) => boolean;
export type DateFactory = () => Date;

export interface LocalStorageConfig {
	storeKey: string;
	versionKey: string;
	version: Version;
	comparator: VersionComparator;
	expiration: DateFactory;
}

export type LocalStoreFactory = () => LocalStore;
