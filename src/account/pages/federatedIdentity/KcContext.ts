import { type KcContextCommon, kcContextCommonMock } from "../../components/Template/KcContextCommon";

export type KcContext = KcContextCommon & {
    pageId: "federatedIdentity.ftl";
    stateChecker: string;
    federatedIdentity: {
        identities: {
            providerId: string;
            displayName: string;
            userName: string;
            connected: boolean;
        }[];
        removeLinkPossible: boolean;
    };
};

export const kcContextMock: KcContext = {
    ...kcContextCommonMock,
    pageId: "federatedIdentity.ftl",
    federatedIdentity: {
        identities: [
            {
                providerId: "keycloak-oidc",
                displayName: "keycloak-oidc",
                userName: "John",
                connected: true
            }
        ],
        removeLinkPossible: true
    },
    stateChecker: ""
};
