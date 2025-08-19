import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "password.ftl" });

const meta = {
    title: "account/password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMessage: Story = {
    args: {
        kcContext: {
            message: { type: "success", summary: "This is a test message" }
        }
    }
};
/**
 * FirstTimePasswordSetup:
 * - Purpose: Tests the page when no password is set (e.g., first login).
 * - Scenario: This renders the form without the current password field.
 * - Key Aspect: Ensures the page only displays fields for setting a new password.
 */
export const FirstTimePasswordSetup: Story = {
    args: {
        kcContext: {
            account: {
                username: "john_doe"
            },
            password: {
                passwordSet: false
            },
            url: {
                passwordUrl: "/password"
            },
            stateChecker: "state-checker"
        }
    }
};

/**
 * IncorrectCurrentPassword:
 * - Purpose: Simulates validation error when the current password is incorrect.
 * - Scenario: This renders the page with an error message indicating the current password is incorrect.
 * - Key Aspect: Validates that an error message is correctly displayed for the current password input.
 */
export const IncorrectCurrentPassword: Story = {
    args: {
        kcContext: {
            message: { type: "error", summary: "Incorrect current password." },
            account: {
                username: "john_doe"
            },
            password: {
                passwordSet: true
            },
            url: {
                passwordUrl: "/password"
            },
            stateChecker: "state-checker"
        }
    }
};

/**
 * SubmissionSuccessWithRedirect:
 * - Purpose: Simulates a successful form submission with a redirect or success message.
 * - Scenario: After successfully changing the password, a success message and redirect behavior are triggered.
 * - Key Aspect: Verifies the handling of successful submissions.
 */
export const SubmissionSuccessWithRedirect: Story = {
    args: {
        kcContext: {
            message: { type: "success", summary: "Password successfully changed." },
            account: {
                username: "john_doe"
            },
            password: {
                passwordSet: true
            },
            url: {
                passwordUrl: "/password"
            },
            stateChecker: "state-checker"
        }
    }
};
