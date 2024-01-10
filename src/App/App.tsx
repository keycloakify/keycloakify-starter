import "./App.css";
import logo from "./logo.svg";
import myimg from "./myimg.png";
import { OidcProvider, useOidc, getKeycloakAccountUrl } from "./oidc";

export default function App() {
    return (
        <OidcProvider>
            <ContextualizedApp />
        </OidcProvider>
    );
}

function ContextualizedApp() {

    const { isUserLoggedIn, login, logout, oidcTokens } = useOidc();

    return (
        <div className="App">
            <header className="App-header">
                {isUserLoggedIn ?
                    (
                        <>

                            <h1>Hello {oidcTokens.decodedIdToken.name} !</h1>
                            <a
                                href={getKeycloakAccountUrl({ locale: "en" })}
                            >
                                Link to your Keycloak account
                            </a>
                            <button
                                onClick={() => logout({ redirectTo: "home" })}
                            >
                                Logout
                            </button>
                            <pre style={{ textAlign: "left" }}>
                                {JSON.stringify(oidcTokens.decodedIdToken, null, 2)}
                            </pre>
                        </>
                    )
                    :
                    (
                        <button
                            onClick={() => login({
                                doesCurrentHrefRequiresAuth: false,
                                //extraQueryParams: { kc_idp_hint: "google" }
                            })}
                        >
                            Login
                        </button>
                    )
                }
                <img src={logo} className="App-logo" alt="logo" />
                <img src={myimg} alt="test_image" />
                <p style={{ "fontFamily": '"Work Sans"' }}>Hello world</p>
                <p>Check out all keycloak pages in the <a href="https://storybook.keycloakify.dev">Storybook</a>!</p>
                <p>Once you've identified the ones you want to customize run <code>npx eject-keycloak-page</code></p>
            </header>
        </div>
    );

}

