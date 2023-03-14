import {ComponentMeta} from '@storybook/react';
import KcApp from '../KcApp';
import {template} from '../../../.storybook/util'

export default {
    kind: 'Page',
    title: 'Theme/Pages/Custom/My Extra Page 2',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;

const bind = template('my-extra-page-2.ftl')

export const Default = bind({})

export const WithCustomValue = bind({someCustomValue: 'Foo Bar Baz'})
