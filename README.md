<p align="center">
    <i>🚀 <a href="https://keycloakify.dev">Keycloakify</a> v10 starter 🚀</i>
    <br/>
    <br/>
    <img src="https://github.com/codegouvfr/keycloakify-starter/workflows/ci/badge.svg?branch=main">
    <br/>
</p>

This starter is based on Vite. There is also [a Webpack based starter](https://github.com/keycloakify/keycloakify-starter-cra).

# Quick start

```bash
git clone https://github.com/keycloakify/keycloakify-starter
cd keycloakify-starter
yarn install 
yarn build-keycloak-theme # Build the keycloak theme, generate the .jar file to be imported in Keycloak
```

# Storybook

```bash
npx keycloakify add-story # Select the pages you want to add stories for
yarn storybook # Start Storybook
```

# Test in a real Keycloak environment

Test your theme in a local Keycloak docker container.

```bash
npx keycloakify start-keycloak
```

# Advanced customization

The starter only enables you to implement CSS level customization. To take full ownership 
of some pages use the command:  

```bash
npx keycloakify eject-page
```
