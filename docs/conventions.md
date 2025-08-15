# Conventions

This document outlines the coding conventions, best practices, and standards used throughout the Keycloakify project.

## Code Style and Formatting

### Prettier Configuration

The project uses Prettier for consistent code formatting:

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

**Key Rules:**
- **Semicolons**: Always required
- **Quotes**: Double quotes for strings
- **Line Length**: 80 characters maximum
- **Indentation**: 4 spaces (no tabs)
- **Trailing Commas**: ES5 style

### ESLint Rules

```javascript
{
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:storybook/recommended"
    ],
    "rules": {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-redeclare": "off",
        "no-labels": "off"
    }
}
```

## Naming Conventions

### Files and Directories

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `KcPage.tsx`, `UserProfile.tsx` |
| TypeScript Files | PascalCase | `KcContext.ts`, `i18n.ts` |
| Directories | camelCase | `src/login/`, `src/account/` |
| Configuration Files | kebab-case | `vite.config.ts`, `tsconfig.json` |

### Variables and Functions

```typescript
// Variables: camelCase
const userName = "john.doe";
const isAuthenticated = true;
const authData = { user: "test" };

// Functions: camelCase
function handleLogin() { }
const validateForm = () => { };
const useI18n = () => { };

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 5000;
```

### TypeScript Types and Interfaces

```typescript
// Interfaces: PascalCase with descriptive names
interface KcContext { }
interface UserProfile { }
interface AuthData { }

// Types: PascalCase
type ThemeType = "login" | "account";
type MessageType = "success" | "error" | "warning" | "info";

// Enums: PascalCase
enum AuthStatus {
    Authenticated = "authenticated",
    Unauthenticated = "unauthenticated"
}
```

## Component Structure

### React Component Template

```typescript
import { Suspense } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";

export default function ComponentName(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {/* Component content */}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
```

### Import Order

1. **React imports**
2. **Third-party libraries**
3. **Keycloakify imports**
4. **Local imports**
5. **Type imports**

```typescript
// 1. React imports
import { Suspense, lazy } from "react";

// 2. Third-party libraries
import type { ClassKey } from "keycloakify/login";

// 3. Keycloakify imports
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";

// 4. Local imports
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";

// 5. Type imports
import type { UserData } from "./types";
```

## TypeScript Conventions

### Type Definitions

```typescript
// Use interfaces for object shapes
interface UserProfile {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

// Use types for unions and intersections
type AuthStatus = "authenticated" | "unauthenticated" | "loading";
type UserWithProfile = UserProfile & { isActive: boolean };

// Use enums sparingly, prefer union types
type MessageType = "success" | "error" | "warning" | "info";
```

### Generic Types

```typescript
// Use descriptive generic names
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

// Extend existing types
type ExtendKcContext<T, U> = BaseKcContext & T & U;
```

### Type Guards

```typescript
// Use type guards for runtime type checking
function isAuthenticatedUser(user: UserData | null): user is UserData {
    return user !== null && user.authenticated === true;
}

// Use in components
if (isAuthenticatedUser(auth.user)) {
    // TypeScript knows user is UserData here
    console.log(user.username);
}
```

## React Patterns

### Component Props

```typescript
// Use interface for props
interface KcPageProps {
    kcContext: KcContext;
    className?: string;
    children?: React.ReactNode;
}

// Destructure props at the top
export default function KcPage({ kcContext, className, children }: KcPageProps) {
    // Component logic
}
```

### Hooks Usage

```typescript
// Custom hooks: use prefix
const useI18n = (props: { kcContext: KcContext }) => {
    // Hook logic
    return { i18n, ofTypeI18n };
};

// Use hooks at the top level
export default function Component() {
    const [state, setState] = useState(initialValue);
    const { i18n } = useI18n({ kcContext });
    
    // Component logic
}
```

### Error Boundaries

```typescript
// Use Suspense for lazy loading
<Suspense fallback={<LoadingSpinner />}>
    <LazyComponent />
</Suspense>
```

## CSS and Styling

### CSS Classes

```typescript
// Use object for CSS classes
const classes = {
    container: "auth-container",
    form: "login-form",
    button: "submit-button"
} satisfies { [key in ClassKey]?: string };

// Apply classes
<div className={classes.container}>
    <form className={classes.form}>
        <button className={classes.button}>Submit</button>
    </form>
</div>
```

