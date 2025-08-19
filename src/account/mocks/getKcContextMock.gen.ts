import type { KcContext } from "../KcContext.gen";
import type { DeepPartial } from "../../@keycloakify/account-multi-page-ui/tools/DeepPartial";
import { structuredCloneButFunctions } from "../../@keycloakify/account-multi-page-ui/tools/structuredCloneButFunctions";
import { deepAssign } from "../../@keycloakify/account-multi-page-ui/tools/deepAssign";
import { kcContextMock as kcContextMock_account } from "../pages/account/KcContext";
import { kcContextMock as kcContextMock_applications } from "../pages/applications/KcContext";
import { kcContextMock as kcContextMock_federatedIdentity } from "../pages/federatedIdentity/KcContext";
import { kcContextMock as kcContextMock_log } from "../pages/log/KcContext";
import { kcContextMock as kcContextMock_password } from "../pages/password/KcContext";
import { kcContextMock as kcContextMock_sessions } from "../pages/sessions/KcContext";
import { kcContextMock as kcContextMock_totp } from "../pages/totp/KcContext";

export function getKcContextMock<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
    overrides?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
}) {
    const { pageId, overrides } = params;

    const kcContextMock = structuredCloneButFunctions(
        (() => {
            switch (pageId) {
                case "account.ftl":
                    return kcContextMock_account;
                case "applications.ftl":
                    return kcContextMock_applications;
                case "federatedIdentity.ftl":
                    return kcContextMock_federatedIdentity;
                case "log.ftl":
                    return kcContextMock_log;
                case "password.ftl":
                    return kcContextMock_password;
                case "sessions.ftl":
                    return kcContextMock_sessions;
                case "totp.ftl":
                    return kcContextMock_totp;
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
