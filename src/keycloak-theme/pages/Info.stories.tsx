import {ComponentMeta} from '@storybook/react';
import KcApp from '../KcApp';
import {template} from '../../../.storybook/util'

export default {
    kind: 'Page',
    title: 'Theme/Pages/Notification/Info',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

const bind = template('info.ftl');

export const Default = bind({
    messageHeader: 'Yo, get this:',
    message: {
        summary: 'You look good today'
    }
})

export const WithLinkBack = bind({
    messageHeader: 'Yo, get this:',
    message: {
        summary: 'You look good today'
    },
    actionUri: undefined
})

export const WithRequiredActions = bind({
    messageHeader: 'Yo, get this:',
    message: {
        summary: 'Before you can carry on, you need to do this: '
    },
    requiredActions: ["CONFIGURE_TOTP", "UPDATE_PROFILE", "VERIFY_EMAIL"]
})
