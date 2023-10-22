import "./App.css";
import logo from "./logo.svg";
import myimg from "./myimg.png";
import { useMemo } from "react";
import { createOidcProvider, useOidc } from "oidc-spa/react";
import { addQueryParamToUrl } from "oidc-spa/tools/urlQueryParams";
import { decodeJwt } from "oidc-spa";
import { assert } from "tsafe/assert";

//On older Keycloak version you need the /auth (e.g: http://localhost:8080/auth)
//On newer version you must remove it (e.g: http://localhost:8080 )
const keycloakUrl = "https://auth.code.gouv.fr/auth";
const keycloakRealm = "keycloakify";
const keycloakClientId= "starter";

const { OidcProvider } = createOidcProvider({
    issuerUri: `${keycloakUrl}/realms/${keycloakRealm}`,
    clientId: keycloakClientId,
    transformUrlBeforeRedirect: url => {

        // This adding ui_locales to the url will ensure the consistency of the language between the app and the login pages
        // If your app implements a i18n system (like i18nifty.dev for example) you should use this and replace "en" by the 
        // current language of the app.
        // On the other side you will find kcContext.locale.currentLanguageTag to be whatever you set here.  
        url = addQueryParamToUrl({
            url,
            "name": "ui_locales",
            "value": "en",
        }).newUrl;

        // If you want to pass some custom state to the login pages...
        // See in src/keycloak-theme/pages/Login.tsx how it's retrieved.
        url = addQueryParamToUrl({
            url,
            "name": "my_custom_param",
            "value": "value of foo transferred to login page",
        }).newUrl;

        return url;

    },
    // Uncomment if your app is not hosted at the origin and update /foo/bar/baz.
    //silentSsoUrl: `${window.location.origin}/foo/bar/baz/silent-sso.html`,
});

export default function App() {
    return (
        <OidcProvider>
            <ContextualizedApp />
        </OidcProvider>
    );
}


function ContextualizedApp() {

    const { oidc } = useOidc();

    return (
        <div className="App">
            <header className="App-header">
                {
                    oidc.isUserLoggedIn ?
                        <AuthenticatedRoute logout={() => oidc.logout({ redirectTo: "home" })} />
                        :
                        <button onClick={() => oidc.login({ doesCurrentHrefRequiresAuth: false })}>Login</button>
                }
                <img src={logo} className="App-logo" alt="logo" />
                <img src={myimg} alt="test_image" />
                <p style={{ "fontFamily": '"Work Sans"' }}>Hello world</p>
                <p>Check out all keycloak pages in the <a href="https://storybook.keycloakify.dev/storybook">Storybook</a>!</p>
                <p>Once you've identified the ones you want to customize run <code>npx eject-keycloak-page</code></p>
            </header>
        </div>
    );

}

function AuthenticatedRoute(props: { logout: () => void; }) {

    const { logout } = props;

    const { user } = useUser();

    return (
        <>
            <h1>Hello {user.name} !</h1>
            <a href={buildAccountUrl({ locale: "en" })}>Link to your Keycloak account</a>
            <button onClick={logout}>Logout</button>
            <pre style={{ textAlign: "left" }}>{JSON.stringify(user, null, 2)}</pre>
        </>
    );

}

function useUser() {
    const { oidc } = useOidc();

    assert(oidc.isUserLoggedIn, "This hook can only be used when the user is logged in");

    const { idToken } = oidc.getTokens();

    const user = useMemo(
        () =>
            decodeJwt<{
                // Use https://jwt.io/ to tell what's in your idToken
                // It will depend of your Keycloak configuration.
                // Here I declare only two field on the type but actually there are
                // Many more things available. 
                sub: string;
                name: string;
                preferred_username: string;
                // This is a custom attribute set up in our Keycloak configuration
                // it's not present by default. 
                // See https://docs.keycloakify.dev/realtime-input-validation#getting-your-custom-user-attribute-to-be-included-in-the-jwt
                favorite_pet: "cat" | "dog" | "bird";
            }>(idToken),
        [idToken]
    );

    return { user };
}

function buildAccountUrl(
    params: {
        locale: string;
    }
){

    const { locale } = params;

    let accountUrl = `${keycloakUrl}/realms/${keycloakRealm}/account`;

    // Set the language the user will get on the account page
    accountUrl = addQueryParamToUrl({
        url: accountUrl,
        name: "kc_locale",
        value: locale
    }).newUrl;

    // Enable to redirect to the app from the account page we'll get the referrer_uri under kcContext.referrer.url
    // It's useful to avoid hard coding the app url in the keycloak config
    accountUrl = addQueryParamToUrl({
        url: accountUrl,
        name: "referrer",
        value: keycloakClientId
    }).newUrl;

    accountUrl = addQueryParamToUrl({
        url: accountUrl,
        name: "referrer_uri",
        value: window.location.href
    }).newUrl;

    return accountUrl;

}
