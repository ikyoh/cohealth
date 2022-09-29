-include ./.env
COMPOSER ?= composer
DOCKER_COMPOSE = docker-compose
PROJECT = "Monitoring App."
PHP_CMD = php
PHP_SERVICE = api
CMD := docker-compose exec $(PHP_SERVICE)

composer-install:
	@echo "\n==> Running composer install, runner $(RUNNER)"
	$(CMD) $(COMPOSER) install

cc:
	@echo "\n==> Clearing cache"
	rm -rf var/cache/*

clear: cc
	@echo "\n==> Cleaning project and starting up fresh"
	rm -rf vendor/* var/logs/* var/log/* bin/php* coverage/

symfony-serve:
	@echo "\n==> Symfony start dev server ..."
	docker exec ${APP_NAME}-api symfony serve -d


.PHONY: composer-install cc symfony-serve
