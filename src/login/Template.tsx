import DefaultTemplate from "keycloakify/login/Template";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import ParticlesBackground from "./ParticlesBackground";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    return (
        <>
            <style>{`
              body, html {
                background: none !important;
                background-color: transparent !important;
                background-image: none !important;
              }
            `}</style>
            <ParticlesBackground />
            <DefaultTemplate {...props} />
        </>
    );
}
