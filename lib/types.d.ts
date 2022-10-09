export interface LocalStore {
    /**
     * Whether the given key is present in the store
     * @param key
     */
    has(key: string): Promise<boolean>;
    /**
     * Set a value into the store (must be JSON stringifiable)
     * @param key
     * @param value
     * @param expiration - The date upon which the value will be expired (and needs to be remove from the store)
     */
    set(key: string, value: unknown, expiration: Date): Promise<void>;
    /**
     * Remove the given value from the store
     * @param key The key to the value to remove
     */
    remove(key: string): Promise<void>;
    /**
     * Get the given value from the store
     * @param key The key to the value to retrieve
     */
    get(key: string): Promise<unknown>;
    removeExpiredKeys(): Promise<void>;
}
export declare type Version = string | number;
/**
 * A function that compares two versions. It returns TRUE if the {@link newVersion} is greater
 * than the {@link oldVersion}
 */
export declare type VersionComparator = (oldVersion: Version, newVersion: Version) => boolean;
export declare type DateFactory = () => Date;
export interface LocalStorageConfig {
    /**
     * The key used to store the manager's state
     */
    storeKey: string;
    /**
     * The key used to store the version number
     */
    versionKey: string;
    /**
     * The current version number
     */
    version: Version;
    /**
     * The function used to compare two version numbers.
     * Returns true if the new version is greater than the old version
     */
    comparator: VersionComparator;
    /**
     * A factory for the expiration date to remove the store's state
     */
    expiration: DateFactory;
}
export declare type LocalStoreFactory = () => LocalStore;
