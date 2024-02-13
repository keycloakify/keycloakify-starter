import { Meta, StoryObj } from '@storybook/react';
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
    pageId: "my-extra-page-2.ftl"
});

const meta = {
    title: "login/MyExtraPage2",
    component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <PageStory />
};

export const WitAbc: Story = {
    render: () => (
        <PageStory
            kcContext={{
                someCustomValue: "abc"
            }}
        />
    )
};
