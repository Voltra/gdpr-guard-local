# gdpr-guard-local

> A simple local storage adapter for gdpr-guard

<center><img src="https://raw.githubusercontent.com/Voltra/gdpr-guard-local/dev/gdpr-guard-local.png" alt="Logo" width="250"/></center>

This library predefines logic to store/save and restore [`gdpr-guard`](https://github.com/Voltra/gdpr-guard) state from localStorage.

If you need any help, you're more than welcome on my [official Discord server](https://discordapp.com/invite/JtWAjbw) dedicated to my open-source projects.

You can read the online [documentation](https://voltra.github.io/gdpr-guard-local/).

## How to import

This library re-exports [what's exported by `gdpr-guard`](https://github.com/Voltra/gdpr-guard/blob/master/README.md#how-to-import).



```javascript
import {
    // everything from gdpr-guard
    defaults,
    LocalStorageSavior,
} from "gdpr-guard-local"
```

## LocalStorageSavior

`LocalStorageSavior` is a class that specializes the Savior API for local storage.

It is mainly for libraries developers or can be used as parameters for a library.

To construct one, simply pass a `LocalStorageConfig` object followed by a `LocalStoreFactory` (both are optional with default values):

```typescript
interface LocalStorageConfig{
    storeKey: string; // key of the serialized manager in local storage
    versionKey: string; // key of the version of the serialized manager in local storage
    version: string|number; // current version
    comparator: (oldVersion, newVersion) => boolean; // if the versions are different
    expiration: () => Date; // expiration date from current time
}

type LocalStoreFactory = () => LocalStore;

interface LocalStore{
    has(key: string): Promise<boolean>;
    set(key: string, value: any, expiration: Date): Promise<void>;
    remove(key: string): Promise<void>;
    get(key: string): Promise<any>;
    removeExpiredKeys(): Promise<void>;
}

const savior = new LocalStorageSavior(myConfig, myStoreFactory);
```

To help users and developers, we provide default values as well as ways to easily create new values for the parameters.

## Defaults

```javascript
const {
    defaultStoreFactory, // the default argument of the savior constructor
    expiration, // utility function
    defaultConfig, // the default argument of the savior
    makeConfig,
} = defaults;
```

The `makeConfig` function is a utility function that merges the user provided config object with the default config:

```typescript
declare const makeConfig: (config: Partial<LocalStorageConfig> = {}): LocalStorageConfig;
```

For instance, you can customize the savior like this:

```javascript
const savior = new LocalStorageSavior(
    makeConfig({
        version: "v1.0.0",
        //storeKey will be gdpr
        //versionKey will be gdpr__version
    }),
    defaultStoreFactory, // optional, that's already the default parameter
);
```

