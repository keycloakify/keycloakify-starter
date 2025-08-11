import { join as pathJoin } from "path";
import { downloadKeycloakDefaultTheme } from "../shared/downloadKeycloakDefaultTheme.overridable";
import { transformCodebase } from "keycloakify/src/bin/tools/transformCodebase";
import { existsAsync } from "keycloakify/src/bin/tools/fs.existsAsync";
import { getThisCodebaseRootDirPath } from "../tools/getThisCodebaseRootDirPath.overridable";
import { THEME_TYPE } from "./generateResources.overridable";
import * as fsPr from "fs/promises";

export async function generateResources() {
    const { extractedDirPath } = await downloadKeycloakDefaultTheme();

    const destDirPath = pathJoin(getThisCodebaseRootDirPath(), "keycloak-theme", "public", THEME_TYPE);

    await fsPr.rm(destDirPath, { recursive: true, force: true });

    base_resources: {
        const srcDirPath = pathJoin(extractedDirPath, "base", THEME_TYPE, "resources");

        if (!(await existsAsync(srcDirPath))) {
            break base_resources;
        }

        transformCodebase({
            srcDirPath,
            destDirPath
        });
    }

    transformCodebase({
        srcDirPath: pathJoin(extractedDirPath, "keycloak", THEME_TYPE, "resources"),
        destDirPath
    });

    transformCodebase({
        srcDirPath: pathJoin(extractedDirPath, "keycloak", "common", "resources"),
        destDirPath: pathJoin(destDirPath, "resources-common")
    });
}
