import {ComponentMeta} from '@storybook/react';
import KcApp from '../KcApp';
import {template} from '../../../.storybook/util'

export default {
    kind: 'Page',
    title: 'Theme/Pages/Login/Reset Password',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

const bind = template('login-reset-password.ftl');

export const Default = bind({})
export const WithEmailAsUsername = bind({realm: {loginWithEmailAllowed: true, registrationEmailAsUsername: true}})
