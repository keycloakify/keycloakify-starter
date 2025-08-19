import { useInsertLinkTags } from "../../../../@keycloakify/account-multi-page-ui/tools/useInsertLinkTags";
import { BASE_URL } from "../../../../kc.gen";
import { useKcClsx } from "../../../../@keycloakify/account-multi-page-ui/useKcClsx";

export function useDefaultCss() {
    const { doUseDefaultCss } = useKcClsx();

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        effectId: "Template",
        hrefs: !doUseDefaultCss
            ? []
            : [
                  `${BASE_URL}keycloak-theme/account/resources-common/node_modules/patternfly/dist/css/patternfly.min.css`,
                  `${BASE_URL}keycloak-theme/account/resources-common/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
                  `${BASE_URL}keycloak-theme/account/css/account.css`
              ]
    });

    return { areAllStyleSheetsLoaded };
}
