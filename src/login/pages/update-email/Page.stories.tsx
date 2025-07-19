/**
 * This file has been claimed for ownership from @keycloakify/login-ui-storybook version 250004.0.5.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/update-email/Page.stories.tsx" --revert
 */

import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "update-email.ftl" });

const meta = {
    title: "login/update-email.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * WithAppInitiatedAction:
 * - Purpose: Tests when the form is displayed as part of an application-initiated action.
 * - Scenario: The component renders the form with additional buttons like "Cancel."
 * - Key Aspect: Ensures the "Cancel" button is visible and functional during app-initiated actions.
 */
export const WithAppInitiatedAction: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            messagesPerField: {
                exists: () => false
            },
            isAppInitiatedAction: true
        }
    }
};
