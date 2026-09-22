ARG  KEYCLOAK_VERSION=26.7.4


# Build the Keycloak theme and package it into a JAR file
FROM node:20-alpine AS theme-builder

RUN apk update \
 && apk add --no-cache openjdk17 maven
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build-keycloak-theme



FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} AS builder

WORKDIR /opt/keycloak
COPY --from=theme-builder /app/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/keycloak/providers/
RUN /opt/keycloak/bin/kc.sh build

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized"]


FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} AS prod-bulilder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

WORKDIR /opt/keycloak


COPY --from=theme-builder /app/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/keycloak/providers/

# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore

RUN /opt/keycloak/bin/kc.sh build



FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION}

COPY --from=prod-bulilder /opt/keycloak/ /opt/keycloak/

# change these values to point to a running postgres instance
# Values of
# ENV KC_DB=postgres
# ENV KC_DB_URL=<DBURL>
# ENV KC_DB_USERNAME=<DBUSERNAME>
# ENV KC_DB_PASSWORD=<DBPASSWORD>
# ENV KC_HOSTNAME=localhost

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]