import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";

export const { OidcProvider, useOidc, getOidc } = import.meta.env.DEV
    ? createMockReactOidc({
          isUserInitiallyLoggedIn: true,
          homeUrl: import.meta.env.BASE_URL,
          autoLogin: true
      })
    : createReactOidc(async () => {
          const { kcHttpRelativePath, realm } = (() => {
              const [
                  // "" or "/auth"
                  kcHttpRelativePath,
                  // "myrealm/account"
                  startsWithRealm
              ] = window.location.pathname.split("/realms/");

              const realm = startsWithRealm.split("/")[0];

              return {
                  realm,
                  kcHttpRelativePath: kcHttpRelativePath || undefined
              };
          })();

          return {
              issuerUri: `${window.location.origin}${kcHttpRelativePath ?? ""}/realms/${realm}`,
              clientId: "account-console",
              homeUrl: `${kcHttpRelativePath ?? ""}/realms/${realm}/account/`,
              autoLogin: true
          };
      });
