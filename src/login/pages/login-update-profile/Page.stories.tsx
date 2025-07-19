/**
 * This file has been claimed for ownership from @keycloakify/login-ui-storybook version 250004.0.5.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-update-profile/Page.stories.tsx" --revert
 */

import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-update-profile.ftl" });

const meta = {
    title: "login/login-update-profile.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * WithProfileError:
 * - Purpose: Tests when an error occurs in one or more profile fields (e.g., invalid email format).
 * - Scenario: The component displays error messages next to the affected fields.
 * - Key Aspect: Ensures the profile fields show error messages when validation fails.
 */
export const WithProfileError: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            messagesPerField: {
                existsError: (field: string) => field === "email",
                get: () => "Invalid email format"
            },
            isAppInitiatedAction: false
        }
    }
};
