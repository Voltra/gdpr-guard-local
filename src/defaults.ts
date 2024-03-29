import { DateFactory, LocalStorageConfig, LocalStore, LocalStoreFactory, Version, VersionComparator } from "./types"
import store from "store"
import compat from "store/plugins/v1-backcompat"
import expire from "store/plugins/expire"
import addMonths from "date-fns/addMonths"

export const versionComparator: VersionComparator = (oldVersion: Version, newVersion: Version) => {
	return newVersion !== oldVersion;
};

const plugins = [
	...compat,
	expire,
];

plugins.forEach(plugin => store.addPlugin(plugin));

export const defaultStoreFactory: LocalStoreFactory = () => store as LocalStore;

/**
 * Default value for the expiration. GDPR says max duration is 13 months
 */
export const expiration: DateFactory = () => addMonths(new Date(), 13);

/**
 * Parts of the default config that are most used.
 * Default string equality test for versions, 13 months expiration
 */
export const defaultConfigParts: Partial<LocalStorageConfig> = {
	comparator: versionComparator,
	expiration,
};

/**
 * Full default config.
 * Keys are "gdpr" for the manager's state and "gdpr__version" for the version number.
 */
export const defaultConfig: LocalStorageConfig = {
	storeKey: "gdpr",
	versionKey: "gdpr__version",
	version: "v0.0.0",
	comparator: versionComparator,
	expiration,
};

/**
 * Make a config object by overriding the {@link defaultConfig}
 * @param config The user-provided config
 */
export const makeConfig = (config: Partial<LocalStorageConfig> = {}): LocalStorageConfig => {
	return {
		...defaultConfig,
		...config,
	};
};
