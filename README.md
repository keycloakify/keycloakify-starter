# Quick start


## Testing the theme locally

[Documentation](https://docs.keycloakify.dev/v/v10/testing-your-theme)

## How to customize the theme

[Documentation](https://docs.keycloakify.dev/v/v10/customization-strategies)

## Building the theme

You need to have Maven installed to build the theme (The `mvn` command must be in the PATH).

-   On macOS: `brew install maven`
-   On Debian/Ubuntu: `sudo apt-get install maven`
-   On Windows: `choco install openjdk` and `choco install maven` (Or download from [here](https://maven.apache.org/download.cgi))

```bash
pnpm build-keycloak-theme
```

Note that by default Keycloakify generates multiple .jar files for different versions of Keycloak.  
You can customize this behavior, see documentation [here](https://docs.keycloakify.dev/v/v10/targetting-specific-keycloak-versions).

Then import to keycloak [guide](https://docs.keycloakify.dev/keycloak-configuration/importing-your-theme-in-keycloak)

# GitHub Actions

The starter comes with a generic GitHub Actions workflow that builds the theme and publishes
the jars [as GitHub releases artifacts](https://github.com/keycloakify/keycloakify/releases/tag/v7.0.1).  
To release a new version **just update the `package.json` version and push**.

To enable the workflow go to your fork of this repository on GitHub then navigate to:
`Settings` > `Actions` > `Workflow permissions`, select `Read and write permissions`.
