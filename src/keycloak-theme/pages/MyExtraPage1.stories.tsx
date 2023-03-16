import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';
import { template } from '../../../.storybook/util'

const bind = template('my-extra-page-1.ftl')

export default {
    kind: 'Page',
    title: 'Theme/Pages/Custom/My Extra Page 1',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

export const Default = bind({})
