import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';
import { template } from '../../../.storybook/util'

const bind = template('idp-review-user-profile.ftl');

export default {
    kind: 'Page',
    title: 'Theme/Pages/IDP/Review User Profile',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})

