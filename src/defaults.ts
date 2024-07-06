import { DateFactory, LocalStorageConfig, LocalStore, LocalStoreFactory, Version, VersionComparator } from "./types"
import store from "store"
import compat from "store/plugins/v1-backcompat"
import expire from "store/plugins/expire"
// import { addMonths } from "date-fns/addMonths"
import { addMonths } from "date-fns/fp"

/**
 * GDPR says max duration is 13 months
 */
const add13Months = addMonths(13);

export const versionComparator: VersionComparator = (oldVersion: Version, newVersion: Version) => {
	return newVersion !== oldVersion;
};

const plugins = [
	// @ts-ignore TS2548 (plugins and their types are poorly supported)
	...compat,
	expire,
];

plugins.forEach(plugin => store.addPlugin(plugin));

// @ts-expect-error TS2352 (plugins and their types are poorly supported)
export const defaultStoreFactory: LocalStoreFactory = () => store as LocalStore;

/**
 * Default value for the expiration. GDPR says max duration is 13 months
 */
export const expiration: DateFactory = () => add13Months(new Date());

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
	...defaultConfigParts,
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
