import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// NOTE: This is just for the Keycloakify core contributors to be able to dynamically link
// to a local version of the keycloakify package. This is not needed for normal usage.
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    keycloakify({
      accountThemeImplementation: "none"
    })
  ]
});
