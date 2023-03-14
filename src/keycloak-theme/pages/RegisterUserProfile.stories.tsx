import {ComponentMeta} from '@storybook/react';
import KcApp from '../KcApp';
import {template} from '../../../.storybook/util'

const bind = template('register-user-profile.ftl')

export default {
    kind: 'Page',
    title: 'Theme/Pages/Register/Modern',
    component: KcApp,
    parameters: {layout: 'fullscreen'},
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})

export const WithFieldError = bind({
    profile: {
        attributes: [
            {
                name: "email",
                value: "max.mustermann@mail.com",
            }
        ]
    }
})

export const WithPresets = bind({
    profile: {
        attributes: [
            {
                name: "username",
                value: "max.mustermann"
            },
            {
                name: "email",
                value: "max.mustermann@gmail.com",
            },
            {
                name: "firstName",
                required: false,
                value: "Max"
            },
            {
                name: "lastName",
                required: false,
                value: "Mustermann"
            }
        ]
    }
})

export const WithImmutablePresets = bind({
    profile: {
        attributes: [
            {
                name: "username",
                value: "max.mustermann",
                readOnly: true,
            },
            {
                name: "email",
                value: "max.mustermann@gmail.com",
                readOnly: true,
            },
            {
                name: "firstName",
                required: true,
                value: "Max",
                readOnly: true,
            },
            {
                name: "lastName",
                required: true,
                value: "Mustermann",
                readOnly: true,
            }
        ]
    }
})
