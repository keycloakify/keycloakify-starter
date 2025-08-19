import { type KcContextCommon, kcContextCommonMock } from "../../components/Template/KcContextCommon";

export type KcContext = KcContextCommon & {
    pageId: "log.ftl";
    log: {
        events: {
            date: string | number | Date;
            event: string;
            ipAddress: string;
            client: string;
            details: { value: string; key: string }[];
        }[];
    };
};

export const kcContextMock: KcContext = {
    ...kcContextCommonMock,
    pageId: "log.ftl",
    log: {
        events: [
            {
                date: "2/21/2024, 1:28:39 PM",
                event: "login",
                ipAddress: "172.17.0.1",
                client: "security-admin-console",
                details: [{ key: "openid-connect", value: "admin" }]
            }
        ]
    }
};
