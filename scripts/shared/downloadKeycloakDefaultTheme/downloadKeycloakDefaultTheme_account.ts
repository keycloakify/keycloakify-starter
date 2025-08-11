import { getProxyFetchOptions } from "keycloakify/src/bin/tools/fetchProxyOptions";
import { getThisCodebaseRootDirPath } from "../../tools/getThisCodebaseRootDirPath";
import { cacheDirPath } from "../cacheDirPath";
import { relative as pathRelative } from "path";
import { downloadAndExtractArchive } from "keycloakify/src/bin/tools/downloadAndExtractArchive";
import { join as pathJoin } from "path";
import type { Param0 } from "tsafe";

export const KEYCLOAK_VERSION = "21.1.2";

export async function downloadKeycloakDefaultTheme_account() {

    const { onArchiveFile } = createOnArchiveFile();

    const { extractedDirPath } = await downloadAndExtractArchive({
        url: `https://repo1.maven.org/maven2/org/keycloak/keycloak-themes/${KEYCLOAK_VERSION}/keycloak-themes-${KEYCLOAK_VERSION}.jar`,
        cacheDirPath,
        fetchOptions: getProxyFetchOptions({
            npmConfigGetCwd: getThisCodebaseRootDirPath()
        }),
        uniqueIdOfOnArchiveFile: "extractOnlyRequiredFiles_account",
        onArchiveFile
    });

    return { extractedDirPath };
}

function createOnArchiveFile() {
    let kcNodeModulesKeepFilePaths: Set<string> | undefined = undefined;

    const onArchiveFile: Param0<typeof downloadAndExtractArchive>["onArchiveFile"] = async params => {
        const fileRelativePath = pathRelative("theme", params.fileRelativePath);

        if (fileRelativePath.startsWith("..")) {
            return;
        }

        const { readFile, writeFile } = params;

        if (!fileRelativePath.startsWith("base") && !fileRelativePath.startsWith("keycloak")) {
            return;
        }

        if (
            !fileRelativePath.startsWith(pathJoin("base", "account")) &&
            !fileRelativePath.startsWith(pathJoin("keycloak", "account")) &&
            !fileRelativePath.startsWith(pathJoin("keycloak", "common"))
        ) {
            return;
        }

        skip_web_modules: {
            if (
                !fileRelativePath.startsWith(pathJoin("keycloak", "common", "resources", "web_modules"))
            ) {
                break skip_web_modules;
            }

            return;
        }

        skip_lib: {
            if (!fileRelativePath.startsWith(pathJoin("keycloak", "common", "resources", "lib"))) {
                break skip_lib;
            }

            return;
        }

        skip_node_modules: {
            const nodeModulesRelativeDirPath = pathJoin(
                "keycloak",
                "common",
                "resources",
                "node_modules"
            );

            if (!fileRelativePath.startsWith(nodeModulesRelativeDirPath)) {
                break skip_node_modules;
            }

            if (kcNodeModulesKeepFilePaths === undefined) {
                kcNodeModulesKeepFilePaths = new Set([
                    pathJoin("patternfly", "dist", "css", "patternfly.min.css"),
                    pathJoin("patternfly", "dist", "css", "patternfly-additions.min.css"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Regular-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Bold-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Light-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Semibold-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "PatternFlyIcons-webfont.ttf"),
                    pathJoin("patternfly", "dist", "fonts", "PatternFlyIcons-webfont.woff")
                ]);
            }

            const fileRelativeToNodeModulesPath = fileRelativePath.substring(
                nodeModulesRelativeDirPath.length + 1
            );

            if (kcNodeModulesKeepFilePaths.has(fileRelativeToNodeModulesPath)) {
                break skip_node_modules;
            }

            return;
        }

        patch_account_css: {
            if (
                fileRelativePath !== pathJoin("keycloak", "account", "resources", "css", "account.css")
            ) {
                break patch_account_css;
            }

            await writeFile({
                fileRelativePath,
                modifiedData: Buffer.from(
                    (await readFile()).toString("utf8").replace("top: -34px;", "top: -34px !important;"),
                    "utf8"
                )
            });

            return;
        }

        await writeFile({ fileRelativePath });
    };

    return { onArchiveFile };
}

