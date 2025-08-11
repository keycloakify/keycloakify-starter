import { transformCodebase } from "keycloakify/src/bin/tools/transformCodebase";
import { getThisCodebaseRootDirPath } from "../tools/getThisCodebaseRootDirPath";
import { join as pathJoin } from "path";

export async function generateAccountMultiPageUiCodeFromLoginUi() {
    transformCodebase({
        srcDirPath: 
        pathJoin(getThisCodebaseRootDirPath(), "src", "@keycloakify", "login-ui"),
        destDirPath: pathJoin(getThisCodebaseRootDirPath(), "src", "@keycloakify", "account-multi-page-ui"),
        transformSourceCode: ({ fileRelativePath, sourceCode }) => {

            if (fileRelativePath === "useUserProfileForm.tsx") {
                return undefined;
            }

            if (fileRelativePath === "useNewPassword.tsx") {
                return undefined;
            }

            if (fileRelativePath === "useInitializeDarkMode.ts") {
                return undefined;
            }

            if (fileRelativePath.startsWith(pathJoin("core", "i18n", "messages_defaultSet"))) {
                return undefined;
            }

            if (fileRelativePath === pathJoin("core", "kcClsx.ts")) {
                return undefined;
            }

            if (fileRelativePath === pathJoin("core", "darkMode.ts")) {
                return undefined;
            }

            if (fileRelativePath.startsWith(pathJoin("core", "userProfileApi"))) {
                return undefined;
            }

            if (fileRelativePath.startsWith(pathJoin("core", "newPasswordApi"))) {
                return undefined;
            }

            return { modifiedSourceCode: sourceCode };
        }
    });
}
