-include api/Makefile
DOCKER_COMPOSE = docker-compose
# PROJECT = "Monitoring App"
# COMPOSE_PROJECT_NAME ?= $(notdir $(shell pwd))


help:
	@ echo "Usage: make <target>\n"
	@ echo "Available targets:\n"
	@ cat Makefile api/Makefile | grep -oE "^[^: ]+:" | grep -oE "[^:]+" | grep -Ev "help|default|.PHONY"

container-stop:
	@echo "\n==> Stop docker container"
	$(DOCKER_COMPOSE) stop

container-down:
	@echo "\n==> Remove docker container"
	$(DOCKER_COMPOSE) down

container-remove:
	@echo "\n==> Remove docker container(s)"
	$(DOCKER_COMPOSE) rm

container-up:
	@echo "\n==> Docker container building and starting ..."
	$(DOCKER_COMPOSE) up --build -d

container-str: container-stop container-down container-remove

caddy-reload:
	@echo "\n==> Reload Caddy Server ..."
	$(DOCKER_COMPOSE) exec -w /etc/caddy caddy caddy reload
	
# all: clear container-up composer-install lint-composer lint-php lint-json lint-yaml lint-eol phpcs

# .PHONY: help all container-down container-remove container-stop container-up
.PHONY: help container-down container-remove container-stop container-up caddy-reload
