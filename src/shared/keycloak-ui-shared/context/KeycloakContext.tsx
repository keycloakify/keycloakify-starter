/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/context/KeycloakContext.tsx" --revert
 */

/* eslint-disable */

import { Spinner } from "../../@patternfly/react-core";
import { type Keycloak, createKeycloak } from "../../keycloak-js";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { AlertProvider } from "../alerts/Alerts";
import { ErrorPage } from "./ErrorPage";
import { Help } from "./HelpContext";
import { BaseEnvironment } from "./environment";

export type KeycloakContext<T extends BaseEnvironment = BaseEnvironment> =
    KeycloakContextProps<T> & {
        keycloak: Keycloak;
    };

const createKeycloakEnvContext = <T extends BaseEnvironment>() =>
    createContext<KeycloakContext<T> | undefined>(undefined);

let KeycloakEnvContext: any;

export const useEnvironment = <T extends BaseEnvironment = BaseEnvironment>() => {
    const context = useContext<KeycloakContext<T>>(KeycloakEnvContext);
    if (!context)
        throw Error(
            "no environment provider in the hierarchy make sure to add the provider"
        );
    return context;
};

interface KeycloakContextProps<T extends BaseEnvironment> {
    environment: T;
}

export const KeycloakProvider = <T extends BaseEnvironment>({
    environment,
    children
}: PropsWithChildren<KeycloakContextProps<T>>) => {
    KeycloakEnvContext = createKeycloakEnvContext<T>();
    const calledOnce = useRef(false);
    const [init, setInit] = useState(false);
    const [error, setError] = useState<unknown>();
    const keycloak = useMemo(() => {
        const keycloak = createKeycloak({
            homeUrl: environment.consoleBaseUrl,
            url: environment.serverBaseUrl,
            realm: environment.realm,
            clientId: environment.clientId,
        });

        keycloak.onAuthLogout = () => keycloak.login();

        return keycloak;
    }, [environment]);

    useEffect(() => {
        // only needed in dev mode
        if (calledOnce.current) {
            return;
        }

        const init = () =>
            keycloak.init({
                scope: environment.scope
            });

        init()
            .then(() => setInit(true))
            .catch(error => setError(error));

        calledOnce.current = true;
    }, [keycloak]);

    const searchParams = new URLSearchParams(window.location.search);

    if (error || searchParams.get("error_description")) {
        return (
            <ErrorPage error={error ? error : searchParams.get("error_description")} />
        );
    }

    if (!init) {
        return <Spinner />;
    }

    return (
        <KeycloakEnvContext.Provider value={{ environment, keycloak }}>
            <AlertProvider>
                <Help>{children}</Help>
            </AlertProvider>
        </KeycloakEnvContext.Provider>
    );
};
