/**
 * This file has been claimed for ownership from @keycloakify/login-ui-storybook version 250004.0.5.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/webauthn-register/Page.stories.tsx" --revert
 */

import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "webauthn-register.ftl" });

const meta = {
    title: "login/webauthn-register.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * WithRetryAvailable:
 * - Purpose: Tests when the user is allowed to retry WebAuthn registration after a failure.
 * - Scenario: The component renders the form with a retry option.
 * - Key Aspect: Ensures the retry functionality is available and the form allows the user to retry.
 */
export const WithRetryAvailable: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            isSetRetry: true,
            isAppInitiatedAction: false
        }
    }
};

/**
 * WithErrorDuringRegistration:
 * - Purpose: Tests when an error occurs during WebAuthn registration.
 * - Scenario: The component displays an error message related to WebAuthn registration failure.
 * - Key Aspect: Ensures the error message is displayed correctly, informing the user of the registration failure.
 */
export const WithErrorDuringRegistration: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            isSetRetry: false,
            isAppInitiatedAction: false,
            message: {
                summary: "An error occurred during WebAuthn registration. Please try again.",
                type: "error"
            }
        }
    }
};
