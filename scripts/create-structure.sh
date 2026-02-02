#!/bin/bash
# Create initial repository directory structure

echo "Creating AI Ecosystem directory structure..."

# Root directories
mkdir -p packages/{core,integrations,utils}
mkdir -p agents/{finance,sellpronto,str,web_builder,marketing,sales,creator}
mkdir -p apps/{api,worker,admin}
mkdir -p tests/{unit,integration,e2e}
mkdir -p docs
mkdir -p scripts
mkdir -p infrastructure/{docker,kubernetes,terraform}
mkdir -p .github/{workflows,ISSUE_TEMPLATE}

# Core packages
mkdir -p packages/core/{governance,models,knowledge,database,queue}
mkdir -p packages/integrations/{odoo,gmail,drive,stripe,marketplace,analytics}
mkdir -p packages/utils/{logging,validation,formatting}

# Agents
mkdir -p agents/finance/{models,services,repositories,schemas}
mkdir -p agents/sellpronto/{models,services,repositories,schemas,connectors}
mkdir -p agents/str/{models,services,repositories,schemas}
mkdir -p agents/web_builder/{models,services,repositories,schemas}
mkdir -p agents/marketing/{models,services,repositories,schemas}
mkdir -p agents/sales/{models,services,repositories,schemas}
mkdir -p agents/creator/{models,services,repositories,schemas}

# Apps
mkdir -p apps/api/{routers,middleware,dependencies}
mkdir -p apps/worker/{tasks,schedules}
mkdir -p apps/admin/{components,pages,styles,lib}

# Infrastructure
mkdir -p infrastructure/docker
mkdir -p infrastructure/kubernetes/{base,overlays}
mkdir -p infrastructure/terraform/{modules,environments}

# Create __init__.py files for Python packages
find packages agents apps -type d -exec touch {}/__init__.py \;

echo "✅ Directory structure created"

# Create placeholder files
echo "Creating placeholder README files..."

cat > packages/README.md << 'EOF'
# Packages

Shared libraries used across all agents.

## Structure

- `core/` - Foundation layers (governance, knowledge, models)
- `integrations/` - External service connectors
- `utils/` - Shared utilities
EOF

cat > agents/README.md << 'EOF'
# Agents

Specialized AI agents built on the foundation.

## Available Agents

- `finance/` - Finance & CFO agent
- `sellpronto/` - Multi-marketplace selling agent
- `str/` - Short-term rental management agent
- `web_builder/` - Web page generation agent
- `marketing/` - Marketing automation agent
- `sales/` - Sales CRM & assistance agent
- `creator/` - Meta-agent for creating new agents
EOF

cat > apps/README.md << 'EOF'
# Applications

User-facing applications and services.

## Structure

- `api/` - FastAPI backend
- `worker/` - Celery async workers
- `admin/` - Next.js admin interface
EOF

cat > tests/README.md << 'EOF'
# Tests

Test suites for the project.

## Structure

- `unit/` - Fast, isolated unit tests
- `integration/` - Tests with database/external services
- `e2e/` - End-to-end workflow tests

## Running Tests

```bash
# All tests
make test

# Unit tests only
pytest tests/unit/

# Integration tests only
pytest tests/integration/ -m integration

# With coverage
make test-cov
```
EOF

cat > docs/README.md << 'EOF'
# Documentation

Project documentation.

## Available Docs

- [Development Guide](DEVELOPMENT.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Architecture Guide](ARCHITECTURE.md)
- [API Documentation](http://localhost:8000/docs)

## Building Docs

Documentation is built automatically from code docstrings and markdown files.
EOF

echo "✅ Placeholder files created"
echo "✅ Repository structure setup complete!"
