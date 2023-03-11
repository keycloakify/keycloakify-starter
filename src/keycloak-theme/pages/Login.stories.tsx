import { ComponentMeta } from '@storybook/react';
import KcApp from '../KcApp';

import { useKcStoryData, socialProviders } from '../../../.storybook/data'

export default {
  title: 'Login',
  component: KcApp,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof KcApp>;

const pageId = 'login.ftl'

export const Default = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined })
  return <KcApp kcContext={kcContext} />
}

export const InFrench = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, locale: { currentLanguageTag: 'fr' } })
  return <KcApp kcContext={kcContext} />
}

export const RealmDisplayNameIsHtml = () => {
  const { kcContext } = useKcStoryData({
    pageId, message: undefined, realm: {
      displayNameHtml: '<marquee>my realm</marquee>'
    }
  })
  return <KcApp kcContext={kcContext} />
}

export const NoInternationalization = () => {
  const { kcContext } = useKcStoryData({
    pageId, message: undefined, realm: {
      internationalizationEnabled: false,
    }
  })
  return <KcApp kcContext={kcContext} />
}

export const NoPasswordField = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, realm: { password: false } })
  return <KcApp kcContext={kcContext} />
}

export const RegistrationNotAllowed = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, realm: { registrationAllowed: false } })
  return <KcApp kcContext={kcContext} />
}

export const RememberMeNotAllowed = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, realm: { rememberMe: false } })
  return <KcApp kcContext={kcContext} />
}

export const PasswordResetNotAllowed = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, realm: { resetPasswordAllowed: false } })
  return <KcApp kcContext={kcContext} />
}

export const EmailIsUsername = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, realm: { loginWithEmailAllowed: false } })
  return <KcApp kcContext={kcContext} />
}

export const TryAnotherWay = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, auth: { showTryAnotherWayLink: true } })
  return <KcApp kcContext={kcContext} />
}

export const PresetUsername = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, login: { username: 'max.mustermann@mail.com' } })
  return <KcApp kcContext={kcContext} />
}

export const ReadOnlyPresetUsername = () => {
  const { kcContext } = useKcStoryData({ pageId, message: undefined, login: { username: 'max.mustermann@mail.com' }, usernameEditDisabled: true })
  return <KcApp kcContext={kcContext} />
}

export const WithSocialProviders = () => {
  const { kcContext } = useKcStoryData({
    pageId, message: undefined, social: {
      displayInfo: true,
      providers: socialProviders
    }
  })
  return <KcApp kcContext={kcContext} />
}

export const WithError = () => {
  const { kcContext } = useKcStoryData({ pageId, message: { type: "error", summary: "This is an error" } })
  return <KcApp kcContext={kcContext} />
}
