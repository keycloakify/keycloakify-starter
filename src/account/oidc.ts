import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";

const publicUrl = undefined;
const isAuthGloballyRequired = true;

export const { OidcProvider, useOidc, getOidc } = import.meta.env.DEV
    ? createMockReactOidc({
          isUserInitiallyLoggedIn: true,
          publicUrl,
          isAuthGloballyRequired
      })
    : createReactOidc({
          issuerUri: (() => {
              const [
                  // "" or "/auth"
                  kcHttpRelativePath,
                  // "myrealm/account"
                  startsWithRealm
              ] = window.location.pathname.split("/realms/");

              const realm = startsWithRealm.split("/")[0];

              return `${window.location.origin}${kcHttpRelativePath}/realms/${realm}`;

          })(),
          clientId: "account-console",
          publicUrl,
          isAuthGloballyRequired
      });
