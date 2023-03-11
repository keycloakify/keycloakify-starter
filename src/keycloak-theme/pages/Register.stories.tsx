import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';

import { useKcStoryData, socialProviders } from '../../../.storybook/data'

export default {
  title: 'Register',
  component: KcApp,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof KcApp>;

const pageId = 'register.ftl'

export const Default = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined })
  return <KcApp kcContext={kcContext} />
}

export const InFrench = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, locale: { currentLanguageTag: 'fr' } })
  return <KcApp kcContext={kcContext} />
}

export const WithError = () => {
  const { kcContext } = useKcStoryData({ pageId, message: { type: "error", summary: "This is an error" } })
  return <KcApp kcContext={kcContext} />
}

export const EmailIsUsername = () => {
  const { kcContext } = useKcStoryData({
    pageId, message: undefined,
    realm: { registrationEmailAsUsername: true }
  })
  return <KcApp kcContext={kcContext} />
}

export const NoPassword = () => {
  const { kcContext } = useKcStoryData({
    pageId, message: undefined, passwordRequired: false
  })
  return <KcApp kcContext={kcContext} />
}

export const WithRecaptcha = () => {
  const { kcContext } = useKcStoryData({
    pageId, message: undefined,
    recaptchaRequired: true,
    recaptchaSiteKey: 'foobar'
  })
  return <KcApp kcContext={kcContext} />
}

export const WithPresets = () => {
  const { kcContext } = useKcStoryData({
    pageId, message: undefined,
    register: {
      formData: {
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'max.mustermann@mail.com',
        username: 'max.mustermann'
      }
    }
  })
  return <KcApp kcContext={kcContext} />

}