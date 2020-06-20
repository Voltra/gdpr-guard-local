import { Version, VersionComparator, LocalStoreFactory, LocalStorageConfig } from "./types"
import store from "store"
import compat from "store/plugins/v1-backcompat"
import expire from "store/plugins/expire"
import moment from "moment"

export const versionComparator: VersionComparator = (oldVersion: Version, newVersion: Version) => {
	return newVersion !== oldVersion;
};

const plugins = [
	...compat,
	expire,
];

plugins.forEach(plugin => store.addPlugin(plugin));

export const defaultStoreFactory: LocalStoreFactory = () => store;

//GDPR says max 13 months
export const expiration = (): Date => moment().startOf("month").add(13, "months").toDate();

export const defaultConfigParts: Partial<LocalStorageConfig> = {
	comparator: versionComparator,
	expiration,
};

export const defaultConfig: LocalStorageConfig = {
	storeKey: "gdpr",
	versionKey: "gdpr__version",
	version: "v0.0.0",
	comparator: versionComparator,
	expiration,
};

export const makeConfig = (config: Partial<LocalStorageConfig> = {}): LocalStorageConfig => {
	return {
		...defaultConfig,
		...config,
	};
};
