import { type KcContextCommon, kcContextCommonMock } from "../../components/Template/KcContextCommon";

export type KcContext = KcContextCommon & {
    pageId: "login.ftl";
    url: {
        loginResetCredentialsUrl: string;
        registrationUrl: string;
    };
    realm: {
        loginWithEmailAllowed: boolean;
        rememberMe: boolean;
        password: boolean;
        resetPasswordAllowed: boolean;
        registrationAllowed: boolean;
    };
    auth: {
        selectedCredential?: string;
    };
    registrationDisabled: boolean;
    login: {
        username?: string;
        rememberMe?: string; // "on" | undefined
        password?: string;
    };
    usernameHidden?: boolean;
};

export const kcContextMock: KcContext = {
    ...kcContextCommonMock,
    pageId: "login.ftl",
    url: {
        ...kcContextCommonMock.url,
        loginResetCredentialsUrl: "#",
        registrationUrl: "#"
    },
    realm: {
        ...kcContextCommonMock.realm,
        loginWithEmailAllowed: true,
        rememberMe: true,
        password: true,
        resetPasswordAllowed: true,
        registrationAllowed: true
    },
    auth: kcContextCommonMock.auth!,
    usernameHidden: false,
    login: {},
    registrationDisabled: false
};
