import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';
import { template } from '../../../.storybook/util'

const bind = template('login-config-totp.ftl');

export default {
    kind: 'Page',
    title: 'Theme/Pages/Actions/Configure TOTP',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})

export const WithManualSetUp = bind({ mode: 'manual' })
export const WithError = bind({
    messagesPerField: {
        get: (fieldName: string) => fieldName === 'totp' ? 'Invalid TOTP' : undefined,
        exists: (fieldName: string) => fieldName === 'totp',
        existsError: (fieldName: string) => fieldName === 'totp',
        printIfExists: <T,>(fieldName: string, x: T) => fieldName === 'totp' ? x : undefined
    }
})

