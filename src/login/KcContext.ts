/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ExtendKcContext } from "keycloakify/login/KcContext";
import type { KcEnvName, ThemeName } from "../kc.gen";
import { createGetKcContextMock } from "keycloakify/login/KcContext";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
};

export type KcContextExtensionPerPage = {};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;

export const { getKcContextMock } = createGetKcContextMock<KcContextExtension, KcContextExtensionPerPage>({
    kcContextExtension: {
        themeName: "keycloakify-starter",
        properties: {
            // Gerekirse mock property değerleri buraya eklenir
        }
    },
    kcContextExtensionPerPage: {},
    overrides: {},
    overridesPerPage: {}
});

// Varsayılan export olarak mock context'i veriyoruz (geliştirme ortamı için)
export const kcContext = getKcContextMock({
    pageId: "login.ftl",
    overrides: {}
});
