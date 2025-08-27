

import { createOidc, type Oidc } from "oidc-spa";
import { parseKeycloakIssuerUri  } from "oidc-spa/tools/parseKeycloakIssuerUri";

export interface KeycloakTokenParsed {
	iss?: string;
	sub?: string;
	aud?: string;
	exp?: number;
	iat?: number;
	auth_time?: number;
	nonce?: string;
	acr?: string;
	amr?: string;
	azp?: string;
	session_state?: string;
	realm_access?: KeycloakRoles;
	resource_access?: KeycloakResourceAccess;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any; // Add other attributes here.
}

export interface KeycloakResourceAccess {
	[key: string]: KeycloakRoles
}

export interface KeycloakRoles {
	roles: string[];
}

export type Keycloak = {
    init: (params: { scope: string | undefined; })=> Promise<void>;
    login: ()=> Promise<never>;
    updateToken: (n: number)=> Promise<void>;
    get token(): string;
    accountManagement: ()=> Promise<never>;
    logout: ()=> Promise<never>;
    get idTokenParsed(): KeycloakTokenParsed;
    onAuthLogout: ()=> Promise<void>;
    subscribeToAutoLogoutCountdown: (
        tickCallback: (params: { secondsLeft: number | undefined; })=> void
    )=> { unsubscribeFromAutoLogoutCountdown: ()=> void; };
};

export default Keycloak;

export function createKeycloak(
    params: {
        homeUrl: string;
        url: string;
        realm: string;
        clientId: string;
    }
): Keycloak {

    const { url, realm, clientId, homeUrl } = params;

    let oidc: Oidc<KeycloakTokenParsed> | undefined = undefined;

    let tokens: Oidc.Tokens<KeycloakTokenParsed> | undefined = undefined;

    const issuerUri= `${url}/realms/${realm}`;

    return {
        init: async ({ scope })=> {

            oidc = await createOidc({
                homeUrl,
                issuerUri,
                clientId,
                scopes: !scope ? undefined : scope.split(" "),
                decodedIdTokenSchema: {
                    parse: decodedIdToken_original =>
                        decodedIdToken_original as KeycloakTokenParsed
                },
                debugLogs: true
            });

            if( !oidc.isUserLoggedIn ){
                return;
            }

            tokens = await oidc.getTokens();

            oidc.subscribeToTokensChange(tokens_new=> {
                tokens= tokens_new;
            });

        },
        login: async ()=> {

            assert(oidc !== undefined);

            assert(!oidc.isUserLoggedIn);

            return oidc.login({
                doesCurrentHrefRequiresAuth: true
            });

        },
        updateToken: async ()=> {

            assert(oidc !== undefined);

            assert(oidc.isUserLoggedIn);

            await oidc.getTokens();
        },
        get token(){

            assert(tokens !== undefined);

            return tokens.accessToken;

        },
        accountManagement: async ()=> {

            const parsedIssuerUri = parseKeycloakIssuerUri(issuerUri);

            assert(parsedIssuerUri !== undefined);
            
            const accountUrl = parsedIssuerUri.getAccountUrl({
                clientId,
                backToAppFromAccountUrl: window.location.href,
                locale: "en"
            });

            window.location.href = accountUrl;

            return new Promise<never>(()=> {});

        },
        logout: async ()=> {

            assert(oidc!==undefined);

            assert(oidc.isUserLoggedIn);

            return oidc.logout({
                redirectTo: "home"
            });

        },
        get idTokenParsed() {

            assert(tokens !== undefined);

            return tokens.decodedIdToken;

        },
        onAuthLogout: async ()=> {
            throw new Error("Assert not used");
        },
        subscribeToAutoLogoutCountdown: tickCallback=> {

            if( oidc === undefined ){
                throw new Error("Assert");
            }

            if( !oidc.isUserLoggedIn ){
                throw new Error("Assert");
            }

            return oidc.subscribeToAutoLogoutCountdown(tickCallback);
        }

    };

}

export function assert(condition?: unknown): asserts condition {
    if (!condition) {
        throw new Error("Assertion error");
    }
}
