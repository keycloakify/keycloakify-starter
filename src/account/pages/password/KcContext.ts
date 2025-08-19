import { type KcContextCommon, kcContextCommonMock } from "../../components/Template/KcContextCommon";

export type KcContext = KcContextCommon & {
    pageId: "password.ftl";
    password: {
        passwordSet: boolean;
    };
    stateChecker: string;
};

export const kcContextMock: KcContext = {
    ...kcContextCommonMock,
    pageId: "password.ftl",
    password: {
        passwordSet: true
    },
    stateChecker: "state checker"
};
