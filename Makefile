.PHONY: help setup deploy rollback logs console shell restart env-check check build push

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## Initial setup of Kamal deployment
	@chmod +x bin/kamal-setup
	@bash -c 'set -a && source .env.kamal && set +a && ./bin/kamal-setup'

check: ## Run pre-deployment checks
	@chmod +x bin/check-deploy
	@bash -c 'set -a && source .env.kamal && set +a && ./bin/check-deploy'

env-check: ## Validate environment configuration
	@echo "Checking environment variables..."
	@test -f .env.kamal || (echo "❌ .env.kamal not found. Run 'make setup' first." && exit 1)
	@echo "✅ Environment file exists"
	@bash -c 'set -a && source .env.kamal && set +a && bundle exec kamal env print'

deploy: check ## Deploy application to production
	@echo "🚀 Deploying to production..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal deploy'

redeploy: ## Force redeploy without building (rollout existing image)
	@echo "🔄 Redeploying..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal redeploy'

rollback: ## Rollback to previous version (with confirmation)
	@chmod +x bin/safe-rollback
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && ./bin/safe-rollback'

logs: ## Tail application logs
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app logs -f'

logs-all: ## Show all logs (including previous deploys)
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app logs --since 24h'

console: ## Open Rails console on production
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app exec -i --reuse "bin/rails console"'

shell: ## Open bash shell in production container
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app exec -i --reuse "bash"'

dbc: ## Open database console
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app exec -i --reuse "bin/rails dbconsole"'

restart: ## Restart the application
	@echo "🔄 Restarting application..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app restart'

stop: ## Stop the application
	@echo "🛑 Stopping application..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app stop'

start: ## Start the application
	@echo "▶️  Starting application..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app start'

remove: ## Remove all containers and images
	@echo "🗑️  Removing application..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app remove'

details: ## Show deployment details
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal details'

status: ## Show container status
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app containers'

build: ## Build Docker image locally
	@echo "🏗️  Building Docker image..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal build'

push: ## Push Docker image to registry
	@echo "📤 Pushing image to registry..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal build push'

version: ## Show deployed version
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app version'

health: ## Check application health
	@echo "🏥 Checking application health..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app exec "curl -f http://localhost:80/up || exit 1"'

migrate: ## Run database migrations
	@echo "📊 Running migrations..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app exec "bin/rails db:migrate"'

ssh: ## SSH into server
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal app exec -i "bash"'

config: ## Validate Kamal configuration
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal config'

traefik-logs: ## Show Traefik logs (requires SSH access)
	@echo "📋 Traefik logs:"
	@ssh $$(grep SSH_USER .env.kamal | cut -d= -f2)@$$(grep SERVER_IP .env.kamal | cut -d= -f2) "docker logs traefik --tail 100 -f"

clean-images: ## Clean old Docker images on server
	@echo "🧹 Cleaning old images..."
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal prune all'

lock: ## Acquire deployment lock
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal lock acquire'

unlock: ## Release deployment lock
	@bash -c 'set -a && source .env.kamal && set +a && export KAMAL_REGISTRY_PASSWORD=$$GHCR_TOKEN && export RAILS_MASTER_KEY=$$(cat config/master.key) && bundle exec kamal lock release'
