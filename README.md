# AI Ecosystem - Multi-Agent Foundation

**Universal AI agent infrastructure supporting Finance, SellPronto, STR Management, Web Builder, Marketing, Sales, and custom agents.**

## 🎯 Vision

Build once, deploy many. A foundation-first architecture that enables:
- 7+ specialized AI agents sharing common infrastructure
- 60% code reuse across all agents
- 4-6 week deployment for new agents (vs 6 months standalone)
- Enterprise-grade governance, compliance, and audit trails

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AGENT LAYER                              │
│  Finance | SellPronto | STR | Web | Marketing | Sales | Creator │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│               LAYER 3: KNOWLEDGE GRAPH                          │
│  Entities | Contracts | Obligations | Customers | Campaigns     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│             LAYER 2: DATA INGESTION                             │
│  Odoo | Gmail | Drive | Stripe | Marketplaces | CRM | Analytics │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│         LAYER 1: GOVERNANCE & TRUTH                             │
│  Entity Graph | Permissions | Audit Log | Guardrails            │
└─────────────────────────────────────────────────────────────────┘
```

## 📦 Repository Structure

```
ai-ecosystem/
├── packages/                  # Shared libraries (Layers 1-3)
│   ├── core/                 # Foundation (governance, models, utils)
│   ├── integrations/         # External service connectors
│   └── utils/                # Shared utilities
├── agents/                   # Agent implementations
│   ├── finance/              # Finance & CFO agent
│   ├── sellpronto/           # Multi-marketplace selling
│   ├── str/                  # Short-term rental management
│   ├── web_builder/          # Web page generation
│   ├── marketing/            # Marketing automation
│   ├── sales/                # Sales CRM & assistance
│   └── creator/              # Meta-agent for creating agents
├── apps/                     # Applications
│   ├── api/                  # FastAPI backend
│   ├── worker/               # Celery workers
│   └── admin/                # Next.js admin UI
├── tests/                    # Test suites
├── docs/                     # Documentation
├── scripts/                  # Utility scripts
└── infrastructure/           # Deployment configs
```

## 🚀 Quick Start

### Prerequisites

- Docker Desktop installed ([download](https://www.docker.com/products/docker-desktop))
- Git installed
- GitHub account with access to this repository

### First-Time Setup (15 minutes)

```bash
# 1. Clone repository
git clone https://github.com/WoulfGroup/ai-ecosystem.git
cd ai-ecosystem

# 2. Run automated setup
./scripts/dev-setup.sh

# 3. Start development environment
docker-compose up

# 4. Open in browser
# API:      http://localhost:8000
# Docs:     http://localhost:8000/docs
# Admin UI: http://localhost:3000
# pgAdmin:  http://localhost:5050
```

That's it! You're ready to develop.

## 🛠️ Development Workflow

### Starting Your Day

```bash
# Get latest code
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Start services
docker-compose up
```

### During Development

```bash
# Run tests
docker-compose exec app pytest

# Run linter
docker-compose exec app black .

# Check types
docker-compose exec app mypy .

# View logs
docker-compose logs -f app
```

### Committing Changes

```bash
# Add changes
git add .

# Commit (pre-commit hooks run automatically)
git commit -m "feat(agent): add new feature"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

## 📚 Documentation

- [Development Guide](docs/DEVELOPMENT.md) - Detailed development instructions
- [Contributing Guide](docs/CONTRIBUTING.md) - How to contribute
- [Architecture Guide](docs/ARCHITECTURE.md) - System architecture
- [API Documentation](http://localhost:8000/docs) - Auto-generated API docs

## 🧪 Testing

```bash
# Run all tests
docker-compose exec app pytest

# Run specific test file
docker-compose exec app pytest tests/test_entity_model.py

# Run with coverage
docker-compose exec app pytest --cov=. --cov-report=html

# View coverage report
open htmlcov/index.html
```

## 📋 Common Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild containers
docker-compose build

# View logs
docker-compose logs -f [service_name]

# Open shell in container
docker-compose exec app bash

# Run database migrations
docker-compose exec app alembic upgrade head

# Create new migration
docker-compose exec app alembic revision --autogenerate -m "description"

# Access Python REPL with app context
docker-compose exec app python
```

## 🌿 Branch Strategy

```
main              # Production-ready code (protected)
  ↓
develop           # Integration branch (protected)
  ↓
feature/*         # Feature branches (your work)
hotfix/*          # Emergency fixes
release/*         # Release candidates
```

## 📦 Tech Stack

**Backend:**
- Python 3.11+
- FastAPI (API framework)
- SQLAlchemy (ORM)
- Alembic (migrations)
- Celery (async tasks)
- PostgreSQL 16 (database)
- Redis 7 (cache/queue)

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

**Infrastructure:**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- AWS S3 (file storage)

**AI/ML:**
- OpenAI GPT-4 (language models)
- LangChain (agent orchestration)

## 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
# Edit .env with your actual API keys
```

**Never commit `.env` to Git!**

## 👥 Team

- **Justin** - Tech Lead / Product Owner
- **Developer 1** - Foundation & Backend
- **Developer 2** - Integrations & SellPronto
- **Developer 3** - DevOps & Infrastructure
- **Developer 4** - Frontend & UI/UX

## 📅 Roadmap

### Phase 1: Foundation (Weeks 1-8) ✅ In Progress
- Core infrastructure
- Layer 1: Governance & Truth
- Layer 2: Data Ingestion
- Layer 3: Knowledge Graph

### Phase 2: Finance Agent (Weeks 9-12)
- Odoo integration
- A/R automation
- Compliance tracking

### Phase 3: Agent Creator + SellPronto (Weeks 13-18)
- Agent Creator MVP
- SellPronto marketplace integration

### Phase 4: STR Agent (Weeks 19-24)
- Property management
- Booking automation

### Phase 5+: Marketing, Sales, Web Builder (Weeks 25-54)
- 5 more specialized agents

## 🐛 Issues & Support

- **Bugs:** Create issue on GitHub
- **Questions:** Ask in #development Slack channel
- **PRs:** Use PR template, request reviews

## 📄 License

Proprietary - Woulf Group. All rights reserved.

## 🙏 Acknowledgments

Built with foundation-first architecture principles to support scalable AI agent deployment.

---

**Ready to build the future of AI agents? Let's go! 🚀**
