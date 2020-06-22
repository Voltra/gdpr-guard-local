import { VersionComparator, LocalStoreFactory, LocalStorageConfig } from "./types";
export declare const versionComparator: VersionComparator;
export declare const defaultStoreFactory: LocalStoreFactory;
export declare const expiration: () => Date;
export declare const defaultConfigParts: Partial<LocalStorageConfig>;
export declare const defaultConfig: LocalStorageConfig;
export declare const makeConfig: (config?: Partial<LocalStorageConfig>) => LocalStorageConfig;
