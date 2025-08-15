# Troubleshooting

This document provides solutions for common issues, debugging tips, and performance optimization guidance for the Keycloakify project.

## Common Issues

### Build and Development Issues

#### 1. TypeScript Compilation Errors

**Problem**: TypeScript compilation fails with type errors.

**Solutions**:
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
rm -rf dist

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check TypeScript configuration
npx tsc --noEmit
```

**Common Type Errors**:
```typescript
// Fix: Ensure proper type imports
import type { KcContext } from "./KcContext";
import type { ClassKey } from "keycloakify/login";

// Fix: Add proper type annotations
const classes = {} satisfies { [key in ClassKey]?: string };
```

#### 2. Vite Build Failures

**Problem**: Vite build process fails or hangs.

**Solutions**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Check for port conflicts
lsof -ti:5173 | xargs kill -9

# Restart development server
pnpm dev
```

**Common Vite Issues**:
```typescript
// Fix: Ensure proper plugin configuration
import { keycloakify } from "keycloakify/vite-plugin";

export default defineConfig({
    plugins: [react(), keycloakify({})]
});
```

#### 3. Keycloakify Build Failures

**Problem**: `pnpm build-keycloak-theme` fails.

**Solutions**:
```bash
# Ensure Maven is installed
mvn --version

# Install Maven if missing
# macOS
brew install maven

# Ubuntu/Debian
sudo apt-get install maven

# Windows
choco install maven

# Clear build artifacts
rm -rf target/
pnpm build-keycloak-theme
```

### Runtime Issues

#### 1. Keycloak Context Not Available

**Problem**: `window.kcContext` is undefined.

**Solutions**:
```typescript
// Add context check
if (!window.kcContext) {
    return <div>No Keycloak Context Available</div>;
}

// Debug context in development
if (import.meta.env.DEV) {
    console.log("Keycloak Context:", window.kcContext);
}
```

**Root Causes**:
- Theme not properly deployed to Keycloak
- Keycloak server not running
- Incorrect theme configuration

#### 2. Internationalization Not Working

**Problem**: Translation strings are not displaying correctly.

**Solutions**:
```typescript
// Check i18n initialization
const { i18n } = useI18n({ kcContext });

if (!i18n) {
    return <div>Loading translations...</div>;
}

// Verify translation keys
console.log("Available translations:", Object.keys(i18n));
```

**Common i18n Issues**:
```typescript
// Fix: Ensure proper translation structure
export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        doLogIn: "Sign In",
        doRegister: "Register",
        // ... more translations
    }
});
```

#### 3. Form Submission Errors

**Problem**: Forms fail to submit or return errors.

**Solutions**:
```typescript
// Add error handling
const handleSubmit = (event: FormEvent) => {
    try {
        // Form submission logic
    } catch (error) {
        console.error("Form submission failed:", error);
        // Handle error gracefully
    }
};

// Check form action URL
console.log("Form action:", kcContext.url.loginAction);
```

### Storybook Issues

#### 1. Storybook Not Starting

**Problem**: Storybook fails to start or displays errors.

**Solutions**:
```bash
# Clear Storybook cache
rm -rf node_modules/.cache/storybook

# Check port conflicts
lsof -ti:6006 | xargs kill -9

# Restart Storybook
pnpm storybook
```

#### 2. Mock Context Not Working

**Problem**: Storybook stories don't display properly with mock data.

**Solutions**:
```typescript
// Ensure proper mock context structure
const mockContext = getKcContextMock({
    pageId: "login.ftl",
    overrides: {
        auth: {
            attemptedUsername: "testuser",
            error: "Invalid credentials"
        }
    }
});

// Verify mock data
console.log("Mock context:", mockContext);
```

## Development Environment Setup

### Prerequisites Check

```bash
# Check Node.js version (requires 16+)
node --version

# Check pnpm version
pnpm --version

# Check Maven version (for theme building)
mvn --version

# Check Git version
git --version
```

### Environment Setup Issues

#### 1. Node.js Version Issues

**Problem**: Incompatible Node.js version.

**Solutions**:
```bash
# Use Node Version Manager (nvm)
nvm install 18
nvm use 18

# Or use pnpm to manage Node.js
pnpm env use --global 18
```

#### 2. Package Manager Issues

**Problem**: pnpm not working correctly.

**Solutions**:
```bash
# Install pnpm globally
npm install -g pnpm

# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### 3. IDE Configuration Issues

**Problem**: IDE not recognizing TypeScript or showing errors.

**Solutions**:
```bash
# Restart TypeScript language server
# VS Code: Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"

# Check TypeScript configuration
npx tsc --showConfig
```

## Performance Issues

### Bundle Size Optimization

#### 1. Large Bundle Size

**Problem**: Production bundle is too large.

**Solutions**:
```typescript
// Enable code splitting
const KcLoginThemePage = lazy(() => import("./login/KcPage"));
const KcAccountThemePage = lazy(() => import("./account/KcPage"));

