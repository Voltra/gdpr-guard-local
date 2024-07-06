import { GdprManager, GdprManagerDecorator, GdprManagerRaw, GdprSaviorAdapter } from "gdpr-guard";
import { LocalStorageConfig, LocalStore, LocalStoreFactory } from "./types";
export declare class LocalStorageSavior extends GdprSaviorAdapter {
    protected config: LocalStorageConfig;
    protected storage: LocalStore;
    constructor(config?: LocalStorageConfig, storeFactory?: LocalStoreFactory, decorator?: GdprManagerDecorator | undefined);
    /**
     * @inheritDoc
     * @override
     */
    updateSharedManager(_manager: GdprManager): Promise<void>;
    /**
     * @inheritDoc
     * @override
     */
    restore(shouldUpdate?: boolean): Promise<GdprManager | null>;
    /**
     * @inheritDoc
     * @override
     */
    store(manager: GdprManagerRaw): Promise<boolean>;
}
