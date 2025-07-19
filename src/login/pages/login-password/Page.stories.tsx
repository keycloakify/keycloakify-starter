/**
 * This file has been claimed for ownership from @keycloakify/login-ui-storybook version 250004.0.5.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-password/Page.stories.tsx" --revert
 */

import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-password.ftl" });

const meta = {
    title: "login/login-password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * WithPasswordError:
 * - Purpose: Tests the behavior when an error occurs in the password field (e.g., incorrect password).
 * - Scenario: Simulates a scenario where an invalid password is entered, and an error message is displayed.
 * - Key Aspect: Ensures that the password input field displays error messages correctly.
 */
export const WithPasswordError: Story = {
    args: {
        kcContext: {
            realm: {
                resetPasswordAllowed: true
            },
            url: {
                loginAction: "/mock-login",
                loginResetCredentialsUrl: "/mock-reset-password"
            },
            messagesPerField: {
                existsError: (field: string) => field === "password",
                get: () => "Invalid password"
            }
        }
    }
};

/**
 * WithoutResetPasswordOption:
 * - Purpose: Tests the behavior when the reset password option is disabled.
 * - Scenario: Simulates a scenario where the `resetPasswordAllowed` is set to `false`, and the "Forgot Password" link is not rendered.
 * - Key Aspect: Ensures that the component handles cases where resetting the password is not allowed.
 */
export const WithoutResetPasswordOption: Story = {
    args: {
        kcContext: {
            realm: {
                resetPasswordAllowed: false
            },
            url: {
                loginAction: "/mock-login",
                loginResetCredentialsUrl: "/mock-reset-password"
            },
            messagesPerField: {
                existsError: () => false
            }
        }
    }
};
