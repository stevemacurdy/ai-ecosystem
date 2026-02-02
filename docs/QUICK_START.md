# Quick Start Guide

**Get from zero to productive in 30 minutes.**

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [First Run](#first-run)
4. [Your First Contribution](#your-first-contribution)
5. [Common Tasks](#common-tasks)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Docker Desktop** (includes Docker Compose)
   - Download: https://www.docker.com/products/docker-desktop
   - Why: Runs all services in containers (no local PostgreSQL/Redis needed)

2. **Git**
   - Download: https://git-scm.com/downloads
   - Why: Version control

3. **VS Code** (recommended)
   - Download: https://code.visualstudio.com/
   - Extensions: Python, Docker, GitLens, GitHub Copilot (optional)

### Access Needed

- [ ] GitHub account added to WoulfGroup organization
- [ ] Access to team Slack/Discord
- [ ] Access to Linear/Jira for task management
- [ ] API keys (will be provided by team lead)

---

## Initial Setup (15 minutes)

### Step 1: Clone Repository

```bash
# Navigate to where you want the project
cd ~/projects  # or wherever you keep code

# Clone the repository
git clone https://github.com/WoulfGroup/ai-ecosystem.git
cd ai-ecosystem
```

### Step 2: Configure Git

```bash
# Set your name and email
git config user.name "Your Name"
git config user.email "your.email@woulfgroup.com"

# Set default branch
git config init.defaultBranch main
```

### Step 3: Create Environment File

```bash
# Copy template
cp .env.example .env

# Open in your editor
code .env  # or nano .env, vim .env, etc.
```

**Fill in these required variables:**
```bash
OPENAI_API_KEY=sk-...          # Get from team lead
ODOO_URL=...                    # Get from team lead
ODOO_DB=...                     # Get from team lead
ODOO_LOGIN=...                  # Get from team lead
ODOO_API_KEY=...                # Get from team lead
```

Save and close.

### Step 4: Run Setup Script

```bash
# Make script executable
chmod +x scripts/dev-setup.sh

# Run setup (this takes 5-10 minutes on first run)
./scripts/dev-setup.sh
```

**What this does:**
- ✅ Checks prerequisites (Docker, Git)
- ✅ Builds Docker images
- ✅ Starts all services
- ✅ Waits for database
- ✅ Runs migrations
- ✅ Installs pre-commit hooks

### Step 5: Verify Installation

Open these URLs in your browser:

- **API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **Admin UI:** http://localhost:3000
- **pgAdmin:** http://localhost:5050 (login: admin@woulf.com / admin)

If all URLs work, you're ready to code! 🎉

---

## First Run (5 minutes)

### Start Services

```bash
# Start all services (run from project root)
docker compose up

# Or start in background
docker compose up -d

# View logs
docker compose logs -f
```

**You should see:**
```
ai-ecosystem-app     | INFO: Application startup complete
ai-ecosystem-db      | database system is ready to accept connections
ai-ecosystem-redis   | Ready to accept connections
ai-ecosystem-worker  | celery@worker ready
```

### Stop Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes (WARNING: deletes database)
docker compose down -v
```

### Alternative: Use Makefile

```bash
# Start
make up

# Stop
make down

# View logs
make logs

# Open shell
make shell
```

---

## Your First Contribution (10 minutes)

### Step 1: Find a Task

1. Go to Linear/GitHub Projects
2. Look for tasks tagged `good-first-issue`
3. Assign yourself to a task
4. Read the task description

Example task: `FOUND-42: Add validation to entity model`

### Step 2: Create Branch

```bash
# Get latest code
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/FOUND-42-entity-validation
```

**Branch naming:**
- `feature/TASK-ID-short-description` for new features
- `fix/TASK-ID-short-description` for bug fixes

### Step 3: Make Changes

Edit the file(s) needed for your task.

Example: `packages/core/governance/entity_model.py`

```python
class Entity:
    def __init__(self, id: str, name: str):
        if not id:
            raise ValueError("Entity ID cannot be empty")  # New validation
        self.id = id
        self.name = name
```

### Step 4: Run Tests

```bash
# Run all tests
make test

# Or manually
docker compose exec app pytest

# Run specific test file
docker compose exec app pytest tests/unit/test_entity_model.py

# Run with coverage
make test-cov
```

### Step 5: Format Code

```bash
# Auto-format with black
make format

# Check linting
make lint
```

### Step 6: Commit Changes

```bash
# Add your changes
git add packages/core/governance/entity_model.py

# Commit with conventional message
git commit -m "feat(foundation): FOUND-42 add entity ID validation"
```

**Pre-commit hooks will run automatically** and check:
- Code formatting
- Linting
- Type hints
- No secrets in code

If hooks fail, fix issues and commit again.

### Step 7: Push and Create PR

```bash
# Push to GitHub
git push origin feature/FOUND-42-entity-validation
```

Go to GitHub and you'll see a banner:
> **Compare & pull request** button

Click it and:
1. Fill in PR template (it auto-populates)
2. Link the task (`Closes #42`)
3. Request reviews from team members
4. Click "Create pull request"

### Step 8: Address Feedback

Reviewers will comment on your PR. Make requested changes:

```bash
# Make changes
# ...

# Commit
git add .
git commit -m "refactor: address PR feedback"

# Push (PR updates automatically)
git push origin feature/FOUND-42-entity-validation
```

### Step 9: Celebrate! 🎉

Once approved and merged:
- Your code is in `develop` branch
- Branch is auto-deleted
- Task is marked complete in Linear

```bash
# Switch back to develop
git checkout develop
git pull origin develop
```

---

## Common Tasks

### Running Tests

```bash
# All tests
make test

# Specific file
docker compose exec app pytest tests/unit/test_entity_model.py

# With coverage
make test-cov

# Watch mode (re-run on changes)
docker compose exec app pytest-watch
```

### Database Operations

```bash
# Open PostgreSQL shell
make db-shell

# Create migration
make migration
# (enter migration message when prompted)

# Run migrations
make migrate

# Reset database (WARNING: deletes data)
make db-reset
```

### Viewing Logs

```bash
# All services
make logs

# Specific service
docker compose logs -f app
docker compose logs -f worker
docker compose logs -f db
```

### Opening Shells

```bash
# Python shell in app container
make shell

# Python REPL with app context
make repl

# IPython (better REPL)
make ipython

# Database shell
make db-shell
```

### Code Quality

```bash
# Format code (auto-fix)
make format

# Check linting
make lint

# Type checking
docker compose exec app mypy .

# Run all quality checks
make quality
```

### Updating Dependencies

```bash
# Add new package
# 1. Add to requirements.txt
echo "new-package==1.0.0" >> requirements.txt

# 2. Install in container
make deps

# 3. Restart services
make restart
```

### Debugging

```bash
# View all service status
make status

# Check if services are healthy
docker compose ps

# Restart specific service
docker compose restart app

# Rebuild containers (if Dockerfile changed)
make build
```

---

## Troubleshooting

### Problem: Docker containers won't start

**Symptoms:**
```
Error: port 5432 already in use
Error: port 8000 already in use
```

**Solution:**
```bash
# Check what's using the port
lsof -i :5432
lsof -i :8000

# Kill the process or stop conflicting service
docker compose down
docker compose up
```

---

### Problem: Database connection errors

**Symptoms:**
```
psycopg2.OperationalError: could not connect to server
```

**Solution:**
```bash
# Check if database is running
docker compose ps db

# Check database logs
docker compose logs db

# Restart database
docker compose restart db

# Wait for database to be ready
docker compose exec db pg_isready -U postgres
```

---

### Problem: Tests failing after pulling latest code

**Solution:**
```bash
# Rebuild containers
docker compose build

# Run migrations
make migrate

# Clear test cache
find . -type d -name ".pytest_cache" -exec rm -rf {} +

# Run tests again
make test
```

---

### Problem: Pre-commit hooks failing

**Symptoms:**
```
black failed
ruff failed
```

**Solution:**
```bash
# Auto-fix formatting
make format

# Check what's wrong
make lint

# Fix issues manually, then commit again
git add .
git commit -m "fix: resolve linting issues"
```

---

### Problem: Can't access services at localhost

**Symptoms:**
- http://localhost:8000 doesn't load
- Can't connect to database

**Solution:**
```bash
# Check if Docker is running
docker info

# Check if containers are running
docker compose ps

# Check port mappings
docker compose port app 8000

# Restart services
make restart
```

---

### Problem: Running out of disk space

**Symptoms:**
```
Error: no space left on device
```

**Solution:**
```bash
# Remove unused Docker images/volumes
docker system prune -a

# Remove old containers
docker container prune

# Remove unused volumes (WARNING: may delete data)
docker volume prune
```

---

### Problem: Need to start fresh

**Nuclear option** (deletes everything):
```bash
# Stop everything
docker compose down -v

# Remove all Docker data
docker system prune -a --volumes

# Start fresh
./scripts/dev-setup.sh
```

---

## Getting Help

### Resources

- **Documentation:** `docs/` folder
- **API Docs:** http://localhost:8000/docs (auto-generated)
- **Contributing Guide:** `docs/CONTRIBUTING.md`

### Team Communication

- **Slack:** #development channel
  - Quick questions
  - Blockers
  - Daily updates

- **GitHub Issues:**
  - Bug reports
  - Feature requests
  - Technical discussions

- **Pull Requests:**
  - Code reviews
  - Architecture discussions

### Who to Ask

- **Foundation/Architecture:** @developer1
- **Integrations (Odoo, APIs):** @developer2
- **DevOps/Infrastructure:** @developer3
- **Frontend/UI:** @developer4
- **General:** @justin

---

## Next Steps

Now that you're set up:

1. ✅ Join daily standup (time announced in Slack)
2. ✅ Read [CONTRIBUTING.md](docs/CONTRIBUTING.md)
3. ✅ Read [ARCHITECTURE.md](docs/ARCHITECTURE.md)
4. ✅ Pick up your first task from Linear
5. ✅ Ask questions in Slack!

**Welcome to the team! 🚀**
