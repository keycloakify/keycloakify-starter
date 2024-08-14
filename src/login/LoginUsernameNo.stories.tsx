import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "./KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-username.ftl" });

const meta = {
    title: "login/login-username-no.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithEmailAsUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    loginWithEmailAllowed: true,
                    registrationEmailAsUsername: true
                },
                locale: {
                    currentLanguageTag: "no"
                },
                social: {
                    displayInfo: false,
                    providers: [
                        {
                            alias: "vipps",
                            displayName: "Vipps",
                            providerId: "vipps",
                            loginUrl:
                                "http://localhost:8080/auth/realms/BOB/broker/vipps/endpoint"
                        }
                    ]
                }
            }}
        />
    )
};
