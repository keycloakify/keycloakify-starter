// See documentation of oidc-spa for more details:
// https://docs.oidc-spa.dev

import { createReactOidc } from "oidc-spa/react";
import { z } from "zod";

//On older Keycloak version you need the /auth (e.g: http://localhost:8080/auth)
//On newer version you must remove it (e.g: http://localhost:8080 )
const keycloakUrl = "https://auth.code.gouv.fr/auth";
const keycloakRealm = "keycloakify";
const keycloakClientId= "starter";

export const { OidcProvider, useOidc } = createReactOidc({
    issuerUri: `${keycloakUrl}/realms/${keycloakRealm}`,
    clientId: keycloakClientId,
    // NOTE: You can also pass queries params when calling login()
    extraQueryParams: () => ({
        // This adding ui_locales to the url will ensure the consistency of the language between the app and the login pages
        // If your app implements a i18n system (like i18nifty.dev for example) you should use this and replace "en" by the 
        // current language of the app.
        // On the other side you will find kcContext.locale.currentLanguageTag to be whatever you set here.  
        "ui_locales": "en",
        "my_custom_param": "value of foo transferred to login page"
    }),
    publicUrl: import.meta.env.BASE_URL,
    decodedIdTokenSchema: z.object({
        // Use https://jwt.io/ to tell what's in your idToken
        // It will depend of your Keycloak configuration.
        // Here I declare only two field on the type but actually there are
        // Many more things available. 
        sub: z.string(),
        name: z.string(),
        preferred_username: z.string(),
        // This is a custom attribute set up in our Keycloak configuration
        // it's not present by default. 
        // See https://docs.keycloakify.dev/realtime-input-validation#getting-your-custom-user-attribute-to-be-included-in-the-jwt
        favorite_pet: z.union([z.literal("cat"), z.literal("dog"), z.literal("bird")])
    })
});


export function getKeycloakAccountUrl(
    params: {
        locale: string;
    }
){
    const { locale } = params;

    const accountUrl = new URL(`${keycloakUrl}/realms/${keycloakRealm}/account`);

    const searchParams = new URLSearchParams();

    searchParams.append("kc_locale", locale);
    searchParams.append("referrer", keycloakClientId);
    searchParams.append("referrer_uri", window.location.href);

    accountUrl.search = searchParams.toString();

    return accountUrl.toString();
}