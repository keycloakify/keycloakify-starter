import { KcContextBase, getKcContext } from "keycloakify/lib/getKcContext";
import type { DeepPartial } from "keycloakify/lib/tools/DeepPartial";
import type { ExtendsKcContextBase } from "keycloakify/lib/getKcContext/getKcContextFromWindow";
import type { KcContextExtension } from "keycloak-theme/kcContext";


export const useKcStoryData = (mockData: (
    { pageId: KcContextBase['pageId'] | KcContextExtension['pageId'] } & DeepPartial<ExtendsKcContextBase<KcContextExtension>>
)) => {
    const { kcContext } = getKcContext<KcContextExtension>({ mockPageId: mockData.pageId, mockData: [mockData] })
    return { kcContext: kcContext as NonNullable<typeof kcContext> }
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