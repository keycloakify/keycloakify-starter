import {ComponentMeta} from '@storybook/react';
import KcApp from '../KcApp';
import {socialProviders, template} from '../../../.storybook/util'

export default {
    kind: 'Page',
    title: 'Theme/Pages/Login/Login',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

const bind = template('login.ftl');

export const Default = bind({})
export const WithoutPasswordField = bind({realm: {password: false}})
export const WithoutRegistration = bind({realm: {registrationAllowed: false}})
export const WithoutRememberMe = bind({realm: {rememberMe: false}})
export const WithoutPasswordReset = bind({realm: {resetPasswordAllowed: false}})
export const WithEmailAsUsername = bind({realm: {loginWithEmailAllowed: false}})
export const WithPresetUsername = bind({login: {username: 'max.mustermann@mail.com'}})
export const WithImmutablePresetUsername = bind({
    login: {username: 'max.mustermann@mail.com'},
    usernameEditDisabled: true
})
export const WithSocialProviders = bind({social: {displayInfo: true, providers: socialProviders}})
