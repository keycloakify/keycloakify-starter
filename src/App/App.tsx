import "./App.css";
import logo from "./logo.svg";
import myimg from "./myimg.png";
import { createOidcClientProvider, useOidcClient } from "./oidc";
import { addFooToQueryParams, addBarToQueryParams } from "../keycloak-theme/login/valuesTransferredOverUrl";
import jwt_decode from "jwt-decode";
import { addParamToUrl } from "powerhooks/tools/urlSearchParams";

//On older Keycloak version you need the /auth (e.g: http://localhost:8080/auth)
//On newer version you must remove it (e.g: http://localhost:8080 )
const keycloakUrl = "https://auth.code.gouv.fr/auth";
const keycloakRealm = "keycloakify";
const keycloakClient= "starter";

const { OidcClientProvider } = createOidcClientProvider({
    url: keycloakUrl,
    realm: keycloakRealm,
    clientId: keycloakClient,
    //This function will be called just before redirecting, 
    //it should return the current langue. 
    //kcContext.locale.currentLanguageTag will be what this function returned just before redirecting.  
    getUiLocales: () => "en",
    transformUrlBeforeRedirect: url =>
        [url]
            //Instead of foo and bar you could have isDark for example or any other state that you wish to 
            //transfer from the main app to the login pages.
            .map(url => addFooToQueryParams({ url, value: { foo: 42 } }))
            .map(url => addBarToQueryParams({ url, value: "value of bar transferred to login page" }))
        [0],
    log: console.log
});

export default function App() {
    return (
        <OidcClientProvider>
            <ContextualizedApp />
        </OidcClientProvider>
    );
}

function ContextualizedApp() {

    const { oidcClient } = useOidcClient();

    let accountUrl = `${keycloakUrl}/realms/${keycloakRealm}/account`;

    // Set the language the user will get on the account page
    accountUrl = addParamToUrl({
        url: accountUrl,
        name: "kc_locale",
        value: "en"
    }).newUrl;

    // Enable to redirect to the app from the account page we'll get the referrer_uri under kcContext.referrer.url
    // It's useful to avoid hard coding the app url in the keycloak config
    accountUrl = addParamToUrl({
        url: accountUrl,
        name: "referrer",
        value: keycloakClient
    }).newUrl;

    accountUrl = addParamToUrl({
        url: accountUrl,
        name: "referrer_uri",
        value: window.location.href
    }).newUrl;

    return (
        <div className="App">
            <header className="App-header">
                {
                    oidcClient.isUserLoggedIn ?
                        <>
                            <h1>You are authenticated !</h1>
                            {/* On older Keycloak version its /auth/realms instead of /realms */}
                            <a href={accountUrl}>Link to your Keycloak account</a>
                            <pre style={{ textAlign: "left" }}>{JSON.stringify(jwt_decode(oidcClient.getAccessToken()), null, 2)}</pre>
                            <button onClick={() => oidcClient.logout({ redirectTo: "home" })}>Logout</button>
                        </>
                        :
                        <>
                            <button onClick={() => oidcClient.login({ doesCurrentHrefRequiresAuth: false })}>Login</button>
                        </>
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
