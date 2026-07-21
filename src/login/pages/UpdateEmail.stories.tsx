import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "update-email.ftl" });

const meta = {
    title: "login/update-email.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

/**
 * WithAppInitiatedAction:
 * - Purpose: Tests the account-console "Update email" flow (AIA).
 * - Scenario: The component renders with a Cancel button next to Submit.
 * - Key Aspect: Ensures the secondary Cancel button styling and the
 *   Submit/Cancel spacing are correct.
 */
export const WithAppInitiatedAction: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                isAppInitiatedAction: true
            }}
        />
    )
};
