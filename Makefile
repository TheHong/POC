.PHONY: build run ai ui

build:
	docker compose build

up:
	docker compose up

ui:  # Runs the UI server outside of container
	cd ui && \
	npm run dev