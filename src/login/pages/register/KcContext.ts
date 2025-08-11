import {
    type KcContextCommon,
    type UserProfile,
    type PasswordPolicies,
    kcContextCommonMock,
    mockAttributesByName
} from "../../components/Template/KcContextCommon";

export type KcContext = KcContextCommon & {
    pageId: "register.ftl";
    profile: UserProfile;
    passwordPolicies?: PasswordPolicies;
    url: {
        registrationAction: string;
    };
    passwordRequired: boolean;
    recaptchaRequired?: boolean;
    recaptchaVisible?: boolean;
    recaptchaSiteKey?: string;
    recaptchaAction?: string;
    termsAcceptanceRequired?: boolean;
    messageHeader?: string;
};

export const kcContextMock: KcContext = {
    ...kcContextCommonMock,
    url: {
        ...kcContextCommonMock.url,
        registrationAction: "#"
    },
    isAppInitiatedAction: false,
    passwordRequired: true,
    recaptchaRequired: false,
    pageId: "register.ftl",
    profile: {
        attributesByName: mockAttributesByName
    },
    scripts: [
        //"https://www.google.com/recaptcha/api.js"
    ]
};
