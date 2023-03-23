import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { withKeycloakify } from "keycloakify/vite";

// https://vitejs.dev/config/
export default defineConfig(
    withKeycloakify({
        plugins: [react()],
        assetsInclude: "**/*.md",
        server: {
            port: 3000
        }
    })
);
