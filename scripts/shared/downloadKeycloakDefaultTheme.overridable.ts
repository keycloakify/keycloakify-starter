import { relative as pathRelative } from "path";
import { downloadAndExtractArchive } from "keycloakify/bin/tools/downloadAndExtractArchive";
import { join as pathJoin } from "path";
import type { Param0 } from "tsafe";
import * as fs from "fs/promises";

export const KEYCLOAK_VERSION = "25.0.4";

export function createOnArchiveFile() {
    let kcNodeModulesKeepFilePaths: Set<string> | undefined = undefined;

    const onArchiveFile: Param0<typeof downloadAndExtractArchive>["onArchiveFile"] = async params => {
        const fileRelativePath = pathRelative("theme", params.fileRelativePath);

        if (fileRelativePath.startsWith("..")) {
            return;
        }

        const { writeFile } = params;

        if (!fileRelativePath.startsWith("base") && !fileRelativePath.startsWith("keycloak")) {
            return;
        }

        if (
            !fileRelativePath.startsWith(pathJoin("base", "login")) &&
            !fileRelativePath.startsWith(pathJoin("keycloak", "login")) &&
            !fileRelativePath.startsWith(pathJoin("keycloak", "common"))
        ) {
            return;
        }

        if (fileRelativePath.endsWith(".ftl")) {
            return;
        }

        copy_rfc4648_in_base_js_script_as_well: {
            if (
                fileRelativePath !==
                pathJoin(
                    "keycloak",
                    "common",
                    "resources",
                    "node_modules",
                    "rfc4648",
                    "lib",
                    "rfc4648.js"
                )
            ) {
                break copy_rfc4648_in_base_js_script_as_well;
            }

            await writeFile({
                fileRelativePath: pathJoin("base", "login", "resources", "js", "rfc4648.js")
            });
        }

        for (const fileBasename of [
            "authChecker.js",
            "webauthnAuthenticate.js",
            "webauthnRegister.js"
        ]) {
            if (fileRelativePath !== pathJoin("base", "login", "resources", "js", fileBasename)) {
                continue;
            }

            await writeFile({
                fileRelativePath,
                modifiedData: scripts[fileBasename]
            });

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
                    pathJoin("@patternfly", "patternfly", "patternfly.min.css"),
                    pathJoin("patternfly", "dist", "css", "patternfly.min.css"),
                    pathJoin("patternfly", "dist", "css", "patternfly-additions.min.css"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Regular-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Light-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Bold-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Bold-webfont.woff"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Bold-webfont.ttf"),
                    pathJoin("patternfly", "dist", "fonts", "fontawesome-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "PatternFlyIcons-webfont.ttf"),
                    pathJoin("patternfly", "dist", "fonts", "PatternFlyIcons-webfont.woff"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-Semibold-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-SemiboldItalic-webfont.woff2"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-SemiboldItalic-webfont.woff"),
                    pathJoin("patternfly", "dist", "fonts", "OpenSans-SemiboldItalic-webfont.ttf"),
                    pathJoin("patternfly", "dist", "img", "bg-login.jpg"),
                    pathJoin("jquery", "dist", "jquery.min.js"),
                    pathJoin("rfc4648", "lib", "rfc4648.js"),
                    pathJoin(
                        "@patternfly",
                        "patternfly",
                        "assets",
                        "fonts",
                        "RedHatDisplay",
                        "RedHatDisplay-Bold.woff2"
                    ),
                    pathJoin(
                        "@patternfly",
                        "patternfly",
                        "assets",
                        "fonts",
                        "RedHatDisplay",
                        "RedHatDisplay-Bold.woff"
                    ),
                    pathJoin(
                        "@patternfly",
                        "patternfly",
                        "assets",
                        "fonts",
                        "overpass-webfont",
                        "overpass-bold.woff2"
                    ),
                    pathJoin(
                        "@patternfly",
                        "patternfly",
                        "assets",
                        "fonts",
                        "overpass-webfont",
                        "overpass-bold.woff"
                    )
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

        skip_vendor: {
            if (!fileRelativePath.startsWith(pathJoin("keycloak", "common", "resources", "vendor"))) {
                break skip_vendor;
            }

            return;
        }

        skip_rollup_config: {
            if (fileRelativePath !== pathJoin("keycloak", "common", "resources", "rollup.config.js")) {
                break skip_rollup_config;
            }

            return;
        }

        skip_package_json: {
            if (fileRelativePath !== pathJoin("keycloak", "common", "resources", "package.json")) {
                break skip_package_json;
            }
            return;
        }

        await writeFile({ fileRelativePath });
    };

    return { onArchiveFile };
}

const scripts = {
    "authChecker.js": `

const SESSION_POLLING_INTERVAL = 2000;
const AUTH_SESSION_TIMEOUT_MILLISECS = 1000;
const initialSession = getSession();
const forms = Array.from(document.forms);
let timeout;

// Stop polling for a session when a form is submitted to prevent unexpected redirects.
// This is required as Safari does not support the 'beforeunload' event properly.
// See: https://bugs.webkit.org/show_bug.cgi?id=219102
forms.forEach((form) =>
  form.addEventListener("submit", () => stopSessionPolling()),
);

// Stop polling for a session when the page is unloaded to prevent unexpected redirects.
globalThis.addEventListener("beforeunload", () => stopSessionPolling());

/**
 * Starts polling to check if a new session was started in another context (e.g. a tab or window), and redirects to the specified URL if a session is detected.
 * @param {string} redirectUrl - The URL to redirect to if a new session is detected.
 */
export function startSessionPolling(redirectUrl) {
  if (initialSession) {
    // We started with a session, so there is nothing to do, exit.
    return;
  }

  const session = getSession();

  if (!session) {
    // No new session detected, check again later.
    timeout = setTimeout(
      () => startSessionPolling(redirectUrl),
      SESSION_POLLING_INTERVAL,
    );
  } else {
    // A new session was detected, redirect to the specified URL and stop polling.
    location.href = redirectUrl;
    stopSessionPolling();
  }
}

/**
 * Stops polling the session.
 */
function stopSessionPolling() {
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }
}

export function checkAuthSession(pageAuthSessionHash) {
  setTimeout(() => {
    const cookieAuthSessionHash = getKcAuthSessionHash();
    if (
      cookieAuthSessionHash &&
      cookieAuthSessionHash !== pageAuthSessionHash
    ) {
      location.reload();
    }
  }, AUTH_SESSION_TIMEOUT_MILLISECS);
}

function getKcAuthSessionHash() {
  return getCookieByName("KC_AUTH_SESSION_HASH");
}

function getSession() {
  return getCookieByName("KEYCLOAK_SESSION");
}

function getCookieByName(name) {
  for (const cookie of document.cookie.split(";")) {
    const [key, value] = cookie.split("=").map((value) => value.trim());
    if (key === name) {
      return value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1)
        : value;
    }
  }
  return null;
}


    
    `,
    "webauthnAuthenticate.js": `
    
import { base64url } from "./rfc4648.js";

// singleton
let abortController = undefined;

export function signal() {
    if (abortController) {
        // abort the previous call
        const abortError = new Error("Cancelling pending WebAuthn call");
        abortError.name = "AbortError";
        abortController.abort(abortError);
    }

    abortController = new AbortController();
    return abortController.signal;
}

export async function authenticateByWebAuthn(input) {
    if (!input.isUserIdentified) {
        try {
            const result = await doAuthenticate([], input.challenge, input.userVerification, input.rpId, input.createTimeout, input.errmsg);
            returnSuccess(result);
        } catch (error) {
            returnFailure(error);
        }
        return;
    }
    checkAllowCredentials(input.challenge, input.userVerification, input.rpId, input.createTimeout, input.errmsg);
}

async function checkAllowCredentials(challenge, userVerification, rpId, createTimeout, errmsg) {
    const allowCredentials = [];
    const authnUse = document.forms['authn_select'].authn_use_chk;
    if (authnUse !== undefined) {
        if (authnUse.length === undefined) {
            allowCredentials.push({
                id: base64url.parse(authnUse.value, {loose: true}),
                type: 'public-key',
            });
        } else {
            authnUse.forEach((entry) =>
                allowCredentials.push({
                    id: base64url.parse(entry.value, {loose: true}),
                    type: 'public-key',
                }));
        }
    }
    try {
        const result = await doAuthenticate(allowCredentials, challenge, userVerification, rpId, createTimeout, errmsg);
        returnSuccess(result);
    } catch (error) {
        returnFailure(error);
    }
}

function doAuthenticate(allowCredentials, challenge, userVerification, rpId, createTimeout, errmsg) {
    // Check if WebAuthn is supported by this browser
    if (!window.PublicKeyCredential) {
        returnFailure(errmsg);
        return;
    }

    const publicKey = {
        rpId : rpId,
        challenge: base64url.parse(challenge, { loose: true })
    };

    if (createTimeout !== 0) {
        publicKey.timeout = createTimeout * 1000;
    }

    if (allowCredentials.length) {
        publicKey.allowCredentials = allowCredentials;
    }

    if (userVerification !== 'not specified') {
        publicKey.userVerification = userVerification;
    }

    return navigator.credentials.get({
        publicKey: publicKey,
        signal: signal()
    });
}

export function returnSuccess(result) {
    document.getElementById("clientDataJSON").value = base64url.stringify(new Uint8Array(result.response.clientDataJSON), { pad: false });
    document.getElementById("authenticatorData").value = base64url.stringify(new Uint8Array(result.response.authenticatorData), { pad: false });
    document.getElementById("signature").value = base64url.stringify(new Uint8Array(result.response.signature), { pad: false });
    document.getElementById("credentialId").value = result.id;
    if (result.response.userHandle) {
        document.getElementById("userHandle").value = base64url.stringify(new Uint8Array(result.response.userHandle), { pad: false });
    }
    document.getElementById("webauth").requestSubmit();
}

export function returnFailure(err) {
    document.getElementById("error").value = err;
    document.getElementById("webauth").requestSubmit();
}

    
    
    `,
    "webauthnRegister.js": `

import { base64url } from "./rfc4648.js";

export async function registerByWebAuthn(input) {

    // Check if WebAuthn is supported by this browser
    if (!window.PublicKeyCredential) {
        returnFailure(input.errmsg);
        return;
    }

    const publicKey = {
        challenge: base64url.parse(input.challenge, {loose: true}),
        rp: {id: input.rpId, name: input.rpEntityName},
        user: {
            id: base64url.parse(input.userid, {loose: true}),
            name: input.username,
            displayName: input.username
        },
        pubKeyCredParams: getPubKeyCredParams(input.signatureAlgorithms),
    };

    if (input.attestationConveyancePreference !== 'not specified') {
        publicKey.attestation = input.attestationConveyancePreference;
    }

    const authenticatorSelection = {};
    let isAuthenticatorSelectionSpecified = false;

    if (input.authenticatorAttachment !== 'not specified') {
        authenticatorSelection.authenticatorAttachment = input.authenticatorAttachment;
        isAuthenticatorSelectionSpecified = true;
    }

    if (input.requireResidentKey !== 'not specified') {
        if (input.requireResidentKey === 'Yes') {
            authenticatorSelection.requireResidentKey = true;
        } else {
            authenticatorSelection.requireResidentKey = false;
        }
        isAuthenticatorSelectionSpecified = true;
    }

    if (input.userVerificationRequirement !== 'not specified') {
        authenticatorSelection.userVerification = input.userVerificationRequirement;
        isAuthenticatorSelectionSpecified = true;
    }

    if (isAuthenticatorSelectionSpecified) {
        publicKey.authenticatorSelection = authenticatorSelection;
    }

    if (input.createTimeout !== 0) {
        publicKey.timeout = input.createTimeout * 1000;
    }

    const excludeCredentials = getExcludeCredentials(input.excludeCredentialIds);
    if (excludeCredentials.length > 0) {
        publicKey.excludeCredentials = excludeCredentials;
    }

    try {
        const result = await doRegister(publicKey);
        returnSuccess(result, input.initLabel, input.initLabelPrompt);
    } catch (error) {
        returnFailure(error);
    }
}

function doRegister(publicKey) {
    return navigator.credentials.create({publicKey});
}

function getPubKeyCredParams(signatureAlgorithmsList) {
    const pubKeyCredParams = [];
    if (signatureAlgorithmsList.length === 0) {
        pubKeyCredParams.push({type: "public-key", alg: -7});
        return pubKeyCredParams;
    }

    for (const entry of signatureAlgorithmsList) {
        pubKeyCredParams.push({
            type: "public-key",
            alg: entry
        });
    }

    return pubKeyCredParams;
}

function getExcludeCredentials(excludeCredentialIds) {
    const excludeCredentials = [];
    if (excludeCredentialIds === "") {
        return excludeCredentials;
    }

    for (const entry of excludeCredentialIds.split(',')) {
        excludeCredentials.push({
            type: "public-key",
            id: base64url.parse(entry, {loose: true})
        });
    }

    return excludeCredentials;
}

function getTransportsAsString(transportsList) {
    if (!Array.isArray(transportsList)) {
        return "";
    }

    return transportsList.join();
}

function returnSuccess(result, initLabel, initLabelPrompt) {
    document.getElementById("clientDataJSON").value = base64url.stringify(new Uint8Array(result.response.clientDataJSON), {pad: false});
    document.getElementById("attestationObject").value = base64url.stringify(new Uint8Array(result.response.attestationObject), {pad: false});
    document.getElementById("publicKeyCredentialId").value = base64url.stringify(new Uint8Array(result.rawId), {pad: false});

    if (typeof result.response.getTransports === "function") {
        const transports = result.response.getTransports();
        if (transports) {
            document.getElementById("transports").value = getTransportsAsString(transports);
        }
    } else {
        console.log("Your browser is not able to recognize supported transport media for the authenticator.");
    }

    let labelResult = window.prompt(initLabelPrompt, initLabel);
    if (labelResult === null) {
        labelResult = initLabel;
    }
    document.getElementById("authenticatorLabel").value = labelResult;

    document.getElementById("register").requestSubmit();
}

function returnFailure(err) {
    document.getElementById("error").value = err;
    document.getElementById("register").requestSubmit();
}


    
    `
};
