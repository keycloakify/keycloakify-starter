import { type KcContextCommon, kcContextCommonMock } from "../../components/Template/KcContextCommon";

export type KcContext = KcContextCommon & {
    pageId: "sessions.ftl";
    sessions: {
        sessions: {
            expires: string;
            clients: string[];
            ipAddress: string;
            started: string;
            lastAccess: string;
            id: string;
        }[];
    };
    stateChecker: string;
};

export const kcContextMock: KcContext = {
    ...kcContextCommonMock,
    pageId: "sessions.ftl",
    sessions: {
        sessions: [
            {
                ipAddress: "127.0.0.1",
                started: new Date().toString(),
                lastAccess: new Date().toString(),
                expires: new Date().toString(),
                clients: ["Chrome", "Firefox"],
                id: "f8951177-817d-4a70-9c02-86d3c170fe51"
            }
        ]
    },
    stateChecker: "g6WB1FaYnKotTkiy7ZrlxvFztSqS0U8jvHsOOOb2z4g"
};
