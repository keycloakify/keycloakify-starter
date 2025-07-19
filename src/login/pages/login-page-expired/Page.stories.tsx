/**
 * This file has been claimed for ownership from @keycloakify/login-ui-storybook version 250004.0.5.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-page-expired/Page.stories.tsx" --revert
 */

import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-page-expired.ftl" });

const meta = {
    title: "login/login-page-expired.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * WithErrorMessage:
 * - Purpose: Tests behavior when an error message is displayed along with the page expiration message.
 * - Scenario: Simulates a case where the session expired due to an error, and an error message is displayed alongside the expiration message.
 * - Key Aspect: Ensures that error messages are displayed correctly in addition to the page expiration notice.
 */
export const WithErrorMessage: Story = {
    args: {
        kcContext: {
            url: {
                loginRestartFlowUrl: "/mock-restart-flow",
                loginAction: "/mock-continue-login"
            },
            message: {
                type: "error",
                summary: "An error occurred while processing your session."
            }
        }
    }
};
