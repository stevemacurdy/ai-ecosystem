.PHONY: help setup up down restart logs shell test lint format clean migration migrate

# Default target
help:
	@echo "AI Ecosystem - Development Commands"
	@echo ""
	@echo "Setup & Environment:"
	@echo "  make setup       - Initial setup for new developers"
	@echo "  make up          - Start all services"
	@echo "  make down        - Stop all services"
	@echo "  make restart     - Restart all services"
	@echo ""
	@echo "Development:"
	@echo "  make logs        - View all logs (follow mode)"
	@echo "  make shell       - Open bash shell in app container"
	@echo "  make db-shell    - Open PostgreSQL shell"
	@echo ""
	@echo "Testing & Quality:"
	@echo "  make test        - Run all tests"
	@echo "  make test-cov    - Run tests with coverage report"
	@echo "  make lint        - Run linters (black, pylint, mypy)"
	@echo "  make format      - Format code with black"
	@echo ""
	@echo "Database:"
	@echo "  make migration   - Create new migration"
	@echo "  make migrate     - Run pending migrations"
	@echo "  make db-reset    - Reset database (WARNING: deletes all data)"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean       - Remove temporary files"
	@echo "  make clean-all   - Remove everything (including volumes)"

# Initial setup
setup:
	@echo "Running initial setup..."
	@chmod +x scripts/dev-setup.sh
	@./scripts/dev-setup.sh

# Start services
up:
	docker compose up -d
	@echo "✅ Services started"
	@echo "📡 API:      http://localhost:8000"
	@echo "🎨 UI:       http://localhost:3000"
	@echo "🗄️  pgAdmin:  http://localhost:5050"

# Stop services
down:
	docker compose down
	@echo "✅ Services stopped"

# Restart services
restart:
	docker compose restart
	@echo "✅ Services restarted"

# View logs
logs:
	docker compose logs -f

# Open shell in app container
shell:
	docker compose exec app bash

# Open PostgreSQL shell
db-shell:
	docker compose exec db psql -U postgres -d ai_ecosystem_dev

# Run all tests
test:
	docker compose exec app pytest -v

# Run tests with coverage
test-cov:
	docker compose exec app pytest --cov=. --cov-report=html --cov-report=term
	@echo "📊 Coverage report: htmlcov/index.html"

# Run specific test file
test-file:
	@read -p "Enter test file path: " file; \
	docker compose exec app pytest $$file -v

# Run linters
lint:
	@echo "Running black..."
	docker compose exec app black --check .
	@echo "Running pylint..."
	docker compose exec app pylint packages/ apps/ agents/
	@echo "Running mypy..."
	docker compose exec app mypy packages/ apps/ agents/

# Format code
format:
	docker compose exec app black .
	@echo "✅ Code formatted"

# Create new migration
migration:
	@read -p "Enter migration message: " msg; \
	docker compose exec app alembic revision --autogenerate -m "$$msg"

# Run migrations
migrate:
	docker compose exec app alembic upgrade head
	@echo "✅ Migrations applied"

# Reset database (WARNING: deletes all data)
db-reset:
	@echo "⚠️  WARNING: This will delete all data in the database!"
	@read -p "Are you sure? (type 'yes' to confirm): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		docker compose down -v; \
		docker compose up -d db redis; \
		sleep 5; \
		docker compose up -d; \
		sleep 5; \
		docker compose exec app alembic upgrade head; \
		echo "✅ Database reset complete"; \
	else \
		echo "❌ Cancelled"; \
	fi

# Install/update dependencies
deps:
	docker compose exec app pip install -r requirements.txt
	@echo "✅ Dependencies updated"

# Clean temporary files
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.log" -delete
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".mypy_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".ruff_cache" -exec rm -rf {} + 2>/dev/null || true
	rm -rf htmlcov/ .coverage 2>/dev/null || true
	@echo "✅ Temporary files cleaned"

# Clean everything including Docker volumes
clean-all: clean
	@echo "⚠️  WARNING: This will delete all Docker volumes and data!"
	@read -p "Are you sure? (type 'yes' to confirm): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		docker compose down -v; \
		echo "✅ Everything cleaned"; \
	else \
		echo "❌ Cancelled"; \
	fi

# Check service status
status:
	docker compose ps

# View app logs only
logs-app:
	docker compose logs -f app

# View worker logs only
logs-worker:
	docker compose logs -f worker

# View database logs only
logs-db:
	docker compose logs -f db

# Build/rebuild containers
build:
	docker compose build
	@echo "✅ Containers built"

# Pull latest code and restart
update:
	git pull origin develop
	docker compose down
	docker compose build
	docker compose up -d
	docker compose exec app alembic upgrade head
	@echo "✅ Updated to latest code"

# Open Python REPL with app context
repl:
	docker compose exec app python

# Open IPython REPL
ipython:
	docker compose exec app ipython

# Backup database
backup-db:
	@mkdir -p backups
	@docker compose exec -T db pg_dump -U postgres ai_ecosystem_dev > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "✅ Database backed up to backups/"

# Restore database from backup
restore-db:
	@echo "Available backups:"
	@ls -1 backups/*.sql 2>/dev/null || echo "No backups found"
	@read -p "Enter backup filename: " file; \
	if [ -f "backups/$$file" ]; then \
		docker compose exec -T db psql -U postgres ai_ecosystem_dev < backups/$$file; \
		echo "✅ Database restored"; \
	else \
		echo "❌ Backup file not found"; \
	fi

# Seed database with test data
seed:
	docker compose exec app python scripts/seed_database.py
	@echo "✅ Database seeded with test data"

# Check code quality
quality: format lint test
	@echo "✅ All quality checks passed"

# Generate API documentation
docs:
	@echo "📚 API documentation available at: http://localhost:8000/docs"
	@echo "📚 ReDoc documentation at: http://localhost:8000/redoc"
