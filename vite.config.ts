import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// NOTE: This is just for the Keycloakify core contributors to be able to dynamically link
// to a local version of the keycloakify package. This is not needed for normal usage.
import commonjs from "vite-plugin-commonjs";
import { keycloakify } from "keycloakify/vite-plugin";
import vike from 'vike/plugin'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    commonjs(), 
    vike({ prerender: true }),
    keycloakify({
      // See: https://docs.keycloakify.dev/build-options#themename
      themeName: "keycloakify-starter",
      // See: https://docs.keycloakify.dev/environnement-variables
      extraThemeProperties: [
        "MY_ENV_VARIABLE=${env.MY_ENV_VARIABLE:}"
      ],
      // This is a hook that will be called after the build is done
      // but before the jar is created.  
      // You can use it to add/remove/edit your theme files.  
      postBuild: async keycloakifyBuildOptions => {

      }
    })
  ],
  /* 
   * Uncomment this if you want to use the default domain provided by GitHub Pages
   * replace "keycloakify-starter" with your repository name.  
   * This is only relevent if you are building an Wep App + A Keycloak theme.
   * If you are only building a Keycloak theme, you can ignore this.  
   */
  //base: "/keycloakify-starter/"
  build: {
    sourcemap: true
  }
})
