import "./App.css";
import logo from "./logo.svg";
import myimg from "./myimg.png";
import { createOidcClientProvider, useOidcClient } from "./oidc";
import { addFooToQueryParams, addBarToQueryParams } from "../keycloak-theme/valuesTransferredOverUrl";
import jwt_decode from "jwt-decode";

const { OidcClientProvider } = createOidcClientProvider({
    url: "https://auth.code.gouv.fr/auth",
    realm: "keycloakify",
    clientId: "starter",
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

    return (
        <div className="App">
            <header className="App-header">
            {
                oidcClient.isUserLoggedIn ?
                    <>
                        <h1>You are authenticated !</h1>
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
            </header>
        </div>
    );
}
