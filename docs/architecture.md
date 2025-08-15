# Architecture

This document describes the overall architecture of the Keycloakify project, including folder structure, design patterns, and component organization.

## Project Overview

Keycloakify is a React-based custom theme for Keycloak identity and access management. It uses the Keycloakify framework to create a modern, customizable authentication interface that can be deployed as a JAR file to Keycloak instances.

## Folder Structure

```
keycloakify/
├── src/                    # Source code
│   ├── login/             # Login theme components
│   │   ├── KcContext.ts   # TypeScript context definitions
│   │   ├── KcPage.tsx     # Main login page component
│   │   ├── KcPageStory.tsx # Storybook story for login
│   │   └── i18n.ts        # Internationalization for login
│   ├── account/           # Account management theme components
│   │   ├── KcContext.ts   # TypeScript context definitions
│   │   ├── KcPage.tsx     # Main account page component
│   │   ├── KcPageStory.tsx # Storybook story for account
│   │   └── i18n.ts        # Internationalization for account
│   ├── main.tsx           # Application entry point
│   ├── kc.gen.ts          # Auto-generated Keycloakify types
│   └── vite-env.d.ts      # Vite environment types
├── public/                # Static assets
│   └── favicon-32x32.png  # Favicon
├── .storybook/            # Storybook configuration
├── docs/                  # Project documentation
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.cjs          # ESLint configuration
└── .prettierrc.json       # Prettier configuration
```

## Architecture Patterns

### 1. Theme-Based Architecture

The project follows a theme-based architecture with two main themes:

- **Login Theme** (`src/login/`): Handles authentication flows (login, register, password reset, etc.)
- **Account Theme** (`src/account/`): Handles account management (profile editing, password changes, sessions, etc.)

### 2. Component Organization

Each theme follows a consistent structure:

```
theme/
├── KcContext.ts      # TypeScript type definitions for Keycloak context
├── KcPage.tsx        # Main page component that handles routing
├── KcPageStory.tsx   # Storybook story for development/testing
└── i18n.ts          # Internationalization strings and functions
```

### 3. Entry Point Pattern

The application uses a single entry point (`src/main.tsx`) that:

1. Determines the current theme type from `window.kcContext`
2. Renders the appropriate theme component (login or account)
3. Provides fallback for missing context

```typescript
switch (window.kcContext?.themeType) {
    case "login":
        return <KcLoginThemePage kcContext={window.kcContext} />;
    case "account":
        return <KcAccountThemePage kcContext={window.kcContext} />;
}
```

### 4. Lazy Loading

Components use React's lazy loading for better performance:

```typescript
const KcLoginThemePage = lazy(() => import("./login/KcPage"));
const KcAccountThemePage = lazy(() => import("./account/KcPage"));
```

## Key Components

### KcPage Components

Both `src/login/KcPage.tsx` and `src/account/KcPage.tsx` serve as the main entry points for their respective themes. They:

- Receive Keycloak context as props
- Handle internationalization
- Route to appropriate page components based on `pageId`
- Use default Keycloakify templates and components

### Context System

The project uses TypeScript interfaces to define the Keycloak context structure:

- `KcContext`: Main context interface extending Keycloakify's base context
- `KcContextExtension`: Custom properties and theme configuration
- `KcContextExtensionPerPage`: Page-specific context extensions

### Internationalization

Each theme has its own i18n file that:

- Uses Keycloakify's `createUseI18n` function
- Provides English translations for all UI strings
- Supports dynamic content with placeholders
- Maintains consistency with Keycloak's default terminology

## Build System

### Vite Configuration

The project uses Vite as the build tool with:

- React plugin for JSX support
- Keycloakify plugin for theme generation
- TypeScript support
- Hot module replacement for development

### Build Process

1. **Development**: `pnpm dev` - Starts Vite dev server with hot reload
2. **Production Build**: `pnpm build` - Compiles TypeScript and builds with Vite
3. **Theme Build**: `pnpm build-keycloak-theme` - Generates Keycloak JAR files

## Integration Points

### Keycloak Integration

- **Context Injection**: Keycloak injects `window.kcContext` with authentication data
- **Template System**: Uses Keycloakify's default templates for consistency
- **Form Handling**: Leverages Keycloakify's form components for validation
- **Routing**: Keycloak handles page routing based on authentication flow

### Storybook Integration

- **Development Testing**: Storybook provides isolated component testing
- **Mock Context**: `KcPageStory.tsx` files provide mock Keycloak context
- **Visual Development**: Enables visual development without Keycloak server

## Design Principles

1. **Simplicity**: Minimal custom code, leveraging Keycloakify defaults
2. **Consistency**: Following Keycloak's design patterns and terminology
3. **Maintainability**: Clear separation of concerns and modular structure
4. **Extensibility**: Easy to customize and extend for specific requirements
5. **Type Safety**: Full TypeScript support with strict type checking

## Module Dependencies

```
main.tsx
├── login/KcPage.tsx
│   ├── login/KcContext.ts
│   ├── login/i18n.ts
│   └── keycloakify/login/* (external)
└── account/KcPage.tsx
    ├── account/KcContext.ts
    ├── account/i18n.ts
    └── keycloakify/account/* (external)
```

This architecture ensures clean separation between themes while maintaining consistency and leveraging the power of the Keycloakify framework.
