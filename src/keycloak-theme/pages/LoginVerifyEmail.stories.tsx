import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';
import { template } from '../../../.storybook/util'

const bind = template('login-verify-email.ftl');

export default {
    kind: 'Page',
    title: 'Theme/Pages/Login/Verify Email',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})
