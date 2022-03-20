import { DateFactory, LocalStorageConfig, LocalStoreFactory, VersionComparator } from "./types";
export declare const versionComparator: VersionComparator;
export declare const defaultStoreFactory: LocalStoreFactory;
/**
 * Default value for the expiration. GDPR says max duration is 13 months
 */
export declare const expiration: DateFactory;
/**
 * Parts of the default config that are most used.
 * Default string equality test for versions, 13 months expiration
 */
export declare const defaultConfigParts: Partial<LocalStorageConfig>;
/**
 * Full default config.
 * Keys are "gdpr" for the manager's state and "gdpr__version" for the version number.
 */
export declare const defaultConfig: LocalStorageConfig;
/**
 * Make a config object by overriding the {@link defaultConfig}
 * @param config The user-provided config
 */
export declare const makeConfig: (config?: Partial<LocalStorageConfig>) => LocalStorageConfig;
