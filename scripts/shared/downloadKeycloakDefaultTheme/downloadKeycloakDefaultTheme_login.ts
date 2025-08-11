import { downloadAndExtractArchive } from "keycloakify/src/bin/tools/downloadAndExtractArchive";
import { getProxyFetchOptions } from "keycloakify/src/bin/tools/fetchProxyOptions";
import { transformCodebase } from "keycloakify/src/bin/tools/transformCodebase";
import * as fs from "fs";
import { getThisCodebaseRootDirPath } from "../../tools/getThisCodebaseRootDirPath";
import { cacheDirPath } from "../cacheDirPath";
import { relative as pathRelative } from "path";
import { join as pathJoin } from "path";

const KEYCLOAK_VERSION = "26.3.1";

export async function downloadKeycloakDefaultTheme_login() {
    const fetchOptions = getProxyFetchOptions({
        npmConfigGetCwd: getThisCodebaseRootDirPath()
    });

    const { extractedDirPath: extractedDirPath_core } = await downloadAndExtractArchive({
        url: `https://repo1.maven.org/maven2/org/keycloak/keycloak-themes/${KEYCLOAK_VERSION}/keycloak-themes-${KEYCLOAK_VERSION}.jar`,
        cacheDirPath,
        fetchOptions,
        uniqueIdOfOnArchiveFile: "extractOnlyRequiredFiles_login_core",
        onArchiveFile: async params => {
            const fileRelativePath = pathRelative("theme", params.fileRelativePath);

            if (fileRelativePath.startsWith("..")) {
                return;
            }

            const { writeFile } = params;

            await writeFile({ fileRelativePath });
        }
    });

    const { extractedDirPath: extractedDirPath_vendor } = await downloadAndExtractArchive({
        url: `https://repo1.maven.org/maven2/org/keycloak/keycloak-themes-vendor/${KEYCLOAK_VERSION}/keycloak-themes-vendor-${KEYCLOAK_VERSION}.jar`,
        cacheDirPath,
        fetchOptions,
        uniqueIdOfOnArchiveFile: "extractOnlyRequiredFiles_login_vendor",
        onArchiveFile: async params => {
            const fileRelativePath = pathRelative("theme", params.fileRelativePath);

            if (fileRelativePath.startsWith("..")) {
                return;
            }

            const { writeFile } = params;

            skip_unused_vendored_dependency: {
                const dirPath = pathJoin("keycloak", "common", "resources", "vendor");

                if (!fileRelativePath.startsWith(dirPath)) {
                    break skip_unused_vendored_dependency;
                }

                if (
                    fileRelativePath.startsWith(pathJoin(dirPath, "patternfly-v5")) &&
                    !fileRelativePath.endsWith(".scss")
                ) {
                    break skip_unused_vendored_dependency;
                }

                if (fileRelativePath.startsWith(pathJoin(dirPath, "rfc4648"))) {
                    break skip_unused_vendored_dependency;
                }

                return;
            }

            move_rfc4648: {
                if (
                    fileRelativePath !==
                    pathJoin("keycloak", "common", "resources", "vendor", "rfc4648", "rfc4648.js")
                ) {
                    break move_rfc4648;
                }

                await writeFile({
                    fileRelativePath: pathJoin("base", "login", "resources", "js", "rfc4648.js")
                });

                return;
            }

            await writeFile({ fileRelativePath });
        }
    });

    const extractedDirPath = pathJoin(cacheDirPath, `keycloak_${KEYCLOAK_VERSION}_default_theme`);

    if (fs.existsSync(extractedDirPath)) {
        fs.rmSync(extractedDirPath, { recursive: true });
    }

    transformCodebase({
        srcDirPath: extractedDirPath_core,
        destDirPath: extractedDirPath
    });

    transformCodebase({
        srcDirPath: extractedDirPath_vendor,
        destDirPath: extractedDirPath
    });

    transformCodebase({
        srcDirPath: extractedDirPath,
        destDirPath: extractedDirPath,
        transformSourceCode: ({ fileRelativePath, sourceCode }) => {
            if (
                fileRelativePath.startsWith(pathJoin("base", "login", "resources", "js")) &&
                fileRelativePath.endsWith(".js")
            ) {
                return {
                    modifiedSourceCode: Buffer.from(
                        sourceCode
                            .toString("utf8")
                            .replaceAll(`from "rfc4648";`, `from "./rfc4648.js";`),
                        "utf8"
                    )
                };
            }

            return {
                modifiedSourceCode: sourceCode
            };
        }
    });

    return { extractedDirPath };
}
