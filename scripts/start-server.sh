#!/usr/bin/env bash

#VERSION="20.0.1"
VERSION="21.1.1"
ADMIN_USER="admin"
echo $PWD

docker rm keycloak-testing-container || true

docker run \
   -p 8080:8080 \
   --name keycloak-testing-container \
   -e KEYCLOAK_ADMIN=$ADMIN_USER \
   -e KEYCLOAK_ADMIN_PASSWORD=$ADMIN_USER \
   -e JAVA_OPTS=-Dkeycloak.profile=preview \
   -v $PWD/build_keycloak/src/main/resources/theme/b2pconnect:/opt/keycloak/themes/b2pconnect:rw \
   -v $PWD/realm:/opt/keycloak/data/import:rw \
   -it quay.io/keycloak/keycloak:$VERSION \
   start-dev --import-realm



