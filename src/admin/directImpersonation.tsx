import { useState } from "react";
import { useAdminClient } from "./admin-client";
import { useEnvironment } from "../shared/keycloak-ui-shared";
import type KeycloakAdminClient from "@keycloak/keycloak-admin-client";

export function MaybeImpersonate(props: { children: React.ReactNode }) {
    const { children } = props;

    const { adminClient } = useAdminClient();
    const {
        environment: { realm }
    } = useEnvironment();

    const [{ isDirectImpersonation }] = useState(() =>
        directImpersonation({ realm, adminClient })
    );

    if (isDirectImpersonation) {
        return null;
    }

    return <>{children}</>;
}

const QUERY_PARAM_PREFIX = "impersonate";
const QUERY_PARAM_USER = `${QUERY_PARAM_PREFIX}.user`;
const QUERY_PARAM_REDIRECT_URL = `${QUERY_PARAM_PREFIX}.redirectUrl`;

type ImpersonationQueryParams = {
    user: string;
    redirectUrl: string;
};

function getImpersonationQueryParams(): ImpersonationQueryParams | undefined {

    const url = new URL(window.location.href);

    const user= url.searchParams.get(QUERY_PARAM_USER);

    if( user === null) {
        return undefined;
    }

    url.searchParams.delete(QUERY_PARAM_USER);

    const redirectUrl = url.searchParams.get(QUERY_PARAM_REDIRECT_URL);

    if( redirectUrl === null) {
        throw new Error(`Missing query parameter: ${QUERY_PARAM_REDIRECT_URL}`);
    }

    url.searchParams.delete(QUERY_PARAM_REDIRECT_URL);

    window.history.replaceState({}, "", url.href);

    return { user, redirectUrl };

}

function directImpersonation(params: {
    realm: string;
    adminClient: KeycloakAdminClient;
}): { isDirectImpersonation: boolean } {
    const { realm, adminClient } = params;

    const queryParams = getImpersonationQueryParams();

    if (queryParams === undefined) {
        return { isDirectImpersonation: false };
    }

    (async () => {
        try {
            await adminClient.users.impersonation(
                { id: queryParams.user },
                { user: queryParams.user, realm }
            );
        } catch (error) {
            alert(String(error));
            throw error;
        }

        window.location.href = queryParams.redirectUrl;
    })();

    return {
        isDirectImpersonation: true
    };
}
