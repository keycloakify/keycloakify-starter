import { assert } from "tsafe/assert";

/**
 * NOTE: In your codebase use `import.meta.env.BASE_URL`
 * This is a shim that works also in webpack environments
 * */
export const BASE_URL = (() => {
    vite: {
        let BASE_URL: string;

        try {
            // @ts-expect-error
            BASE_URL = import.meta.env.BASE_URL;

            assert(typeof BASE_URL === "string");
        } catch {
            break vite;
        }

        return BASE_URL;
    }

    // NOTE: From here, this is technical dept to support webpack

    use_kcContext: {
        const kcContext: { "x-keycloakify": { resourcesPath: string } } | undefined = (window as any)
            .kcContext;

        if (kcContext === undefined || process.env.NODE_ENV === "development") {
            break use_kcContext;
        }

        return `${kcContext["x-keycloakify"].resourcesPath}/dist/`;
    }

    webpack_dev_mode: {
        let BASE_URL: string;

        try {
            // @ts-expect-error:
            BASE_URL = process.env.PUBLIC_URL;

            assert(typeof BASE_URL === "string");
        } catch {
            break webpack_dev_mode;
        }

        return BASE_URL === "" ? "/" : `${BASE_URL}/`;
    }

    return "/";
})();
