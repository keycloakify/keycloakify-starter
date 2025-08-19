import { type KcContextCommon, kcContextCommonMock } from "../../components/Template/KcContextCommon";

export type KcContext = KcContextCommon & {
    pageId: "totp.ftl";
    totp: {
        enabled: boolean;
        totpSecretEncoded: string;
        qrUrl: string;
        policy: {
            algorithm: "HmacSHA1" | "HmacSHA256" | "HmacSHA512";
            digits: number;
            lookAheadWindow: number;
            getAlgorithmKey: () => string;
        } & (
            | {
                  type: "totp";
                  period: number;
              }
            | {
                  type: "hotp";
                  initialCounter: number;
              }
        );
        supportedApplications: string[];
        totpSecretQrCode: string;
        manualUrl: string;
        totpSecret: string;
        otpCredentials: { id: string; userLabel: string }[];
    };
    mode?: "qr" | "manual" | undefined | null;
    isAppInitiatedAction: boolean;
    stateChecker: string;
};

export const kcContextMock: KcContext = {
    ...kcContextCommonMock,
    pageId: "totp.ftl",
    totp: {
        enabled: true,
        totpSecretEncoded: "KVVF G2BY N4YX S6LB IUYT K2LH IFYE 4SBV",
        qrUrl: "#",
        totpSecretQrCode:
            "iVBORw0KGgoAAAANSUhEUgAAAPYAAAD2AQAAAADNaUdlAAACM0lEQVR4Xu3OIZJgOQwDUDFd2UxiurLAVnnbHw4YGDKtSiWOn4Gxf81//7r/+q8b4HfLGBZDK9d85NmNR+sB42sXvOYrN5P1DcgYYFTGfOlbzE8gzwy3euweGizw7cfdl34/GRhlkxjKNV+5AebPXPORX1JuB9x8ZfbyyD2y1krWAKsbMq1HnqQDaLfa77p4+MqvzEGSqvSAD/2IHW2yHaigR9tX3m8dDIYGcNf3f+gDpVBZbZU77zyJ6Rlcy+qoTMG887KAPD9hsh6a1Sv3gJUHGHUAxSMzj7zqDDe7Phmt2eG+8UsMxjRGm816MAO+8VMl1R1jGHOrZB/5Zo/WXAPgxixm9Mo96vDGrM1eOto8c4Ax4wF437mifOXlpiPzCnN7Y9l95NnEMxgMY9AAGA8fucH14Y1aVb6N/cqrmyh0BVht7k1e+bU8LK0Cg5vmVq9c5vHIjOfqxDIfeTraNVTwewa4wVe+SW5N+uP1qACeudUZbqGOfA6VZV750Noq2Xx3kpveV44ZelSV1V7KFHzkWyVrrlUwG0Pl9pWnoy3vsQoME6vKI69i5osVgwWzHT7zjmJtMcNUSVn1oYMd7ZodbgowZl45VG0uVuLPUr1yc79uaQBag/mqR34xhlWyHm1prplHboCWdZ4TeZjsK8+dI+jbz1C5hl65mcpgB5dhcj8+dGO+0Ko68+lD37JDD83dpDLzzK+TrQyaVwGj6pUboGV+7+AyN8An/pf84/7rv/4/1l4OCc/1BYMAAAAASUVORK5CYII=",
        manualUrl: "#",
        totpSecret: "G4nsI8lQagRMUchH8jEG",
        otpCredentials: [],
        supportedApplications: [
            "totpAppFreeOTPName",
            "totpAppMicrosoftAuthenticatorName",
            "totpAppGoogleName"
        ],
        policy: {
            algorithm: "HmacSHA1",
            digits: 6,
            lookAheadWindow: 1,
            type: "totp",
            period: 30,
            getAlgorithmKey: () => "SHA1"
        }
    },
    mode: "qr",
    isAppInitiatedAction: false,
    stateChecker: ""
};
