import { downloadAndExtractArchive } from "keycloakify/src/bin/tools/downloadAndExtractArchive";
import { getProxyFetchOptions } from "keycloakify/src/bin/tools/fetchProxyOptions";
import { getThisCodebaseRootDirPath } from "../tools/getThisCodebaseRootDirPath.overridable";
import { KEYCLOAK_VERSION, createOnArchiveFile } from "./downloadKeycloakDefaultTheme.overridable";
import { cacheDirPath } from "./cacheDirPath.overridable";

export async function downloadKeycloakDefaultTheme() {
    const { onArchiveFile } = createOnArchiveFile();

    const { extractedDirPath } = await downloadAndExtractArchive({
        url: `https://repo1.maven.org/maven2/org/keycloak/keycloak-themes/${KEYCLOAK_VERSION}/keycloak-themes-${KEYCLOAK_VERSION}.jar`,
        cacheDirPath,
        fetchOptions: getProxyFetchOptions({
            npmConfigGetCwd: getThisCodebaseRootDirPath()
        }),
        uniqueIdOfOnArchiveFile: "extractOnlyRequiredFiles",
        onArchiveFile
    });

    return { extractedDirPath };
}
