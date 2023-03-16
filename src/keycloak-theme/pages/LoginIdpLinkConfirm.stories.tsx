import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';
import { template } from '../../../.storybook/util'

const bind = template('login-idp-link-confirm.ftl');

export default {
    kind: 'Page',
    title: 'Theme/Pages/IDP/Confirm Link',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})

