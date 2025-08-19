import { type KcContextCommon, kcContextCommonMock } from "../../components/Template/KcContextCommon";

export type KcContext = KcContextCommon & {
    pageId: "account.ftl";
    url: {
        accountUrl: string;
    };
    realm: {
        registrationEmailAsUsername: boolean;
        editUsernameAllowed: boolean;
    };
    stateChecker: string;
};

export const kcContextMock: KcContext = {
    ...kcContextCommonMock,
    pageId: "account.ftl",
    url: {
        ...kcContextCommonMock.url,
        referrerURI: "#",
        accountUrl: "#"
    },
    realm: {
        ...kcContextCommonMock.realm,
        registrationEmailAsUsername: true,
        editUsernameAllowed: true
    },
    stateChecker: ""
};
