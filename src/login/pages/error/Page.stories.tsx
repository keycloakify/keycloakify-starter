/**
 * This file has been claimed for ownership from @keycloakify/login-ui-storybook version 250004.0.5.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/error/Page.stories.tsx" --revert
 */

import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "error.ftl" });

const meta = {
    title: "login/error.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAnotherMessage: Story = {
    args: {
        kcContext: {
            message: { summary: "With another error message" }
        }
    }
};

export const WithHtmlErrorMessage: Story = {
    args: {
        kcContext: {
            message: {
                summary:
                    "<strong>Error:</strong> Something went wrong. <a href='https://example.com'>Go back</a>"
            }
        }
    }
};
export const FrenchError: Story = {
    args: {
        kcContext: {
            locale: { currentLanguageTag: "fr" },
            message: { summary: "Une erreur s'est produite" }
        }
    }
};
export const WithSkipLink: Story = {
    args: {
        kcContext: {
            message: { summary: "An error occurred" },
            skipLink: true,
            client: {
                baseUrl: "https://example.com"
            }
        }
    }
};
