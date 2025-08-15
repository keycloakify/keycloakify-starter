# Entities Diagram

This document provides a visual representation of the data entities and their relationships in the Keycloakify project.

## Overview

The Keycloakify project primarily deals with authentication and user management data structures provided by Keycloak. The main entities are defined through TypeScript interfaces and Keycloakify's type system.

## Core Data Models

### 1. KcContext (Keycloak Context)

The central data structure that contains all authentication and user information.

```mermaid
classDiagram
    class KcContext {
        +themeType: "login" | "account"
        +pageId: string
        +realm: string
        +auth: AuthData
        +url: URLData
        +message: MessageData
        +properties: Record~string, string~
        +themeName: ThemeName
    }

    class AuthData {
        +attemptedUsername: string
        +user: UserData
        +authenticated: boolean
        +error: string
        +successMessage: string
    }

    class UserData {
        +id: string
        +username: string
        +email: string
        +firstName: string
        +lastName: string
        +emailVerified: boolean
        +enabled: boolean
        +attributes: Record~string, string[]~
    }

    class URLData {
        +loginAction: string
        +loginUrl: string
        +loginRestartUrl: string
        +loginUrl: string
        +registrationUrl: string
        +resetCredentialsUrl: string
        +oauth2DeviceAuthorizationUrl: string
        +oauth2DeviceVerificationUrl: string
    }

    class MessageData {
        +type: "success" | "warning" | "error" | "info"
        +summary: string
        +formatted: string
    }

    KcContext --> AuthData
    KcContext --> URLData
    KcContext --> MessageData
    AuthData --> UserData
```

### 2. Theme Configuration

```mermaid
classDiagram
    class ThemeName {
        +value: "keycloakify"
    }

    class KcEnvName {
        +value: never
    }

    class KcContextExtension {
        +themeName: ThemeName
        +properties: Record~KcEnvName, string~
    }

    class KcContextExtensionPerPage {
        +empty: {}
    }

    KcContextExtension --> ThemeName
    KcContextExtension --> KcEnvName
```

### 3. Internationalization (i18n) Structure

```mermaid
classDiagram
    class I18nData {
        +en: TranslationStrings
    }

    class TranslationStrings {
        +doLogIn: string
        +doRegister: string
        +doCancel: string
        +doSubmit: string
        +doBack: string
        +doYes: string
        +doNo: string
        +doContinue: string
        +doForgotPassword: string
        +username: string
        +password: string
        +email: string
        +firstName: string
        +lastName: string
        +[additional strings]: string
    }

    I18nData --> TranslationStrings
```

## Page-Specific Data Models

### Login Theme Pages

```mermaid
classDiagram
    class LoginPageData {
        +pageId: string
        +formData: FormData
        +validationErrors: ValidationError[]
        +socialProviders: SocialProvider[]
    }

    class FormData {
        +username: string
        +password: string
        +rememberMe: boolean
        +captcha: string
    }

    class ValidationError {
        +field: string
        +message: string
    }

    class SocialProvider {
        +alias: string
        +displayName: string
        +loginUrl: string
    }

    LoginPageData --> FormData
    LoginPageData --> ValidationError
    LoginPageData --> SocialProvider
```

### Account Theme Pages

```mermaid
classDiagram
    class AccountPageData {
        +pageId: string
        +userProfile: UserProfile
        +sessions: Session[]
        +applications: Application[]
        +linkedAccounts: LinkedAccount[]
    }

    class UserProfile {
        +username: string
        +email: string
        +firstName: string
        +lastName: string
        +attributes: UserAttribute[]
    }

    class UserAttribute {
        +name: string
        +value: string
        +required: boolean
        +readOnly: boolean
        +annotations: Record~string, string~
    }

    class Session {
        +id: string
        +ipAddress: string
        +started: number
        +lastAccess: number
        +browser: string
        +os: string
    }

    class Application {
        +clientId: string
        +clientName: string
        +description: string
        +consentRequired: boolean
        +inUse: boolean
    }

    class LinkedAccount {
        +providerId: string
        +providerAlias: string
        +displayName: string
        +linked: boolean
    }

    AccountPageData --> UserProfile
    AccountPageData --> Session
    AccountPageData --> Application
    AccountPageData --> LinkedAccount
    UserProfile --> UserAttribute
```

## Data Flow Relationships

```mermaid
flowchart TD
    A[Keycloak Server] -->|Injects| B[window.kcContext]
    B --> C[KcContext Interface]
    C --> D[Login Theme]
    C --> E[Account Theme]
    
    D --> F[Login Pages]
    E --> G[Account Pages]
    
    F --> H[Form Data]
    F --> I[Validation]
    F --> J[Social Login]
    
    G --> K[User Profile]
    G --> L[Sessions]
    G --> M[Applications]
    
    H --> N[Keycloak Backend]
    I --> N
    J --> N
    K --> N
    L --> N
    M --> N
```

## File Mappings

### TypeScript Interface Files

| Entity | File Location | Description |
|--------|---------------|-------------|
| `KcContext` | `src/login/KcContext.ts` | Login theme context interface |
| `KcContext` | `src/account/KcContext.ts` | Account theme context interface |
| `ThemeName` | `src/kc.gen.ts` | Auto-generated theme names |
| `KcEnvName` | `src/kc.gen.ts` | Auto-generated environment names |

### Data Structure Files

| Data Type | File Location | Description |
|-----------|---------------|-------------|
| Login i18n | `src/login/i18n.ts` | Login theme translations |
| Account i18n | `src/account/i18n.ts` | Account theme translations |
| Global types | `src/kc.gen.ts` | Auto-generated Keycloakify types |

## Key Relationships

### 1. Context Inheritance

```typescript
// Base Keycloakify context
ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>

// Custom extensions
KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
}
```

### 2. Theme Type Mapping

```typescript
// Theme type determines which components to render
switch (window.kcContext?.themeType) {
    case "login":   // → Login theme components
    case "account": // → Account theme components
}
```

### 3. Page Routing

```typescript
// Page ID determines specific page component
switch (kcContext.pageId) {
    case "login.ftl":        // → Login form
    case "register.ftl":     // → Registration form
    case "info.ftl":         // → Information page
    case "error.ftl":        // → Error page
    // ... other pages
}
```

## Data Validation

### Form Validation

- **Client-side**: React form validation using Keycloakify components
- **Server-side**: Keycloak handles all authentication validation
- **Error Handling**: Validation errors are passed through `kcContext.message`

### Type Safety

- **TypeScript**: Full type safety for all data structures
- **Interface Contracts**: Clear contracts between components
- **Auto-generation**: Keycloakify generates type definitions automatically

## State Management

The project uses a simple state management approach:

1. **Global State**: `window.kcContext` (injected by Keycloak)
2. **Component State**: React's `useState` for local component state
3. **Form State**: Managed by Keycloakify's form components
4. **No External State**: No Redux, Zustand, or other state management libraries

This design ensures simplicity and leverages Keycloak's built-in state management capabilities.
