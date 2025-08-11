import { join as pathJoin } from "path";
import { downloadKeycloakDefaultTheme } from "../shared/downloadKeycloakDefaultTheme";
import { transformCodebase } from "keycloakify/src/bin/tools/transformCodebase";
import { existsAsync } from "keycloakify/src/bin/tools/fs.existsAsync";
import { getThisCodebaseRootDirPath } from "../tools/getThisCodebaseRootDirPath";
//import { THEME_TYPE } from "./generateResources.overridable";
import * as fsPr from "fs/promises";

export async function generateResources(params: { themeType: "login" | "account"; }) {

    const { themeType } = params;

    const { extractedDirPath } = await downloadKeycloakDefaultTheme({ themeType });

    const destDirPath = pathJoin(getThisCodebaseRootDirPath(), "public", "keycloak-theme", themeType);

    await fsPr.rm(destDirPath, { recursive: true, force: true });

    base_resources: {
        const srcDirPath = pathJoin(extractedDirPath, "base", themeType, "resources");

        if (!(await existsAsync(srcDirPath))) {
            break base_resources;
        }

        transformCodebase({
            srcDirPath,
            destDirPath
        });
    }

    transformCodebase({
        srcDirPath: pathJoin(extractedDirPath, "keycloak", themeType, "resources"),
        destDirPath
    });

    transformCodebase({
        srcDirPath: pathJoin(extractedDirPath, "keycloak", "common", "resources"),
        destDirPath: pathJoin(destDirPath, "resources-common")
    });
}
