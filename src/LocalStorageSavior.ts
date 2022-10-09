import { GdprDeserializer, GdprManager, GdprManagerRaw, GdprSaviorAdapter } from "gdpr-guard"
import { LocalStorageConfig, LocalStore, LocalStoreFactory, Version } from "./types";
import { defaultStoreFactory, makeConfig } from "./defaults";

export class LocalStorageSavior extends GdprSaviorAdapter {
	protected storage: LocalStore;

	public constructor(
		protected config: LocalStorageConfig = makeConfig(),
		storeFactory: LocalStoreFactory = defaultStoreFactory,
	) {
		super();
		this.storage = storeFactory();
	}

	/**
	 * @inheritDoc
	 * @override
	 */
	public override async updateSharedManager(_manager: GdprManager): Promise<void> {
		await Promise.resolve();
	}

	/**
	 * @inheritDoc
	 * @override
	 */
	public override async restore(shouldUpdate: boolean = true): Promise<GdprManager | null> {
		await this.storage.removeExpiredKeys(); // explicitely remove rexpired keys
		const hasVersion = await this.storage.has(this.config.versionKey);

		if (!hasVersion) {
			// if no version is registered, boot up
			await this.storage.set(
				this.config.versionKey,
				this.config.version,
				this.config.expiration(),
			);

			// avoid storage jacking
			await this.storage.remove(this.config.storeKey);
		}

		const serialized = await this.storage.get(this.config.storeKey);
		const storageVersion = (await this.storage.get(this.config.versionKey)) as Version;

		try {
			const manager = GdprDeserializer.manager(serialized);
			const shouldUpdateVersion = this.config.comparator(storageVersion, this.config.version);

			if (shouldUpdateVersion) { // Handle semantic update
				await this.storage.remove(this.config.storeKey);
				await this.storage.set(
					this.config.versionKey,
					this.config.version,
					this.config.expiration(),
				);

				return null;
			} else if (!!manager) {
				if (shouldUpdate)
					await this.updateSharedManager(manager);

				return manager;
			}

			return null;
		} catch {
			return null;
		}
	}

	/**
	 * @inheritDoc
	 * @override
	 */
	public override async store(manager: GdprManagerRaw): Promise<boolean> {
		await this.storage.set(
			this.config.storeKey,
			manager,
			this.config.expiration(),
		);

		try {
			const exists = await this.exists();
			return exists;
		} catch {
			return false;
		}
	}
}