// Use tree shaking
import { specificFunction } from "large-library";
// Instead of: import * from "large-library";
```

#### 2. Slow Development Builds

**Problem**: Development server is slow to start or reload.

**Solutions**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Use faster file system
# Consider using SSD for development

# Optimize Vite configuration
export default defineConfig({
    plugins: [react(), keycloakify({})],
    build: {
        target: "esnext",
        minify: "esbuild"
    }
});
```

### Runtime Performance

#### 1. Slow Component Rendering

**Problem**: Components take too long to render.

**Solutions**:
```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
    // Component logic
});

// Optimize re-renders
const memoizedValue = useMemo(() => expensiveCalculation(data), [data]);
```

#### 2. Memory Leaks

**Problem**: Application memory usage increases over time.

**Solutions**:
```typescript
// Clean up event listeners
useEffect(() => {
    const handleResize = () => { /* logic */ };
    window.addEventListener("resize", handleResize);
    
    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);

// Avoid memory leaks in async operations
useEffect(() => {
    let isMounted = true;
    
    asyncOperation().then(result => {
        if (isMounted) {
            setData(result);
        }
    });
    
    return () => {
        isMounted = false;
    };
}, []);
```

## Keycloak Integration Issues

### Theme Deployment Problems

#### 1. Theme Not Appearing in Keycloak

**Problem**: Custom theme doesn't show up in Keycloak admin console.

**Solutions**:
```bash
# Verify JAR file was created
ls -la target/*.jar

# Check JAR contents
jar -tf target/keycloakify-theme.jar

# Ensure proper theme structure
# JAR should contain: theme-resources/templates/, theme-resources/resources/
```

#### 2. Theme Not Loading

**Problem**: Theme loads but displays incorrectly or shows errors.

**Solutions**:
```bash
# Check Keycloak logs
tail -f /path/to/keycloak/logs/server.log

# Verify theme configuration in Keycloak
# Admin Console -> Realm Settings -> Themes

# Clear browser cache
# Hard refresh: Ctrl/Cmd + Shift + R
```

### Authentication Issues

#### 1. Login Form Not Working

**Problem**: Login form submits but authentication fails.

**Solutions**:
```typescript
// Check form action URL
console.log("Login action:", kcContext.url.loginAction);

// Verify form fields
<form action={kcContext.url.loginAction} method="post">
    <input name="username" value={kcContext.auth.attemptedUsername} />
    <input name="password" type="password" />
    <input type="hidden" name="execution" value="{execution}" />
</form>
```

#### 2. CSRF Token Issues

**Problem**: Forms fail with CSRF token errors.

**Solutions**:
```html
<!-- Ensure CSRF token is included -->
<form action="{kcContext.url.loginAction}" method="post">
    <input type="hidden" name="execution" value="{execution}" />
    <!-- Form fields -->
</form>
```

## Debugging Techniques

### Browser Developer Tools

#### 1. Console Debugging

```typescript
// Add debug logging
if (import.meta.env.DEV) {
    console.log("Component props:", props);
    console.log("Keycloak context:", window.kcContext);
    console.log("i18n data:", i18n);
}
```

#### 2. Network Tab Analysis

- Check form submissions in Network tab
- Verify request/response headers
- Look for 4xx/5xx errors

#### 3. React DevTools

- Inspect component props
- Monitor state changes
- Profile component performance

### Keycloak Server Debugging

#### 1. Enable Debug Logging

```bash
# Add to Keycloak startup
./bin/kc.sh start-dev --log-level=DEBUG

# Or modify standalone.xml
<logger name="org.keycloak" level="DEBUG"/>
```

#### 2. Check Theme Resources

```bash
# Verify theme files are accessible
curl http://localhost:8080/auth/realms/master/protocol/openid-connect/auth

# Check theme resource loading
# Browser DevTools -> Network tab -> Filter by "theme"
```

## Performance Optimization Tips

### Build Optimization

1. **Use production builds for testing**
2. **Enable source maps only in development**
3. **Optimize images and assets**
4. **Use CDN for static assets**

### Runtime Optimization

1. **Implement proper error boundaries**
2. **Use React.memo for expensive components**
3. **Optimize re-renders with useMemo/useCallback**
4. **Lazy load non-critical components**

### Monitoring and Profiling

1. **Use React Profiler for performance analysis**
2. **Monitor bundle size with webpack-bundle-analyzer**
3. **Track Core Web Vitals**
4. **Monitor Keycloak server performance**

## Getting Help

### Internal Resources

1. **Project Documentation**: Check `docs/` folder
2. **Code Examples**: Review existing components
3. **Configuration Files**: Examine `vite.config.ts`, `tsconfig.json`

### External Resources

1. **Keycloakify Documentation**: https://docs.keycloakify.dev/
2. **Keycloak Documentation**: https://www.keycloak.org/documentation
3. **React Documentation**: https://react.dev/
4. **TypeScript Documentation**: https://www.typescriptlang.org/docs/

### Support Channels

1. **Team Chat**: Internal team communication
2. **Issue Tracking**: Project issue tracker
3. **Code Reviews**: Peer review process
4. **Documentation Updates**: Keep docs current

This troubleshooting guide should help resolve most common issues and provide guidance for debugging and optimization.
