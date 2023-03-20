module.exports = {
    "stories": [
        "../src/keycloak-theme/**/*.stories.tsx",
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions"
    ],
    "framework": "@storybook/react",
    builder: '@storybook/builder-vite',
    "staticDirs": ['../public']
}
