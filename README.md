<p align="center">
    <i>🚀 A starter/demo project for <a href="https://keycloakify.dev">Keycloakify</a> v9 🚀</i>
    <br/>
    <br/>
    <img src="https://github.com/codegouvfr/keycloakify-starter/workflows/ci/badge.svg?branch=main">
    <br/>
    <br/>
    <a href="https://starter.keycloakify.dev">Authenticated React SPA</a>
</p>

# Introduction

This repo constitutes an easily reusable setup for a Keycloak theme project OR for a SPA React App that generates a
Keycloak theme that goes along with it.  
If you are only looking to create a Keycloak theme (and not a Keycloak theme and an App that share the same codebase) there are a lot of things that you can remove from this starter: [Please read this section of the README](#standalone-keycloak-theme).

> ❗️ WARNING ❗️: Don't waste time trying to port this setup to [Vite](https://vitejs.dev/).  
> Currently Keycloakify only works collocated with Webpack projects but [we are working toward enabling collocation with Vite](https://github.com/keycloakify/keycloakify/pull/275)!  

# Quick start

```bash
git clone https://github.com/keycloakify/keycloakify-starter

cd keycloakify-starter

yarn # install dependencies (it's like npm install)

yarn storybook # Start Storybook
               # This is by far the best way to develop your theme
               # This enable to quickly see your pages in isolation and in different states.  
               # You can create stories even for pages that you haven't explicitly overloaded. See src/keycloak-theme/login/pages/LoginResetPassword.stories.tsx
               # See Keycloakify's storybook for if you need a starting point for your stories: https://github.com/keycloakify/keycloakify/tree/main/stories

yarn start # See the Hello World app
           # Uncomment line 97 of src/keycloak-theme/login/kcContext where it reads: `mockPageId: "login.ftl"`, reload https://localhost:3000
           # You can now see the login.ftl page with the mock data. (Don't forget to comment it back when you're done)
          
# Install mvn (Maven) if not already done. On mac it's 'brew install maven', on Ubuntu/Debian it's 'sudo apt-get install maven'

yarn build-keycloak-theme # Actually build the theme (generates the .jar to be imported in Keycloak)
                          # Read the instruction printed on the console to see how to test
                          # your theme on a real Keycloak instance.

npx eject-keycloak-page # Prompt that let you select the pages you want to customize
                        # This CLI tools is not guaranty to work, you can always copy pase pages 
                        # from the Keycloakify repo.

npx initialize-email-theme # For initializing your email theme
                           # Note that Keycloakify does not feature React integration for email yet.

npx download-builtin-keycloak-theme # For downloading the default theme (as a reference)
                                    # Look for the files in build_keycloak/src/main/resources/theme/{base,keycloak}
```

# Theme variant  

Keycloakify enables you to create different variant for a single theme.  
This enable you to have a single jar that embed two or more theme variant.  

![Theme variant](https://content.gitbook.com/content/FcBKODbZbNDgm0rc6a9K/blobs/9iKgs2rv2Kfb2pbs4dRz/image.png)  

You can enable this feature by providing multiple theme name in the Keycloakify build option.  
[See documentation](https://docs.keycloakify.dev/build-options#themename)  

# The CI workflow

-   You need to manually allow GitHub Action to push on your repository.  For this reason the initial setup will fail.  You need to enabled permission and re-run failed job: [see video](https://user-images.githubusercontent.com/6702424/213480604-0aac0ea7-487f-491d-94ae-df245b2c7ee8.mov).  
-   This CI is configured to publish [the app](https://starter.keycloakify.dev) on [GitHub Pages](https://github.com/codegouvfr/keycloakify-starter/blob/3617a71deb1a6544c3584aa8d6d2241647abd48c/.github/workflows/ci.yaml#L51-L76) and on [DockerHub](https://github.com/codegouvfr/keycloakify-starter/blob/3617a71deb1a6544c3584aa8d6d2241647abd48c/.github/workflows/ci.yaml#L78-L123) (as a Ngnix based docker image). In practice you probably want one or the other but not both... or neither if you are just building a theme (and not a theme + an app).  
    If you want to enable the CI to publish on DockerHub on your behalf go to repository `Settings` tab, then `Secrets` you will need to add two new secrets:
    `DOCKERHUB_TOKEN`, you Dockerhub authorization token.  
    `DOCKERHUB_USERNAME`, Your Dockerhub username.
    We deploy the demo app at [starter.keycloakify.dev](https://starter.keycloakify.dev) using GitHub page on the branch `gh-pages` (you have to enable it).  
    To configure your own domain name please refer to [this documentation](https://docs.gitlanding.dev/using-a-custom-domain-name).
-   To release **don't create a tag manually**, the CI do it for you. Just update the `package.json`'s version field and push.
-   The `.jar` files that bundle the Keycloak theme will be attached as an asset with every GitHub release. [Example](https://github.com/InseeFrLab/keycloakify-starter/releases/tag/v0.1.0). The permalink to download the latest version is: `https://github.com/USER/PROJECT/releases/latest/download/keycloak-theme.jar`.
    For this demo repo it's [here](https://github.com/codegouvfr/keycloakify-starter/releases/latest/download/keycloak-theme.jar)
-   The CI publishes the app docker image on DockerHub. `<org>/<repo>:main` for each **commit** on `main`, `<org>/<repo>:<feature-branch-name>` for each **pull-request** on `main`
    and when **releasing a new version**: `<org>/<repo>:latest` and `<org>/<repo>:X.Y.Z`
    [See on DockerHub](https://hub.docker.com/r/codegouvfr/keycloakify-starter)

![image](https://user-images.githubusercontent.com/6702424/229296422-9d522707-114e-4282-93f7-01ca38c3a1e0.png)  

![image](https://user-images.githubusercontent.com/6702424/229296556-a69f2dc9-4653-475c-9c89-d53cf33dc05a.png)


# The storybook  

![image](https://user-images.githubusercontent.com/6702424/232350420-1921af90-d33e-492e-9296-0083298a84fa.png)  

```bash
yarn
yarn storybook
```

# Docker  

Instructions for building and running the react app (`src/App`) that is collocated with our Keycloak theme. 

```bash
docker build -f Dockerfile -t keycloakify/keycloakify-starter:main .
docker run -it -dp 8083:80 keycloakify/keycloakify-starter:main
# You can access the app at http://localhost:8083
```

# I only want a Keycloak theme

If you are only looking to create a Keycloak theme and not a Theme + a React app, you can run theses few commands
after clicking ![image](https://user-images.githubusercontent.com/6702424/98155461-92395e80-1ed6-11eb-93b2-98c64453043f.png) to refactor the template 
and remove unnecessary files.  

```bash
rm -r src/App
mv src/keycloak-theme/* src/
rm -r src/keycloak-theme

cat << EOF > src/index.tsx
import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { kcContext as kcLoginThemeContext } from "./login/kcContext";
import { kcContext as kcAccountThemeContext } from "./account/kcContext";

const KcLoginThemeApp = lazy(() => import("./login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>
            {(()=>{

                if( kcLoginThemeContext !== undefined ){
                    return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
                }

                if( kcAccountThemeContext !== undefined ){
                    return <KcAccountThemeApp kcContext={kcAccountThemeContext} />;
                }

                throw new Error(
                  "This app is a Keycloak theme" +
                  "It isn't meant to be deployed outside of Keycloak"
                );

            })()}
        </Suspense>
    </StrictMode>
);

EOF

rm .dockerignore Dockerfile nginx.conf

cat << EOF > .github/workflows/ci.yaml
name: ci
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:

  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
    - uses: bahmutov/npm-install@v1
    - run: yarn build
    - run: npx keycloakify
      env:
        XDG_CACHE_HOME: "/home/runner/.cache/yarn"

  check_if_version_upgraded:
    name: Check if version upgrade
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    needs: test
    outputs:
      from_version: \${{ steps.step1.outputs.from_version }}
      to_version: \${{ steps.step1.outputs.to_version }}
      is_upgraded_version: \${{ steps.step1.outputs.is_upgraded_version }}
    steps:
    - uses: garronej/ts-ci@v2.1.0
      id: step1
      with: 
        action_name: is_package_json_version_upgraded
        branch: \${{ github.head_ref || github.ref }}

  create_github_release:
    runs-on: ubuntu-latest
    needs: check_if_version_upgraded
    # We create a release only if the version have been upgraded and we are on a default branch
    if: needs.check_if_version_upgraded.outputs.is_upgraded_version == 'true' && github.event_name == 'push'
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
    - uses: bahmutov/npm-install@v1
    - run: yarn build
    - run: npx keycloakify
      env:
        XDG_CACHE_HOME: "/home/runner/.cache/yarn"
    - run: mv build_keycloak/target/retrocompat-*.jar retrocompat-keycloak-theme.jar
    - run: mv build_keycloak/target/*.jar keycloak-theme.jar
    - uses: softprops/action-gh-release@v1
      with:
        name: Release v\${{ needs.check_if_version_upgraded.outputs.to_version }}
        tag_name: v\${{ needs.check_if_version_upgraded.outputs.to_version }}
        target_commitish: \${{ github.head_ref || github.ref }}
        generate_release_notes: true
        draft: false
        files: |
          retrocompat-keycloak-theme.jar
          keycloak-theme.jar
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

EOF
```

You can also remove `oidc-spa`, `powerhooks`, `zod` and `tsafe` from your dependencies.  
