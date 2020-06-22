import { GdprSaviorAdapter, GdprManager, GdprManagerRaw } from "gdpr-guard";
import { LocalStore, LocalStoreFactory, LocalStorageConfig } from "./types";
export declare class LocalStorageSavior extends GdprSaviorAdapter {
    protected config: LocalStorageConfig;
    protected storage: LocalStore;
    constructor(config?: LocalStorageConfig, storeFactory?: LocalStoreFactory);
    updateSharedManager(_manager: GdprManager): Promise<void>;
    restore(shouldUpdate?: boolean): Promise<GdprManager | null>;
    store(manager: GdprManagerRaw): Promise<boolean>;
}
