# Use Keycloak Container
FROM quay.io/keycloak/keycloak:26.0.7 as builder

# Install custom theme
ADD --chown=keycloak:keycloak https://github.com/ALMiG-Kompressoren-GmbH/tailcloakify/releases/download/v1.1.1/keycloak-theme-for-kc-22-to-25.jar /opt/keycloak/providers/keycloak-theme-for-kc-22-to-25.jar

FROM quay.io/keycloak/keycloak:26.0.7

COPY --from=builder /opt/keycloak /opt/keycloak
WORKDIR /opt/keycloak

ENV KC_HOSTNAME_STRICT=false
ENV KC_HTTPS_PORT=8443
ENV KC_HTTPS_PROTOCOLS=TLSv1.3,TLSv1.2
ENV KC_HTTP_ENABLED=true
ENV KC_HTTP_PORT=8080
ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin
ENV KC_BOOTSTRAP_ADMIN_PASSWORD=admin
ENV TAILCLOAKIFY_ADDITIONAL_SCRIPTS="Cookie Script Here"
ENV TAILCLOAKIFY_BACKGROUND_LOGO_URL=""
ENV TAILCLOAKIFY_BACKGROUND_VIDEO_URL=""
ENV TAILCLOAKIFY_FOOTER_IMPRINT_URL="Impressum URL Here"
ENV TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL="Data Protection URL Here"
ENV TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT="true"

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start"]

