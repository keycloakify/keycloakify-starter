.PHONY: help start-server save-server-realm

help: 
	@echo "Available commands :"
	@echo "start-server"
	@echo "save-server-realm"
	@echo "test"

start-server:
	@echo "Starting server..."
	@bash ./scripts/start-server.sh

save-server-realm:
	@echo "Saving server realm..."
	@bash ./scripts/save-server-realm.sh

URL := https://keycloak.org/app

test:
	@echo "Opening URL in Chrome..."
	@echo "User : user@example.com / Password : user"

	@if [ "$(shell uname)" = "Darwin" ]; then \
		open -a "Google Chrome" "$(URL)"; \
	else \
		xdg-open "$(URL)"; \
	fi
