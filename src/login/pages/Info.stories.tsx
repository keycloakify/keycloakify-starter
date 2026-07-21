import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "info.ftl" });

const meta = {
    title: "login/info.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

/**
 * EmailUpdateConfirmationSent:
 * - Purpose: Previews the confirmation Keycloak shows after submitting
 *   update-email when email verification is enabled in the realm.
 * - Scenario: The component renders the "email sent" info message.
 * - Key Aspect: Ensures the confirmation page reads well in this theme.
 */
export const EmailUpdateConfirmationSent: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messageHeader: "Email update confirmation",
                message: {
                    summary:
                        "An email with a link to update email has been sent to new@example.org. Follow the link in the email to complete the email update.",
                    type: "info"
                }
            }}
        />
    )
};
