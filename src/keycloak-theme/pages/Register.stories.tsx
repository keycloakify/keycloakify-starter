import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';
import { template } from '../../../.storybook/util'

const bind = template('register.ftl')

export default {
    kind: 'Page',
    title: 'Theme/Pages/Register/Legacy',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})

export const WithFieldError = bind({
    register: {
        formData: {
            email: 'max.mustermann@mail.com'
        }
    },
    messagesPerField: {
        existsError: (fieldName: string) => fieldName === "email",
        exists: (fieldName: string) => fieldName === "email",
        get: (fieldName: string) => fieldName === "email" ? "I don't like your email address" : undefined,
        printIfExists: <T,>(fieldName: string, x: T) => fieldName === "email" ? x : undefined,
    }
})

export const WithEmailAsUsername = bind({
    realm: { registrationEmailAsUsername: true }
})

export const WithoutPassword = bind({
    passwordRequired: false
})

export const WithRecaptcha = bind({
    recaptchaRequired: true,
    recaptchaSiteKey: 'foobar'
})

export const WithPresets = bind({
    register: {
        formData: {
            firstName: 'Max',
            lastName: 'Mustermann',
            email: 'max.mustermann@mail.com',
            username: 'max.mustermann'
        }
    }
})