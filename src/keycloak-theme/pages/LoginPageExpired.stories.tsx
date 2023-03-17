import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';
import { template } from '../../../.storybook/util'

const bind = template('login-page-expired.ftl');

export default {
    kind: 'Page',
    title: 'Theme/Pages/Login/Login Page Expired',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})
