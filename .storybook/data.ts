import { KcContextBase, getKcContext } from "keycloakify/lib/getKcContext";
import type { DeepPartial } from "keycloakify/lib/tools/DeepPartial";
import type { ExtendsKcContextBase } from "keycloakify/lib/getKcContext/getKcContextFromWindow";

type KcContextExt =
    | { pageId: "my-extra-page-1.ftl"; }
    | { pageId: "my-extra-page-2.ftl"; someCustomValue: string; }
    // NOTE: register.ftl is deprecated in favor of register-user-profile.ftl
    // but let's say we use it anyway and have this plugin enabled: https://github.com/micedre/keycloak-mail-whitelisting
    // keycloak-mail-whitelisting define the non standard ftl global authorizedMailDomains, we declare it here.
    | { pageId: "register.ftl"; authorizedMailDomains: string[]; }

export const useKcStoryData = (mockData: (
    { pageId: KcContextBase['pageId'] | KcContextExt['pageId'] } & DeepPartial<ExtendsKcContextBase<KcContextExt>>
)) => {

    const { kcContext } = getKcContext<KcContextExt>({
        mockPageId: mockData.pageId,
        mockData: [mockData]
    })
    if (!kcContext) throw new Error("no kcContext")
    return { kcContext }
}


export const socialProviders = [
    { loginUrl: 'google', alias: 'google', providerId: 'google', displayName: 'Google' },
    { loginUrl: 'microsoft', alias: 'microsoft', providerId: 'microsoft', displayName: 'Microsoft' },
    { loginUrl: 'facebook', alias: 'facebook', providerId: 'facebook', displayName: 'Facebook' },
    { loginUrl: 'instagram', alias: 'instagram', providerId: 'instagram', displayName: 'Instagram' },
    { loginUrl: 'twitter', alias: 'twitter', providerId: 'twitter', displayName: 'Twitter' },
    { loginUrl: 'linkedin', alias: 'linkedin', providerId: 'linkedin', displayName: 'LinkedIn' },
    { loginUrl: 'stackoverflow', alias: 'stackoverflow', providerId: 'stackoverflow', displayName: 'Stackoverflow' },
    { loginUrl: 'github', alias: 'github', providerId: 'github', displayName: 'Github' },
    { loginUrl: 'gitlab', alias: 'gitlab', providerId: 'gitlab', displayName: 'Gitlab' },
    { loginUrl: 'bitbucket', alias: 'bitbucket', providerId: 'bitbucket', displayName: 'Bitbucket' },
    { loginUrl: 'paypal', alias: 'paypal', providerId: 'paypal', displayName: 'PayPal' },
    { loginUrl: 'openshift', alias: 'openshift', providerId: 'openshift', displayName: 'OpenShift' },
]