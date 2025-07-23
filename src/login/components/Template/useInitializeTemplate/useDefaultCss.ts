import { useInsertLinkTags } from "../../../../@keycloakify/login-ui/tools/useInsertLinkTags";
import { BASE_URL } from "../../../../kc.gen";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

export function useDefaultCss() {
  const { doUseDefaultCss } = useKcClsx();

  const { areAllStyleSheetsLoaded } = useInsertLinkTags({
    effectId: "Template",
    hrefs: !doUseDefaultCss
      ? []
      : [
          `${BASE_URL}keycloak-theme/login/resources-common/vendor/patternfly-v5/patternfly.min.css`,
          `${BASE_URL}keycloak-theme/login/resources-common/vendor/patternfly-v5/patternfly-addons.css`,
          `${BASE_URL}keycloak-theme/login/css/login.css`,
        ],
  });

  return { areAllStyleSheetsLoaded };
}
