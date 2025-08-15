# API Reference

This document provides detailed API documentation for the Keycloakify project, including Keycloak integration points, data structures, and configuration options.

## Overview

The Keycloakify project integrates with Keycloak's authentication and authorization system. The application doesn't make direct API calls but instead receives context data from Keycloak and submits forms to Keycloak-managed endpoints.

## Keycloak Integration

### Context Injection

Keycloak injects context data into the page via `window.kcContext`:

```typescript
interface KcContext {
    themeType: "login" | "account";
    pageId: string;
    realm: string;
    auth: AuthData;
    url: URLData;
    message: MessageData;
    properties: Record<string, string>;
    themeName: ThemeName;
}
```

### Context Data Structure

#### AuthData

```typescript
interface AuthData {
    attemptedUsername?: string;
    user?: UserData;
    authenticated: boolean;
    error?: string;
    successMessage?: string;
}
```

#### UserData

```typescript
interface UserData {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    enabled: boolean;
    attributes: Record<string, string[]>;
}
```

#### URLData

```typescript
interface URLData {
    loginAction: string;
    loginUrl: string;
    loginRestartUrl: string;
    registrationUrl: string;
    resetCredentialsUrl: string;
    oauth2DeviceAuthorizationUrl: string;
    oauth2DeviceVerificationUrl: string;
}
```

#### MessageData

```typescript
interface MessageData {
    type: "success" | "warning" | "error" | "info";
    summary: string;
    formatted: string;
}
```

## Form Endpoints

### Authentication Endpoints

#### Login Form

**Endpoint**: `POST {kcContext.url.loginAction}`

**Form Fields**:
- `username` (string): User's username or email
- `password` (string): User's password
- `rememberMe` (boolean, optional): Remember user session
- `credentialId` (string, optional): For multi-factor authentication

**Example**:
```html
<form action="{kcContext.url.loginAction}" method="post">
    <input name="username" value="{kcContext.auth.attemptedUsername}" />
    <input name="password" type="password" />
    <input name="rememberMe" type="checkbox" />
    <button type="submit">Sign In</button>
</form>
```

#### Registration Form

**Endpoint**: `POST {kcContext.url.registrationUrl}`

**Form Fields**:
- `firstName` (string): User's first name
- `lastName` (string): User's last name
- `email` (string): User's email address
- `username` (string): Desired username
- `password` (string): Password
- `passwordConfirm` (string): Password confirmation

**Example**:
```html
<form action="{kcContext.url.registrationUrl}" method="post">
    <input name="firstName" value="{user.firstName}" />
    <input name="lastName" value="{user.lastName}" />
    <input name="email" value="{user.email}" />
    <input name="username" value="{user.username}" />
    <input name="password" type="password" />
    <input name="passwordConfirm" type="password" />
    <button type="submit">Register</button>
</form>
```

#### Password Reset

**Endpoint**: `POST {kcContext.url.resetCredentialsUrl}`

**Form Fields**:
- `username` (string): Username or email for password reset

**Example**:
```html
<form action="{kcContext.url.resetCredentialsUrl}" method="post">
    <input name="username" value="{kcContext.auth.attemptedUsername}" />
    <button type="submit">Reset Password</button>
</form>
```

### Account Management Endpoints

#### Profile Update

**Endpoint**: `POST /auth/realms/{realm}/account`

**Form Fields**:
- `firstName` (string): Updated first name
- `lastName` (string): Updated last name
- `email` (string): Updated email address
- `username` (string): Updated username

**Example**:
```html
<form action="/auth/realms/{realm}/account" method="post">
    <input name="firstName" value="{user.firstName}" />
    <input name="lastName" value="{user.lastName}" />
    <input name="email" value="{user.email}" />
    <button type="submit">Update Profile</button>
</form>
```

#### Password Change

**Endpoint**: `POST /auth/realms/{realm}/account/password`

**Form Fields**:
- `currentPassword` (string): Current password
- `passwordNew` (string): New password
- `passwordConfirm` (string): New password confirmation

**Example**:
```html
<form action="/auth/realms/{realm}/account/password" method="post">
    <input name="currentPassword" type="password" />
    <input name="passwordNew" type="password" />
    <input name="passwordConfirm" type="password" />
    <button type="submit">Change Password</button>
</form>
```

## Keycloakify Framework API

### Core Functions

#### createUseI18n

Creates internationalization hook for theme components.

```typescript
import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        doLogIn: "Sign In",
        doRegister: "Register",
        // ... more translations
    }
});
```

**Parameters**:
- `translations` (object): Translation strings for each language

**Returns**:
- `useI18n`: Hook for accessing translations
- `ofTypeI18n`: Type-safe translation function

#### ExtendKcContext

Extends Keycloak context with custom properties.

```typescript
import type { ExtendKcContext } from "keycloakify/login";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
```

### Components

#### DefaultPage

Main page component for login theme.

