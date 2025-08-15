# Keycloakify - Wellcare Keycloak Theme

A modern, customizable Keycloak theme built with React and the Keycloakify framework. This project provides a beautiful and user-friendly authentication interface for Keycloak identity and access management.

## 🚀 Features

- **Modern React-based UI**: Built with React 18 and TypeScript
- **Dual Theme Support**: Login and Account management themes
- **Internationalization**: Full i18n support with English translations
- **Responsive Design**: Mobile-friendly interface
- **Type Safety**: Full TypeScript support with strict type checking
- **Development Tools**: Storybook integration for component development
- **Build Optimization**: Vite-based build system with code splitting
- **Keycloak Integration**: Seamless integration with Keycloak authentication flows

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **pnpm** (recommended package manager)
- **Maven** (for building Keycloak JAR files)
- **Git**

### Installing Prerequisites

#### Node.js and pnpm
```bash
# Install Node.js (using nvm recommended)
nvm install 18
nvm use 18

# Install pnpm
npm install -g pnpm
```

#### Maven
```bash
# macOS
brew install maven

# Ubuntu/Debian
sudo apt-get install maven

# Windows
choco install maven
# Or download from https://maven.apache.org/download.cgi
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd keycloakify
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Verify installation**
   ```bash
   pnpm build
   ```

## 🚀 Development

### Starting the Development Server

```bash
# Start Vite development server
pnpm dev
```

The development server will start on `http://localhost:5173`

### Running Storybook

```bash
# Start Storybook for component development
pnpm storybook
```

Storybook will be available at `http://localhost:6006`

### Building the Theme

```bash
# Build the React application
pnpm build

# Build Keycloak JAR files
pnpm build-keycloak-theme
```

The JAR files will be generated in the `target/` directory.

## 📁 Project Structure

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
├── .storybook/            # Storybook configuration
├── docs/                  # Project documentation
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
└── .eslintrc.cjs          # ESLint configuration
```

## 🎨 Customization

### Theme Configuration

The theme can be customized by modifying the following files:

- **`src/login/i18n.ts`**: Login theme translations
- **`src/account/i18n.ts`**: Account theme translations
- **`src/login/KcPage.tsx`**: Login theme layout and components
- **`src/account/KcPage.tsx`**: Account theme layout and components

### Styling

The theme uses Keycloakify's default CSS with the option to add custom styles:

```typescript
// In KcPage components
const classes = {
    customClass: "my-custom-style"
} satisfies { [key in ClassKey]?: string };
```

### Adding New Pages

To add new pages to the theme:

1. Update the `pageId` switch statement in the respective `KcPage.tsx`
2. Add translations to the i18n file
3. Create custom components if needed

## 🔧 Configuration

### Vite Configuration

The project uses Vite with the Keycloakify plugin:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

export default defineConfig({
    plugins: [react(), keycloakify({})]
});
```

### TypeScript Configuration

Strict TypeScript configuration is enabled:

```json
{
    "compilerOptions": {
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true
    }
}
```

## 🧪 Testing

### Development Testing

Use Storybook for isolated component testing:

```bash
pnpm storybook
```

### Manual Testing

1. Build the theme: `pnpm build-keycloak-theme`
2. Deploy JAR files to Keycloak
3. Test authentication flows in Keycloak

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[Architecture](./docs/architecture.md)**: Project structure and design patterns
- **[Dependencies](./docs/dependencies.md)**: Technology stack and dependencies
- **[Conventions](./docs/conventions.md)**: Coding standards and best practices
- **[Data Flow](./docs/data-flow.md)**: Data flow patterns and state management
- **[Entities Diagram](./docs/entities-diagram.md)**: Data models and relationships
- **[API Reference](./docs/api-reference.md)**: API documentation and integration
- **[Troubleshooting](./docs/troubleshooting.md)**: Common issues and solutions

## 🚀 Deployment

### Building for Production

```bash
# Build the theme
pnpm build-keycloak-theme

# JAR files will be generated in target/
ls target/*.jar
```

### Deploying to Keycloak

1. Copy the generated JAR files to Keycloak's `standalone/deployments/` directory
2. Restart Keycloak server
3. Configure the theme in Keycloak Admin Console:
   - Go to Realm Settings → Themes
   - Set Login Theme to "keycloakify"
   - Set Account Theme to "keycloakify"

### Keycloak Configuration

```bash
# Keycloak startup with theme
./bin/kc.sh start-dev --spi-theme-static-max-age=2592000
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Follow coding conventions**: See [conventions.md](./docs/conventions.md)
5. **Test your changes**: Use Storybook and manual testing
6. **Submit a pull request**

### Code Standards

- Follow TypeScript best practices
- Use Prettier for code formatting
- Follow ESLint rules
- Write clear commit messages
- Update documentation as needed

### Commit Message Format

```
type(scope): description

feat(login): add password validation
fix(account): resolve session display issue
docs(readme): update installation instructions
```

## 🐛 Troubleshooting

### Common Issues

- **Build failures**: Check Maven installation and clear cache
- **Context not available**: Verify Keycloak theme deployment
- **Styling issues**: Check CSS class names and Keycloakify defaults

For detailed troubleshooting, see [troubleshooting.md](./docs/troubleshooting.md).

### Getting Help

- Check the [documentation](./docs/)
- Review existing issues
- Contact the development team

## 📄 License

This project is for internal use only. No license information is provided.

## 🔗 Resources

- [Keycloakify Documentation](https://docs.keycloakify.dev/)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

## 📊 Project Status

- **Version**: 0.0.0
- **Status**: Development
- **Keycloakify Version**: 10.0.0-rc.107
- **React Version**: 18.2.0
- **TypeScript Version**: 5.2.2

---

For questions or support, please refer to the project documentation or contact the development team.
