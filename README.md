<p align="center">
    <i>🚀 <a href="https://keycloakify.dev">Keycloakify</a> v10 starter 🚀</i>
    <br/>
    <br/>
</p>

This starter is based on Vite. There is also [a Webpack based starter](https://github.com/keycloakify/keycloakify-starter-webpack).

# Quick start

```bash
git clone https://github.com/keycloakify/keycloakify-starter
cd keycloakify-starter
yarn install
```
> NOTE: This setup uses yarn as the default but you can use any package manager you like.  

# Testing the theme locally

[Documentation](https://docs.keycloakify.dev/v/v10/testing-your-theme)  

# How to customize the theme

[Documentation](https://docs.keycloakify.dev/v/v10/customization-strategies)

# Building the theme

```bash
npm run build-keycloak-theme
```

Note that by default Keycloakify generates multiple .jar files for different versions of Keycloak.  
You can customize this behavior, see documentation [here](https://docs.keycloakify.dev/v/v10/targetting-specific-keycloak-versions).  

# GitHub Actions

The starter comes with a generic GitHub Actions workflow that builds the theme and publishes
the jars [as GitHub releases artifacts](https://github.com/keycloakify/keycloakify-starter/releases/tag/v7.1.0).  
To release a new version **just update the `package.json` version and push**.

To enable the workflow go to your fork of this repository on GitHub then navigate to:
`Settings` > `Actions` > `Workflow permissions`, select `Read and write permissions`.