```typescript
import DefaultPage from "keycloakify/login/DefaultPage";

<DefaultPage
    kcContext={kcContext}
    i18n={i18n}
    classes={classes}
    Template={Template}
    doUseDefaultCss={true}
    UserProfileFormFields={UserProfileFormFields}
    doMakeUserConfirmPassword={true}
/>
```

**Props**:
- `kcContext` (KcContext): Keycloak context data
- `i18n` (object): Internationalization data
- `classes` (object): CSS class overrides
- `Template` (component): Page template component
- `doUseDefaultCss` (boolean): Use default Keycloakify CSS
- `UserProfileFormFields` (component): User profile form component
- `doMakeUserConfirmPassword` (boolean): Require password confirmation

#### Template

Page template component for consistent layout.

```typescript
import Template from "keycloakify/login/Template";

<Template
    kcContext={kcContext}
    i18n={i18n}
    displayMessage={displayMessage}
    showAnotherWayIfPresent={showAnotherWayIfPresent}
    headerNode={headerNode}
    formNode={formNode}
    infoNode={infoNode}
/>
```

**Props**:
- `kcContext` (KcContext): Keycloak context data
- `i18n` (object): Internationalization data
- `displayMessage` (function): Message display function
- `showAnotherWayIfPresent` (boolean): Show alternative authentication methods
- `headerNode` (ReactNode): Header content
- `formNode` (ReactNode): Form content
- `infoNode` (ReactNode): Information content

## Error Handling

### Error Types

#### Authentication Errors

```typescript
interface AuthError {
    type: "error";
    summary: string;
    formatted: string;
}
```

**Common Error Messages**:
- `"Invalid username or password"`
- `"Account is disabled"`
- `"Email not verified"`
- `"Too many failed attempts"`

#### Validation Errors

```typescript
interface ValidationError {
    type: "warning";
    summary: string;
    formatted: string;
}
```

**Common Validation Messages**:
- `"Password must be at least 8 characters"`
- `"Email format is invalid"`
- `"Username already exists"`

### Error Display

```typescript
// Display error message
if (kcContext.message?.type === "error") {
    return (
        <div className="alert alert-error">
            {kcContext.message.summary}
        </div>
    );
}

// Display warning message
if (kcContext.message?.type === "warning") {
    return (
        <div className="alert alert-warning">
            {kcContext.message.summary}
        </div>
    );
}
```

## Configuration Options

### Theme Configuration

#### Theme Properties

```typescript
interface ThemeProperties {
    themeName: "keycloakify";
    properties: Record<string, string>;
}
```

#### Environment Variables

```typescript
type KcEnvName = never; // No custom environment variables defined
```

### Build Configuration

#### Vite Plugin Configuration

```typescript
import { keycloakify } from "keycloakify/vite-plugin";

export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            // Plugin options
        })
    ]
});
```

**Available Options**:
- `themeName` (string): Custom theme name
- `extraPages` (string[]): Additional pages to include
- `keycloakifyBuildDir` (string): Custom build directory

## Security Considerations

### CSRF Protection

Keycloak automatically includes CSRF tokens in forms:

```html
<form action="{kcContext.url.loginAction}" method="post">
    <input type="hidden" name="execution" value="{execution}" />
    <!-- Form fields -->
</form>
```

### Input Validation

- **Client-side**: Keycloakify components provide basic validation
- **Server-side**: Keycloak handles all validation and sanitization
- **XSS Prevention**: React's built-in XSS protection

### Secure Headers

Keycloak sets appropriate security headers:
- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `X-XSS-Protection`

## Performance Considerations

### Bundle Optimization

- **Code Splitting**: Separate bundles for login and account themes
- **Tree Shaking**: Unused code elimination
- **Lazy Loading**: Components loaded on demand

### Caching Strategy

- **No Caching**: Fresh context data on each page load
- **Static Assets**: Vite optimizes static asset delivery
- **CDN Ready**: Built assets can be served from CDN

## Development Tools

### Storybook Integration

```typescript
// Mock context for development
import { getKcContextMock } from "keycloakify/login";

const mockContext = getKcContextMock({
    pageId: "login.ftl",
    overrides: {
        auth: {
            attemptedUsername: "testuser",
            error: "Invalid credentials"
        }
    }
});
```

### Debug Mode

```typescript
// Enable debug logging in development
if (import.meta.env.DEV) {
    console.log("Keycloak Context:", window.kcContext);
}
```

## Troubleshooting

### Common Issues

#### Context Not Available

```typescript
// Check if context is available
if (!window.kcContext) {
    return <div>No Keycloak Context Available</div>;
}
```

#### Form Submission Errors

```typescript
// Handle form submission errors
const handleSubmit = (event: FormEvent) => {
    try {
        // Form submission logic
    } catch (error) {
        console.error("Form submission failed:", error);
        // Handle error gracefully
    }
};
```

#### Internationalization Issues

```typescript
// Check if i18n is properly initialized
const { i18n } = useI18n({ kcContext });

if (!i18n) {
    return <div>Loading translations...</div>;
}
```

This API reference provides comprehensive documentation for integrating with Keycloak and using the Keycloakify framework effectively.
