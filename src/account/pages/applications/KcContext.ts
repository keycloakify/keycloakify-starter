import { type KcContextCommon, kcContextCommonMock } from "../../components/Template/KcContextCommon";

export type KcContext = KcContextCommon & {
    pageId: "applications.ftl";
    features: {
        log: boolean;
        identityFederation: boolean;
        authorization: boolean;
        passwordUpdateSupported: boolean;
    };
    stateChecker: string;
    applications: {
        applications: {
            realmRolesAvailable: {
                name: string;
                description: string;
                compositesStream?: Record<string, unknown>;
                clientRole?: boolean;
                composite?: boolean;
                id?: string;
                containerId?: string;
                attributes?: Record<string, unknown>;
            }[];
            resourceRolesAvailable: Record<
                string,
                {
                    roleName: string;
                    roleDescription?: string;
                    clientName: string;
                    clientId: string;
                }[]
            >;
            additionalGrants: string[];
            clientScopesGranted: string[];
            effectiveUrl?: string;
            client: {
                alwaysDisplayInConsole: boolean;
                attributes: Record<string, unknown>;
                authenticationFlowBindingOverrides: Record<string, unknown>;
                baseUrl?: string;
                bearerOnly: boolean;
                clientAuthenticatorType: string;
                clientId: string;
                consentRequired: boolean;
                consentScreenText: string;
                description: string;
                directAccessGrantsEnabled: boolean;
                displayOnConsentScreen: boolean;
                dynamicScope: boolean;
                enabled: boolean;
                frontchannelLogout: boolean;
                fullScopeAllowed: boolean;
                id: string;
                implicitFlowEnabled: boolean;
                includeInTokenScope: boolean;
                managementUrl: string;
                name?: string;
                nodeReRegistrationTimeout: string;
                notBefore: string;
                protocol: string;
                protocolMappersStream: Record<string, unknown>;
                publicClient: boolean;
                realm: Record<string, unknown>;
                realmScopeMappingsStream: Record<string, unknown>;
                redirectUris: string[];
                registeredNodes: Record<string, unknown>;
                rolesStream: Record<string, unknown>;
                rootUrl?: string;
                scopeMappingsStream: Record<string, unknown>;
                secret: string;
                serviceAccountsEnabled: boolean;
                standardFlowEnabled: boolean;
                surrogateAuthRequired: boolean;
                webOrigins: string[];
            };
        }[];
    };
};

const getDefaultClient = (
    overrides: Partial<KcContext["applications"]["applications"][number]["client"]>
): KcContext["applications"]["applications"][number]["client"] => ({
    alwaysDisplayInConsole: false,
    attributes: {},
    authenticationFlowBindingOverrides: {},
    baseUrl: "#",
    bearerOnly: false,
    clientAuthenticatorType: "client-secret",
    clientId: "client-id",
    consentRequired: false,
    consentScreenText: "",
    description: "",
    directAccessGrantsEnabled: false,
    displayOnConsentScreen: true,
    dynamicScope: false,
    enabled: true,
    frontchannelLogout: false,
    fullScopeAllowed: false,
    id: "client-internal-id",
    implicitFlowEnabled: false,
    includeInTokenScope: true,
    managementUrl: "",
    name: "Application",
    nodeReRegistrationTimeout: "0",
    notBefore: "0",
    protocol: "openid-connect",
    protocolMappersStream: {},
    publicClient: true,
    realm: {},
    realmScopeMappingsStream: {},
    redirectUris: ["*"],
    registeredNodes: {},
    rolesStream: {},
    rootUrl: "#",
    scopeMappingsStream: {},
    secret: "*****",
    serviceAccountsEnabled: false,
    standardFlowEnabled: true,
    surrogateAuthRequired: false,
    webOrigins: ["*"],
    ...overrides
});

export const kcContextMock: KcContext = {
    ...kcContextCommonMock,
    pageId: "applications.ftl",
    features: {
        log: true,
        identityFederation: false,
        authorization: true,
        passwordUpdateSupported: true
    },
    stateChecker: "state-checker-value",
    applications: {
        applications: [
            {
                realmRolesAvailable: [
                    {
                        name: "realmRoleName1",
                        description: "realm role description 1"
                    },
                    {
                        name: "realmRoleName2",
                        description: "realm role description 2"
                    }
                ],
                resourceRolesAvailable: {
                    resource1: [
                        {
                            roleName: "Resource Role Name 1",
                            roleDescription: "Resource role 1 description",
                            clientName: "Client Name 1",
                            clientId: "client1"
                        }
                    ],
                    resource2: [
                        {
                            roleName: "Resource Role Name 2",
                            clientName: "Client Name 1",
                            clientId: "client1"
                        }
                    ]
                },
                additionalGrants: ["grant1", "grant2"],
                clientScopesGranted: ["scope1", "scope2"],
                effectiveUrl: "#",
                client: getDefaultClient({
                    clientId: "application1",
                    id: "app1-id",
                    name: "Application 1",
                    consentRequired: true
                })
            },
            {
                realmRolesAvailable: [
                    {
                        name: "Realm Role Name 1",
                        description: "realm role description"
                    }
                ],
                resourceRolesAvailable: {},
                additionalGrants: [],
                clientScopesGranted: [],
                effectiveUrl: "#",
                client: getDefaultClient({
                    clientId: "application2",
                    id: "app2-id",
                    name: "Application 2",
                    consentRequired: false
                })
            }
        ]
    }
};
