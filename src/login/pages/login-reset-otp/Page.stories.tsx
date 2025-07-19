/**
 * This file has been claimed for ownership from @keycloakify/login-ui-storybook version 250004.0.5.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-reset-otp/Page.stories.tsx" --revert
 */

import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-reset-otp.ftl" });

const meta = {
    title: "login/login-reset-otp.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * WithoutOtpCredentials:
 * - Purpose: Tests the behavior when no OTP credentials are available.
 * - Scenario: The component renders without any OTP credentials, showing only the submit button.
 * - Key Aspect: Ensures that the component handles the absence of OTP credentials correctly.
 */
export const WithoutOtpCredentials: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login"
            },
            configuredOtpCredentials: {
                userOtpCredentials: [],
                selectedCredentialId: undefined
            },
            messagesPerField: {
                existsError: () => false
            }
        }
    }
};

/**
 * WithOtpError:
 * - Purpose: Tests the behavior when an error occurs with the OTP selection.
 * - Scenario: Simulates a scenario where an error occurs (e.g., no OTP selected), and an error message is displayed.
 * - Key Aspect: Ensures that error messages are displayed correctly for OTP-related errors.
 */
export const WithOtpError: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login"
            },
            configuredOtpCredentials: {
                userOtpCredentials: [
                    { id: "otp1", userLabel: "Device 1" },
                    { id: "otp2", userLabel: "Device 2" }
                ],
                selectedCredentialId: "otp1"
            },
            messagesPerField: {
                existsError: (field: string) => field === "totp",
                get: () => "Invalid OTP selection"
            }
        }
    }
};

/**
 * WithOnlyOneOtpCredential:
 * - Purpose: Tests the behavior when there is only one OTP credential available.
 * - Scenario: Simulates the case where the user has only one OTP credential, and it is pre-selected by default.
 * - Key Aspect: Ensures that the component renders correctly with only one OTP credential pre-selected.
 */
export const WithOnlyOneOtpCredential: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login"
            },
            configuredOtpCredentials: {
                userOtpCredentials: [{ id: "otp1", userLabel: "Device 1" }],
                selectedCredentialId: "otp1"
            },
            messagesPerField: {
                existsError: () => false
            }
        }
    }
};
