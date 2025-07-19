/**
 * This file has been claimed for ownership from @keycloakify/login-ui-storybook version 250004.0.5.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-x509-info/Page.stories.tsx" --revert
 */

import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-x509-info.ftl" });

const meta = {
    title: "login/login-x509-info.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * WithoutUserEnabled:
 * - Purpose: Tests when the user is not enabled to log in via x509.
 * - Scenario: The component renders the certificate details but does not provide the option to log in or cancel.
 * - Key Aspect: Ensures that the login buttons are not displayed when the user is not enabled.
 */
export const WithoutUserEnabled: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            x509: {
                formData: {
                    subjectDN: "CN=John Doe, OU=Example Org, O=Example Inc, C=US",
                    username: "johndoe",
                    isUserEnabled: false // User not enabled for login
                }
            }
        }
    }
};
