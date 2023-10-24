import "./App.css";
import logo from "./logo.svg";
import myimg from "./myimg.png";
import { useMemo } from "react";
import { createOidcProvider, useOidc } from "oidc-spa/react";
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
    // NOTE: You can also pass queries params when calling oidc.login()
    getExtraQueryParams: () => ({
        // This adding ui_locales to the url will ensure the consistency of the language between the app and the login pages
        // If your app implements a i18n system (like i18nifty.dev for example) you should use this and replace "en" by the 
        // current language of the app.
        // On the other side you will find kcContext.locale.currentLanguageTag to be whatever you set here.  
        "ui_locales": "en",
        "my_custom_param": "value of foo transferred to login page"
    }),
    /*
     * This parameter have to be provided provide if your App is not hosted at the origin of the subdomain.
     * For example if your site is hosted by navigating to `https://www.example.com`
     * you don't have to provide this parameter.
     * On the other end if your site is hosted by navigating to `https://www.example.com/my-app`
     * Then you want to set publicUrl to `/my-app`
     *
     * Be mindful that `${window.location.origin}${publicUrl}/silent-sso.html` must return the `silent-sso.html` that
     * you are supposed to have created in your `public/` directory.
     *
     * If your are still using `create-react-app` (like we are for now) you can just set
     * publicUrl to `process.env.PUBLIC_URL` and don't have to think about it further.
     */
    publicUrl: process.env.PUBLIC_URL
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
                        <button 
                            onClick={() => oidc.login({ 
                                doesCurrentHrefRequiresAuth: false,
                                //extraQueryParams: { kc_idp_hint: "google" }
                            })}>
                                Login
                        </button>
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

    const accountUrl = new URL(`${keycloakUrl}/realms/${keycloakRealm}/account`);

    const searchParams = new URLSearchParams();

    searchParams.append("kc_locale", locale);
    searchParams.append("referrer", keycloakClientId);
    searchParams.append("referrer_uri", window.location.href);

    accountUrl.search = searchParams.toString();

    return accountUrl.toString();
}