import "./App.css";
import logo from "./logo.svg";
import myimg from "./myimg.png";
import { createOidcClientProvider, useOidcClient } from "./oidc";
import { addFooToQueryParams, addBarToQueryParams } from "../keycloak-theme/valuesTransferredOverUrl";
import { Evt } from "evt";
import { id } from "tsafe/id";
import jwt_decode from "jwt-decode";

const { OidcClientProvider } = createOidcClientProvider({
    url: "https://auth.code.gouv.fr/auth",
    realm: "keycloakify",
    clientId: "starter",
    log: console.log,
    //The login pages will be in english.
    getUiLocales: () => "en",
    transformUrlBeforeRedirect: url =>
        [url]
            //Instead of foo and bar you could have isDark for example or any other state that you wish to 
            //transfer from the main app to the login pages.
            .map(url => addFooToQueryParams({ url, value: { foo: 42 } }))
            .map(url => addBarToQueryParams({ url, value: "value of bar transferred to login page" }))
        [0],
    // An event emitter that posts whenever the user interacts with the app
    // This is to tell if we should allow the token to expires.  
    evtUserActivity:
        Evt.merge([
            Evt.from(document, "mousemove"),
            Evt.from(document, "keydown")
        ]).pipe(() => [id<void>(undefined)]),
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
                        <h1>You are authenticated</h1>
                        <pre>{JSON.stringify(jwt_decode(oidcClient.accessToken))}</pre>
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
