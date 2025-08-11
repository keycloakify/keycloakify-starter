import type { KcContext } from "../KcContext.gen";
import type { DeepPartial } from "../../@keycloakify/login-ui/tools/DeepPartial";
import { structuredCloneButFunctions } from "../../@keycloakify/login-ui/tools/structuredCloneButFunctions";
import { deepAssign } from "../../@keycloakify/login-ui/tools/deepAssign";

import { kcContextMock as kcContextMock_login } from "../pages/login/KcContext";
import { kcContextMock as kcContextMock_register } from "../pages/register/KcContext";

export function getKcContextMock<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
    overrides?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
}) {
    const { pageId, overrides } = params;

    const kcContextMock = structuredCloneButFunctions(
        (() => {
            switch (pageId) {
                case "login.ftl":
                    return kcContextMock_login;
                case "register.ftl":
                    return kcContextMock_register;
            }
        })()
    );

    if (overrides !== undefined) {
        deepAssign({
            source: kcContextMock,
            target: overrides
        });
    }

    return kcContextMock;
}
