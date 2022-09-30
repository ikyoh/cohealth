-include api/Makefile
-include .env
DOCKER_COMPOSE = docker-compose
DOCKER = docker


help:
	@ echo "Usage: make <target>\n"
	@ echo "Available targets:"
	@ echo "dev (for development environment)"
	@ echo "prod (for production environment)"

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
	$(DOCKER_COMPOSE) -f docker-compose.dev.yml up -d --build

docker-prod:
	@echo "\n==> Docker compose production environment ..."
	$(DOCKER) exec -it cohealth-app npm run build --force

dev : docker-dev symfony-dev
	@echo "\n==> Run development environment ..."

prod : docker-dev docker-prod
	@echo "\n==> Run development environment ..."

caddy-reload:
	@echo "\n==> Reload Caddy Server ..."
	$(DOCKER) exec -w /etc/caddy ${APP_NAME}-caddy caddy reload
	

.PHONY: help dev prod down remove stop caddy-reload

