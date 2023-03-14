import {ComponentMeta} from '@storybook/react';
import KcApp from '../KcApp';
import {socialProviders, template} from '../../../.storybook/util'

export default {
    kind: 'Page',
    title: 'Theme/Pages/Login/Login Page Expired',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

const bind = template('login-page-expired.ftl');

export const Default = bind({})
