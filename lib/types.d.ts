export interface LocalStore {
    has(key: string): Promise<boolean>;
    set(key: string, value: any, expiration: Date): Promise<void>;
    remove(key: string): Promise<void>;
    get(key: string): Promise<any>;
    removeExpiredKeys(): Promise<void>;
}
export declare type Version = string | number;
export declare type VersionComparator = (oldVersion: Version, newVersion: Version) => boolean;
export declare type DateFactory = () => Date;
export interface LocalStorageConfig {
    storeKey: string;
    versionKey: string;
    version: Version;
    comparator: VersionComparator;
    expiration: DateFactory;
}
export declare type LocalStoreFactory = () => LocalStore;
