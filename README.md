# Custom Keycloak Admin UI with Direct Impersonation

This project provides a streamlined impersonation workflow within the Keycloak Admin Console.  

The only custom code is at [src/admin](./src/admin).  

Assume we're working in realm `myrealm`, at `https://keycloak.company.com`. There are two applications:

- **Customer-facing application**  
  - Client ID: `customer-app`  
  - URL: `https://company.com`
- **Support staff application**  
  - Client ID: `admin-app`  
  - URL: `https://company.com/admin`

Both support staff and customers reside in the same realm `myrealm`, but support staff have permission to impersonate any user.

## The Problem

By default, support staff can impersonate a user without any custom code by:

1. Going to `https://keycloak.company.com/realms/myrealm/account/`.
2. Logging in with support staff credentials.
3. Selecting **Users** in the left menu.
4. Searching for the user (e.g., `customer1`).
5. Under **Action**, choosing **Impersonate** (opens the Admin Console as `customer1`).
6. Manually changing the URL to `https://company.com/`.

Though it works, this process requires many steps.

## The Desired Workflow

Ideally, a support staff member can:

1. Navigate to `https://company.com/admin`.  
2. Log in with support staff credentials.  
3. Search for a user (e.g., `customer1`).  
4. Click **Impersonate**.  
5. Automatically land on `https://company.com` as `customer1`.  

This custom Keycloak Admin UI supports that workflow.

### Implementation Overview

To finalize Step 5, the support staff application can handle it with a simple redirect:

```js
const url = new URL('https://keycloak.company.com/realms/myrealm/console');
url.searchParams.append('impersonate.user', 'customer1');
url.searchParams.append('impersonate.redirectUrl', 'https://company.com');

window.location.href = url.href;
```

Because support staff already have an active Keycloak session, the impersonation only proceeds if their account has the required impersonation permissions.

## Enabling the Custom Keycloak Admin UI

To build and deploy the custom admin theme:

```bash
git clone https://github.com/keycloakify/keycloakify-starter
cd keycloakify-starter
git checkout direct_impersonation
yarn
yarn build-keycloak-theme
```

A prebuilt version is also available at [this link](./release/keycloak-admin-with-direct-impersonation.jar).  

Next, upload `dist_keycloak/keycloak-admin-with-direct-impersonation.jar` to your Keycloak server. (Refer to [the Keycloakify documentation](https://docs.keycloakify.dev/deploying-your-theme) for more details on deploying themes.)

Then, enable it as the admin theme:

1. Go to `https://keycloak.company.com/auth/admin/master/console/`.
2. Log in as the Keycloak admin.
3. Choose **myrealm** in the top-left dropdown.
4. Open **Realm Settings**.
5. Select the **Themes** tab.
6. Under **Admin Theme**, pick `keycloak-v2-with-direct-impersonation`.
7. Click **Save**.

## Why Not Use Keycloak Token Exchange?

Although you might consider the experimental [Keycloak Token Exchange](https://www.keycloak.org/securing-apps/token-exchange), in practice:

Exchanged tokens still set `azp` to `admin-app` so the customer application 
cannot refresh these tokens properly. Impersonation will only lasts for the 
access token’s lifespan (commonly five minutes).  

This issue is discussed in detail here:  
- [Keycloak impersonation mints token for wrong client (Stack Overflow)](https://stackoverflow.com/questions/62466630/keycloak-impersonation-mints-token-for-wrong-client)  
- [Keycloak GitHub Issue #8756](https://github.com/keycloak/keycloak/issues/8756)

## Example implementation  

You can find an example implementation here:  
https://github.com/keycloakify/impersonation-test.oidc-spa.dev  

In this example:  
- **Customer-facing application**  
  - Client ID: `example-tanstack-router` (`customer-app`)
  - URL: `https://example-tanstack-router.oidc-spa.dev` (`https://company.com`)
- **Support staff application**  
  - Client ID: `impersonation-test`  (`admin-app`)
  - URL: `https://impersonation-test.oidc-spa.dev` (`https://company.com/admin`)
- Keycloak url: `https://cloud-iam.oidc-spa.dev` (`https://keycloak.company.com`)
- Keycloak realm: `oidc-spa` (`myrealm`)
- Support staff user: `staff1` 
- Impersonated customer user: `alice` (`customer1`)

1. Navigate to `https://impersonation-test.oidc-spa.dev`
2. Log in as `staff1` (password hidden, contact me on discord if you want to actually test it).
3. Click click on the link to impersonate `alice`.
4. You’ll be redirected to `https://example-tanstack-router.oidc-spa.dev/` as Alice.