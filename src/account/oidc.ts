import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";

const publicUrl = undefined;
const isAuthGloballyRequired = true;

export const { OidcProvider, useOidc } = import.meta.env.DEV ?
    createMockReactOidc({
        isUserInitiallyLoggedIn: true,
        publicUrl,
        isAuthGloballyRequired
    }) :
    createReactOidc({
        issuerUri: `${window.location.origin}${window.location.pathname.split("/").slice(0, 3).join("/")}`,
        clientId: "account-console",
        publicUrl,
        isAuthGloballyRequired
    });