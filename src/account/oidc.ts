import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";

const autoLogin = true;

export const { OidcProvider, useOidc, getOidc } = (() => {
    if (import.meta.env.DEV) {
        return createMockReactOidc({
            isUserInitiallyLoggedIn: true,
            homeUrl: import.meta.env.BASE_URL,
            autoLogin
        });
    }

    const { kcHttpRelativePath, realm } = (() => {
        const [
            // "" or "/auth"
            kcHttpRelativePath,
            // "myrealm/account"
            startsWithRealm
        ] = window.location.pathname.split("/realms/");

        const realm = startsWithRealm.split("/")[0];

        return { realm, kcHttpRelativePath };
    })();

    // See: https://docs.oidc-spa.dev/resources/keycloak-configuration
    const issuerUri = `${window.location.origin}${kcHttpRelativePath}/realms/${realm}`;

    return createReactOidc({
        issuerUri,
        clientId: "account-console",
        homeUrl: `${issuerUri}/account/`,
        autoLogin
    });
})();
