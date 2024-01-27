
import { kcContext as kcLoginThemeContext } from "./keycloak-theme/login/kcContext";
import { kcContext as kcAccountThemeContext } from "./keycloak-theme/login/kcContext";

/**
 * If you need to use import.meta.env.BASE_URL, use this variable instead.  
 * If you can, import your assets using the import statement.
 * 
 * See: https://docs.keycloakify.dev/importing-assets#importing-custom-assets-that-arent-fonts
 */
export const BASE_URL = (()=>{

    const kcContext = (()=>{

        if( kcLoginThemeContext !== undefined ){
            return kcLoginThemeContext;
        }
        
        if( kcAccountThemeContext !== undefined ){
            return kcLoginThemeContext
        }

        return undefined;

    })();

    return (kcContext === undefined || import.meta.env.MODE === 'development')
        ? import.meta.env.BASE_URL
        : `${kcContext.url.resourcesPath}/build`;

})();