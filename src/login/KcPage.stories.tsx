import type { Meta, StoryObj } from '@storybook/react';
import KcPage from "./KcPage";
import { getKcContextMock } from "./KcContext";

const meta = {
    title: 'login/KcPage',
    component: KcPage,
} satisfies Meta<typeof KcPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {
    args: {
        kcContext: getKcContextMock({
            pageId: "login.ftl",
            overrides: {}
        })
    },
    render: (args) => <KcPage kcContext={args.kcContext} />,
};

export const Register: Story = {
    args: {
        kcContext: getKcContextMock({
            pageId: "register.ftl",
            overrides: {}
        })
    },
    render: (args) => <KcPage kcContext={args.kcContext} />,
};
