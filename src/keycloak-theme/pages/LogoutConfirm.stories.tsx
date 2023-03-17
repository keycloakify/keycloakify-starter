import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';
import { template } from '../../../.storybook/util'

const bind = template('logout-confirm.ftl');

export default {
    kind: 'Page',
    title: 'Theme/Pages/Login/Logout Confirmation',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})
