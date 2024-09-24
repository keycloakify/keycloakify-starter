import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "Single-Page",
            postBuild: async (buildContext) => {

                const fs = await import("fs");
                const path = await import("path");

                const logFilePath = path.join(buildContext.projectDirPath, "log.txt");

                fs.rmSync(logFilePath, { force: true });

                const loginDirPath = path.join("theme", buildContext.themeNames[0], "login");

                fs.rmSync(loginDirPath, { recursive: true });

                fs.cpSync(
                    path.join(buildContext.projectDirPath, "login"),
                    loginDirPath,
                    { recursive: true }
                );

            }
        })
    ]
});
