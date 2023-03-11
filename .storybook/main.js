module.exports = {
  "stories": [
    "../src/keycloak-theme/pages/Login.stories.tsx",
    "../src/keycloak-theme/pages/Register.stories.tsx",
    "../src/keycloak-theme/pages/MyExtraPage1.stories.tsx",
    "../src/keycloak-theme/pages/MyExtraPage2.stories.tsx",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}