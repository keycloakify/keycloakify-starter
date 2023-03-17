import type {ComponentMeta} from '@storybook/react';
import KcApp from './KcApp';
import {template} from '../../.storybook/util'

const bind = template('my-extra-page-1.ftl');

export default {
    title: 'Theme/Template',
    component: KcApp,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof KcApp>;


export const Default = bind({})
export const InFrench = bind({locale: {currentLanguageTag: 'fr'}})
export const RealmDisplayNameIsHtml = bind({
    realm: {
        displayNameHtml: '<marquee>my realm</marquee>'
    }
})

export const NoInternationalization = bind({
    realm: {
        internationalizationEnabled: false,
    }
})

export const WithGlobalError = bind({
    message: {type: "error", summary: "This is an error"}
})
