import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            themeName: "bible-bowl",
            themeVersion: "0.1.0",
            accountThemeImplementation: "none"
        })
    ]
});
