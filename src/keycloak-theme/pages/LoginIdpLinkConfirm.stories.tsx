import {ComponentMeta} from '@storybook/react';
import KcApp from '../KcApp';
import {template} from '../../../.storybook/util'

export default {
    kind: 'Page',
    title: 'Theme/Pages/Login/Confirm IDP Link',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

const bind = template('login-idp-link-confirm.ftl');

export const Default = bind({})

