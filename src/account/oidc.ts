import { createReactOidc } from "oidc-spa/react";

export const { OidcProvider, useOidc } = createReactOidc({
    issuerUri: `${window.location.origin}${window.location.pathname.split("/").slice(0, 3).join("/")}`,
    clientId: "account-console",
    publicUrl: import.meta.env.BASE_URL
});