import { transformCodebase } from "../../node_modules/keycloakify/src/bin/tools/transformCodebase";
import * as fs from "fs";
import { join as pathJoin } from "path";
import { downloadKeycloakDefaultTheme } from "../shared/downloadKeycloakDefaultTheme";
import { getThisCodebaseRootDirPath } from "../tools/getThisCodebaseRootDirPath";
import { supportedLanguages_account } from "./generateI18nMessages";
import * as fsPr from "fs/promises";

export async function createAccountV1Dir() {
    const { extractedDirPath } = await downloadKeycloakDefaultTheme({ themeType: "account" });

    const destDirPath = pathJoin(getThisCodebaseRootDirPath(), "account-v1");

    await fsPr.rm(destDirPath, { recursive: true, force: true });

    transformCodebase({
        srcDirPath: pathJoin(extractedDirPath, "base", "account"),
        destDirPath
    });

    transformCodebase({
        srcDirPath: pathJoin(extractedDirPath, "keycloak", "account", "resources"),
        destDirPath: pathJoin(destDirPath, "resources")
    });

    transformCodebase({
        srcDirPath: pathJoin(extractedDirPath, "keycloak", "common", "resources"),
        destDirPath: pathJoin(destDirPath, "resources", "resources-common")
    });

    fs.writeFileSync(
        pathJoin(destDirPath, "theme.properties"),
        Buffer.from(
            [
                "accountResourceProvider=account-v1",
                "",
                `locales=${supportedLanguages_account.join(",")}`,
                "",
                "styles=" +
                    [
                        "css/account.css",
                        "img/icon-sidebar-active.png",
                        "img/logo.png",
                        ...[
                            "patternfly.min.css",
                            "patternfly-additions.min.css",
                            "patternfly-additions.min.css"
                        ].map(
                            fileBasename =>
                                `resources-common/node_modules/patternfly/dist/css/${fileBasename}`
                        )
                    ].join(" "),
                "",
                "##### css classes for form buttons",
                "# main class used for all buttons",
                "kcButtonClass=btn",
                "# classes defining priority of the button - primary or default (there is typically only one priority button for the form)",
                "kcButtonPrimaryClass=btn-primary",
                "kcButtonDefaultClass=btn-default",
                "# classes defining size of the button",
                "kcButtonLargeClass=btn-lg",
                ""
            ].join("\n"),
            "utf8"
        )
    );
}
