# Dependencies

This document provides a comprehensive analysis of the project's dependencies, build tools, and configuration files.

## Technology Stack Overview

The Keycloakify project uses a modern React-based technology stack with TypeScript, Vite, and the Keycloakify framework.

## Core Dependencies

### Production Dependencies

| Package | Version | Purpose | Upgrade Considerations |
|---------|---------|---------|----------------------|
| `keycloakify` | `10.0.0-rc.107` | Core framework for building Keycloak themes | Check for stable releases, breaking changes in RC versions |
| `react` | `^18.2.0` | UI library for building components | Major version updates may require migration |
| `react-dom` | `^18.2.0` | React DOM rendering | Must match React version |

### Development Dependencies

| Package | Version | Purpose | Upgrade Considerations |
|---------|---------|---------|----------------------|
| `@types/react` | `^18.2.43` | TypeScript definitions for React | Keep in sync with React version |
| `@types/react-dom` | `^18.2.17` | TypeScript definitions for React DOM | Keep in sync with React DOM version |
| `typescript` | `^5.2.2` | TypeScript compiler | Major updates may introduce breaking changes |
| `vite` | `^5.0.8` | Build tool and dev server | Check for breaking changes in major updates |
| `@vitejs/plugin-react` | `^4.2.1` | Vite plugin for React support | Keep in sync with Vite version |

### Storybook Dependencies

| Package | Version | Purpose | Upgrade Considerations |
|---------|---------|---------|----------------------|
| `storybook` | `^8.1.10` | Component development environment | Major updates may require configuration changes |
| `@storybook/react` | `^8.1.10` | React support for Storybook | Keep in sync with Storybook version |
| `@storybook/react-vite` | `^8.1.10` | Vite integration for Storybook | Keep in sync with Storybook and Vite versions |

### Code Quality Dependencies

| Package | Version | Purpose | Upgrade Considerations |
|---------|---------|---------|----------------------|
| `eslint` | `^8.55.0` | JavaScript/TypeScript linting | Major updates may require rule updates |
| `@typescript-eslint/eslint-plugin` | `^6.14.0` | TypeScript-specific ESLint rules | Keep in sync with TypeScript version |
| `@typescript-eslint/parser` | `^6.14.0` | TypeScript parser for ESLint | Keep in sync with TypeScript version |
| `eslint-plugin-react-hooks` | `^4.6.0` | React Hooks linting rules | Keep in sync with React version |
| `eslint-plugin-react-refresh` | `^0.4.5` | React Refresh linting rules | Keep in sync with React version |
| `eslint-plugin-storybook` | `^0.8.0` | Storybook-specific linting rules | Keep in sync with Storybook version |
| `prettier` | `3.3.1` | Code formatting | Major updates may change formatting rules |

## Configuration Files Analysis

### Package.json

```json
{
    "name": "keycloakify",
    "version": "0.0.0",
    "description": "Wellcare Keycloak Theme",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "build-keycloak-theme": "npm run build && keycloakify build",
        "storybook": "storybook dev -p 6006",
        "format": "prettier . --write"
    }
}
```

**Key Features:**
- Uses ES modules (`"type": "module"`)
- Comprehensive build scripts for development and production
- Storybook integration for component development
- Prettier integration for code formatting

### Vite Configuration (vite.config.ts)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

export default defineConfig({
    plugins: [react(), keycloakify({})]
});
```

**Configuration Details:**
- React plugin for JSX support
- Keycloakify plugin for theme generation
- Minimal configuration leveraging defaults

### TypeScript Configuration (tsconfig.json)

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
    }
}
```

**Key Features:**
- Modern ES2020 target
- Strict TypeScript configuration
- React JSX support
- Bundler-optimized module resolution
- Comprehensive linting rules

### ESLint Configuration (.eslintrc.cjs)

```javascript
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:storybook/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-redeclare": "off",
        "no-labels": "off"
    }
}
```

**Key Features:**
- TypeScript-aware linting
- React Hooks rules
- Storybook integration
- Custom rule overrides for development

### Prettier Configuration (.prettierrc.json)

```json
{
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": false,
    "printWidth": 80,
    "tabWidth": 4,
    "useTabs": false
}
```

**Key Features:**
- Consistent code formatting
- 4-space indentation
- 80-character line width
- ES5 trailing comma support

## Build System

### Development Workflow

1. **Development Server**: `pnpm dev`
   - Uses Vite for fast hot module replacement
   - Serves on default Vite port (5173)

2. **Production Build**: `pnpm build`
   - TypeScript compilation
   - Vite production build
   - Optimized bundle generation

3. **Theme Build**: `pnpm build-keycloak-theme`
   - Builds React application
   - Generates Keycloak JAR files
   - Requires Maven for JAR generation

### Storybook Integration

- **Port**: 6006 (configurable)
- **Purpose**: Component development and testing
- **Features**: Isolated component rendering with mock data

## Dependency Management

### Package Manager

- **pnpm**: Used for dependency management
- **Lock File**: `pnpm-lock.yaml` for reproducible builds
- **Benefits**: Faster installs, disk space efficiency

### Version Management

- **React**: Uses caret ranges (`^18.2.0`) for minor updates
- **Keycloakify**: Specific RC version for stability
- **Dev Dependencies**: Caret ranges for flexibility

## Security Considerations

### Dependency Security

- **Regular Updates**: Keep dependencies updated for security patches
- **Audit**: Run `pnpm audit` regularly
- **Keycloakify**: RC version should be updated to stable when available

### Build Security

- **TypeScript**: Strict mode prevents common security issues
- **ESLint**: Security-focused rules enabled
- **No External Scripts**: Minimal attack surface

## Performance Considerations

### Bundle Optimization

- **Vite**: Fast builds and optimized bundles
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Lazy loading for better performance

### Development Performance

- **Hot Module Replacement**: Fast development feedback
- **TypeScript**: Incremental compilation
- **ESLint**: Fast linting with caching

## Upgrade Strategy

### Major Version Upgrades

1. **React 18**: Already using, stable
2. **Keycloakify**: Monitor for stable release
3. **TypeScript**: Test thoroughly before upgrading
4. **Vite**: Check migration guides for major updates

### Regular Maintenance

1. **Monthly**: Update minor versions
2. **Quarterly**: Review major version upgrades
3. **Security**: Immediate updates for security patches

## Troubleshooting Dependencies

### Common Issues

1. **Version Conflicts**: Check `pnpm-lock.yaml` for conflicts
2. **TypeScript Errors**: Ensure all type packages match
3. **Build Failures**: Clear node_modules and reinstall
4. **Storybook Issues**: Check plugin compatibility

### Resolution Commands

```bash
# Clear and reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Update dependencies
pnpm update

# Check for security issues
pnpm audit

# Fix security issues
pnpm audit --fix
```

This dependency structure provides a modern, maintainable foundation for the Keycloakify theme project while ensuring security, performance, and developer experience.
