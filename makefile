SHELL=/bin/bash

CURRENT_UID := $(shell id -u)
CURRENT_GID := $(shell id -g)

npm-install:
	docker run -it --rm --user ${CURRENT_UID}:${CURRENT_GID} -v .:/tmp -w /tmp node:20 npm install

shell:
	docker run -it --rm --user ${CURRENT_UID}:${CURRENT_GID} -v .:/tmp -w /tmp node:20 bash

root-shell:
	docker run -it --rm -v .:/tmp -w /tmp node:20 bash

watch:
	docker compose up --watch

build-watch:
	docker compose up --watch --build

up:
	docker compose up

app-shell:
	docker compose exec -it app bash

log:
	docker compose logs app -f
