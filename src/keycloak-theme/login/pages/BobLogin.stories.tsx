import { Meta, StoryObj } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "email-code-form.ftl",
});

const meta = {
  title: "login/BobLogin",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageStory
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              alias: "vipps",
              displayName: "Vipps",
              providerId: "vipps",
              loginUrl:
                "http://localhost:8080/auth/realms/master/broker/vipps/endpoint",
            },
          ],
        },
      }}
    />
  ),
};
