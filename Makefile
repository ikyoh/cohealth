-include api/Makefile
DOCKER_COMPOSE = docker-compose
# PROJECT = "Monitoring App"
# COMPOSE_PROJECT_NAME ?= $(notdir $(shell pwd))


help:
	@ echo "Usage: make <target>\n"
	@ echo "Available targets:\n"
	@ cat Makefile api/Makefile | grep -oE "^[^: ]+:" | grep -oE "[^:]+" | grep -Ev "help|default|.PHONY"

stop:
	@echo "\n==> Stop docker container"
	$(DOCKER_COMPOSE) stop

down:
	@echo "\n==> Remove docker container"
	$(DOCKER_COMPOSE) down

container-remove:
	@echo "\n==> Remove docker container(s)"
	$(DOCKER_COMPOSE) rm

up:
	@echo "\n==> Docker container building and starting ..."
	$(DOCKER_COMPOSE) up --build -d

container-str: container-stop container-down container-remove

caddy-reload:
	@echo "\n==> Reload Caddy Server ..."
	$(DOCKER_COMPOSE) exec -w /etc/caddy caddy caddy reload
	
# all: clear up composer-install lint-composer lint-php lint-json lint-yaml lint-eol phpcs

# .PHONY: help all container-down container-remove container-stop up
.PHONY: help down container-remove stop up caddy-reload
