-include api/Makefile
DOCKER_COMPOSE = docker-compose

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

remove:
	@echo "\n==> Remove docker container(s)"
	$(DOCKER_COMPOSE) rm

docker-dev:
	@echo "\n==> Docker compose development environment ..."
	$(DOCKER_COMPOSE) -f docker-compose.dev.yml up -d --build --remove-orphans

docker-prod:
	@echo "\n==> Docker compose production environment ..."
	$(DOCKER_COMPOSE) up -d --build --remove-orphans

dev : docker-dev symfony-serve
	@echo "\n==> Run development environment ..."

prod : docker-prod
	@echo "\n==> Run development environment ..."

caddy-reload:
	@echo "\n==> Reload Caddy Server ...""
	$(DOCKER_COMPOSE) exec -w /etc/caddy caddy caddy reload
	

.PHONY: help dev prod down remove stop caddy-reload

