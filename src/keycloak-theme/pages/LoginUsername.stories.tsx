import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';
import { template } from '../../../.storybook/util'

const bind = template('login-username.ftl');

export default {
    kind: 'Page',
    title: 'Theme/Pages/Login/Username',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})
export const WithEmailAsUsername = bind({ realm: { loginWithEmailAllowed: true, registrationEmailAsUsername: true } })
