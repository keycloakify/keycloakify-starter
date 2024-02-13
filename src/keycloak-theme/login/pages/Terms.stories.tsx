import { Meta, StoryObj } from '@storybook/react';
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
    pageId: "terms.ftl"
});

const meta = {
    title: "login/Terms",
    component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: () => <PageStory />
};