### Styling Patterns

- **Use Keycloakify's default CSS**: `doUseDefaultCss={true}`
- **Custom styles**: Add through CSS classes when needed
- **Responsive design**: Use CSS media queries
- **Accessibility**: Follow WCAG guidelines

## Internationalization (i18n)

### Translation Structure

```typescript
// Use createUseI18n from Keycloakify
export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        doLogIn: "Sign In",
        doRegister: "Register",
        username: "Username",
        password: "Password",
        // ... more translations
    }
});
```

### Translation Conventions

- **Use descriptive keys**: `doLogIn` instead of `login`
- **Consistent terminology**: Match Keycloak's default terms
- **Support placeholders**: Use `{0}`, `{1}` for dynamic content
- **English only**: Currently supports English language

## Error Handling

### Error Patterns

```typescript
// Check for errors in context
const { message } = kcContext;

if (message?.type === "error") {
    return <ErrorMessage message={message.summary} />;
}

// Handle validation errors
if (message?.type === "warning") {
    return <WarningMessage message={message.summary} />;
}
```

### Error Boundaries

```typescript
// Use try-catch for async operations
try {
    // Async operation
} catch (error) {
    console.error("Operation failed:", error);
    // Handle error gracefully
}
```

## Testing Conventions

### Storybook Stories

```typescript
// Story file naming: ComponentName.stories.tsx
export default {
    title: "Login/KcPage",
    component: KcPage,
    parameters: {
        layout: "fullscreen"
    }
};

// Story naming: descriptive names
export const Default = {
    args: {
        kcContext: mockContext
    }
};

export const WithError = {
    args: {
        kcContext: mockContextWithError
    }
};
```

### Mock Data

```typescript
// Use descriptive mock data
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

## Documentation Conventions

### Code Comments

```typescript
// Use JSDoc for functions and components
/**
 * Main login page component
 * @param props - Component props
 * @param props.kcContext - Keycloak context data
 * @returns React component
 */
export default function KcPage(props: { kcContext: KcContext }) {
    // Implementation
}

// Use inline comments sparingly, prefer self-documenting code
const isFormValid = username.length > 0 && password.length > 0;
```

### README Files

- **Clear structure**: Use headings and lists
- **Code examples**: Include working examples
- **Setup instructions**: Step-by-step guides
- **Troubleshooting**: Common issues and solutions

## Git Conventions

### Commit Messages

```
type(scope): description

feat(login): add password validation
fix(account): resolve session display issue
docs(readme): update installation instructions
```

### Branch Naming

- **Feature branches**: `feature/description`
- **Bug fixes**: `fix/description`
- **Hotfixes**: `hotfix/description`
- **Documentation**: `docs/description`

## Performance Best Practices

### Code Splitting

```typescript
// Use lazy loading for components
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);
```

### Memoization

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
    // Component logic
});
```

### Bundle Optimization

- **Tree shaking**: Use ES6 imports
- **Code splitting**: Separate login and account themes
- **Lazy loading**: Load components on demand

## Security Conventions

### Input Validation

- **Use Keycloakify components**: Built-in validation
- **No custom validation**: Let Keycloak handle server-side validation
- **Sanitize output**: Use React's built-in XSS protection

### Data Handling

- **No sensitive data storage**: Keycloak handles all sensitive data
- **Context validation**: TypeScript ensures data integrity
- **Secure forms**: Use Keycloak's form handling

## Accessibility (A11y)

### Standards

- **WCAG 2.1 AA**: Follow accessibility guidelines
- **Semantic HTML**: Use proper HTML elements
- **Keyboard navigation**: Ensure keyboard accessibility
- **Screen readers**: Provide proper ARIA labels

### Implementation

```typescript
// Use semantic HTML
<button type="submit" aria-label="Sign in to account">
    {i18n.doLogIn}
</button>

// Provide proper labels
<label htmlFor="username">{i18n.username}</label>
<input id="username" name="username" type="text" />
```

These conventions ensure consistency, maintainability, and quality across the Keycloakify project while following industry best practices and standards.
