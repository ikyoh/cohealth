#README

# 1 - Create .env at root

# 2 - make container-up

# 3 - docker exec -it cohealth-api bash composer install

# 4 - docker exec -it cohealth-api bash composer dump-env prod







docker exec -it cohealth-api bash

docker exec -it cohealth-app npm run build --force

composer dump-env prod

docker-compose exec -w /etc/caddy caddy caddy reload


docker-compose -f docker-compose.dev.yml up -d

docker-compose down --remove-orphans

php bin/console lexik:jwt:generate-keypair