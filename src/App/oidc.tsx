import { useState, useContext, createContext, useEffect } from "react";
import keycloak_js from "keycloak-js";
import { id } from "tsafe/id";
import { addParamToUrl } from "powerhooks/tools/urlSearchParams";
import type { ReturnType } from "tsafe/ReturnType";
import type { Param0 } from "tsafe/Param0";
import { assert } from "tsafe/assert";
import { createKeycloakAdapter } from "keycloakify";
import jwt_decode from "jwt-decode";
import { Evt } from "evt";

export declare type OidcClient = OidcClient.LoggedIn | OidcClient.NotLoggedIn;

export declare namespace OidcClient {
    export type NotLoggedIn = {
        isUserLoggedIn: false;
        login: (params: {
            //To prevent infinite loop if the user click login then cancel.
            doesCurrentHrefRequiresAuth: boolean;
        }) => Promise<never>;
    };

    export type LoggedIn = {
        isUserLoggedIn: true;
        //NOTE: It changes when renewed, don't store it.
        accessToken: string;
        logout: (params: { redirectTo: "home" | "current page" }) => Promise<never>;
        updateTokenInfo: () => Promise<void>;
    };
}

type Params = {
    url: string;
    realm: string;
    clientId: string;
    transformUrlBeforeRedirect: (url: string) => string;
    getUiLocales: () => string;
    log?: typeof console.log;
};

async function createKeycloakOidcClient(params: Params): Promise<OidcClient> {
    const {
        url,
        realm,
        clientId,
        transformUrlBeforeRedirect,
        getUiLocales,
        log
    } = params;

    const keycloakInstance = keycloak_js({ url, realm, clientId });

    let redirectMethod: ReturnType<
        Param0<typeof createKeycloakAdapter>["getRedirectMethod"]
    > = "overwrite location.href";

    const isAuthenticated = await keycloakInstance
        .init({
            onLoad: "check-sso",
            silentCheckSsoRedirectUri: `${window.location.origin}/silent-sso.html`,
            responseMode: "query",
            checkLoginIframe: false,
            adapter: createKeycloakAdapter({
                transformUrlBeforeRedirect: url =>
                    [url].map(transformUrlBeforeRedirect).map(
                        url =>
                            addParamToUrl({
                                url,
                                "name": "ui_locales",
                                "value": getUiLocales()
                            }).newUrl
                    )[0],
                keycloakInstance,
                getRedirectMethod: () => redirectMethod
            })
        })
        .catch((error: Error) => error);

    //TODO: Make sure that result is always an object.
    if (isAuthenticated instanceof Error) {
        throw isAuthenticated;
    }

    const login: OidcClient.NotLoggedIn["login"] = async ({
        doesCurrentHrefRequiresAuth
    }) => {
        if (doesCurrentHrefRequiresAuth) {
            redirectMethod = "location.replace";
        }

        await keycloakInstance.login({ "redirectUri": window.location.href });

        return new Promise<never>(() => { });
    };

    if (!isAuthenticated) {
        return id<OidcClient.NotLoggedIn>({
            "isUserLoggedIn": false,
            login
        });
    }

    const oidcClient = id<OidcClient.LoggedIn>({
        "isUserLoggedIn": true,
        "accessToken": keycloakInstance.token!,
        "logout": async ({ redirectTo }) => {
            await keycloakInstance.logout({
                "redirectUri": (() => {
                    switch (redirectTo) {
                        case "current page":
                            return window.location.href;
                        case "home":
                            return window.location.origin;
                    }
                })()
            });

            return new Promise<never>(() => { });
        },
        "updateTokenInfo": async () => {
            await keycloakInstance.updateToken(-1);

            oidcClient.accessToken = keycloakInstance.token!;
        }
    });

    (function callee() {
        const msBeforeExpiration =
            jwt_decode<{ exp: number }>(oidcClient.accessToken)["exp"] * 1000 - Date.now();

        setTimeout(async () => {
            log?.(
                `OIDC access token will expire in ${minValiditySecond} seconds, waiting for user activity before renewing`
            );

            await Evt.merge([
                Evt.from(document, "mousemove"),
                Evt.from(document, "keydown")
            ]).waitFor();

            log?.("User activity detected. Refreshing access token now");

            const error = await keycloakInstance.updateToken(-1).then(
                () => undefined,
                (error: Error) => error
            );

            if (error) {
                log?.("Can't refresh OIDC access token, getting a new one");
                //NOTE: Never resolves
                await login({ "doesCurrentHrefRequiresAuth": true });
            }

            oidcClient.accessToken = keycloakInstance.token!;

            callee();
        }, msBeforeExpiration - minValiditySecond * 1000);
    })();

    return oidcClient;
}

const minValiditySecond = 25;


const oidcClientContext = createContext<OidcClient | undefined>(undefined);

export function createOidcClientProvider(params: Params) {


    const prOidcClient = createKeycloakOidcClient(params);

    function OidcClientProvider(props: { children: React.ReactNode; }) {

        const { children } = props;

        const [oidcClient, setOidcClient] = useState<OidcClient | undefined>(undefined);

        useEffect(() => {

            prOidcClient.then(setOidcClient);

        }, []);

        if (oidcClient === undefined) {
            return null;
        }

        return (
            <oidcClientContext.Provider value={oidcClient}>
                {children}
            </oidcClientContext.Provider>
        );

    }



    return { OidcClientProvider };

}

export function useOidcClient() {
    const oidcClient = useContext(oidcClientContext);
    assert(oidcClient !== undefined);
    return { oidcClient };
}
