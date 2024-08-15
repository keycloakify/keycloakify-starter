import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";

const publicUrl = undefined;
const isAuthGloballyRequired = true;

export const realm = import.meta.env.DEV ? "" : window.location.pathname.split("/")[2];

export const { OidcProvider, useOidc, getOidc } = import.meta.env.DEV ?
    createMockReactOidc({
        isUserInitiallyLoggedIn: true,
        publicUrl,
        isAuthGloballyRequired
    }) :
    createReactOidc({
        issuerUri: `${window.location.origin}/realms/${realm}`,
        clientId: "account-console",
        publicUrl,
        isAuthGloballyRequired
    });