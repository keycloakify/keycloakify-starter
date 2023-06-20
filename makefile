.PHONY: start-server save-server-realm

start-server:
	@echo "Starting server..."
	@bash ./scripts/start-server.sh

save-server-realm:
	@echo "Saving server realm..."
	@bash ./scripts/save-server-realm.sh

URL := https://keycloak.org/app

open-url:
	@echo "Opening URL in Chrome..."
	@if [ "$(shell uname)" = "Darwin" ]; then \
		open -a "Google Chrome" "$(URL)"; \
	else \
		xdg-open "$(URL)"; \
	fi
