# AI Ecosystem - Complete Setup Checklist

## Phase 1: GitHub Repository Setup (30 minutes)

### Create Repository
- [ ] Go to https://github.com/organizations/WoulfGroup/repositories/new
      (or create organization first if needed)
- [ ] Repository name: `ai-ecosystem`
- [ ] Visibility: **Private**
- [ ] Add README: ✅
- [ ] Add .gitignore: Python ✅
- [ ] License: MIT or Proprietary
- [ ] Click "Create repository"

### Configure Repository Settings
- [ ] Go to Settings → Branches
- [ ] Add branch protection rule for `main`:
      - Require pull request reviews before merging (2 approvals)
      - Require status checks to pass
      - Require branches to be up to date
      - Include administrators
- [ ] Add branch protection rule for `develop`:
      - Require pull request reviews (1 approval)
      - Require status checks to pass
      
### Add Team Members
- [ ] Go to Settings → Collaborators and teams
- [ ] Add team members with appropriate roles:
      - Admin: Justin
      - Write: All developers
- [ ] Each developer will receive email invitation

### Upload Setup Files
- [ ] Clone empty repository:
      ```bash
      git clone https://github.com/WoulfGroup/ai-ecosystem.git
      cd ai-ecosystem
      ```
- [ ] Copy all setup files from this package into repository
- [ ] Create initial commit:
      ```bash
      git add .
      git commit -m "chore: initial repository setup"
      git push origin main
      ```
- [ ] Create develop branch:
      ```bash
      git checkout -b develop
      git push origin develop
      ```

---

## Phase 2: Project Management Setup (20 minutes)

### Option A: Linear (Recommended)
- [ ] Go to https://linear.app
- [ ] Create workspace: "Woulf Group"
- [ ] Create team: "AI Ecosystem"
- [ ] Import Phase 1 roadmap (I'll provide CSV)
- [ ] Create sprints:
      - Sprint 1: Foundation - Weeks 1-2
      - Sprint 2: Foundation - Weeks 3-4
      - Sprint 3: Foundation - Weeks 5-6
      - Sprint 4: Foundation - Weeks 7-8
- [ ] Invite team members

### Option B: GitHub Projects (Free Alternative)
- [ ] Go to repository → Projects → New project
- [ ] Select "Board" template
- [ ] Create columns: Backlog, Ready, In Progress, In Review, Done
- [ ] Create initial issues from roadmap

---

## Phase 3: Communication Setup (15 minutes)

### Option A: Slack
- [ ] Create Slack workspace or use existing
- [ ] Create channels:
      - #general
      - #development
      - #foundation
      - #agents (for agent-specific work)
      - #deploys
      - #github (for GitHub notifications)
      - #random
- [ ] Invite team members
- [ ] Set up GitHub integration:
      - /github subscribe WoulfGroup/ai-ecosystem
      - Configure notifications for PRs, issues, deployments

### Option B: Discord (Alternative)
- [ ] Create Discord server
- [ ] Create categories and channels:
      Development:
        - #general-dev
        - #foundation
        - #agents
      Coordination:
        - #standups
        - #planning
      Voice Channels:
        - Daily Standup
        - Pair Programming
- [ ] Invite team members

---

## Phase 4: Infrastructure Setup (20 minutes)

### Shared Development Database (Optional but Recommended)

**Option A: Railway.app ($10/month)**
- [ ] Sign up at https://railway.app
- [ ] Create new project: "ai-ecosystem-dev"
- [ ] Add PostgreSQL service
- [ ] Add Redis service
- [ ] Copy connection strings to 1Password/LastPass
- [ ] Share with team

**Option B: Supabase (Free tier available)**
- [ ] Sign up at https://supabase.com
- [ ] Create project: "ai-ecosystem-dev"
- [ ] Copy connection string
- [ ] Share with team

### Secrets Management
- [ ] Create shared 1Password vault or LastPass folder
- [ ] Add:
      - OPENAI_API_KEY
      - ODOO credentials
      - Database connection strings
      - Any other API keys
- [ ] Share access with team

---

## Phase 5: CI/CD Setup (15 minutes)

### GitHub Secrets
- [ ] Go to repository Settings → Secrets and variables → Actions
- [ ] Add repository secrets:
      - `OPENAI_API_KEY` (for CI tests)
      - `DOCKER_USERNAME` (if using Docker Hub)
      - `DOCKER_PASSWORD` (if using Docker Hub)
      - `SLACK_WEBHOOK_URL` (for deployment notifications)
      - Any other secrets needed for CI

### GitHub Actions
- [ ] Verify `.github/workflows/ci-cd.yml` exists in repository
- [ ] Push a test commit to trigger workflow
- [ ] Check Actions tab to see if workflow runs
- [ ] Fix any issues with secrets or configuration

---

## Phase 6: Developer Onboarding (Per Developer)

### Send Onboarding Package to Each Developer

Email template:
```
Subject: Welcome to AI Ecosystem - Getting Started

Hi [Name],

Welcome to the AI Ecosystem development team! Here's everything you need to get started:

**Access:**
1. GitHub repository: https://github.com/WoulfGroup/ai-ecosystem
2. Linear workspace: [link]
3. Slack workspace: [link]
4. 1Password vault: [link]

**Setup Instructions:**
1. Read QUICK_START.md in the docs/ folder
2. Run the setup script: ./scripts/dev-setup.sh
3. Join #development Slack channel
4. Attend tomorrow's standup at [time]

**First Task:**
Pick up a "good-first-issue" task from Linear/GitHub Projects.

Let me know if you hit any blockers!

Justin
```

### Checklist Per Developer
- [ ] GitHub access granted
- [ ] Linear/Project access granted
- [ ] Slack/Discord invited
- [ ] 1Password/secrets access granted
- [ ] Completed ./scripts/dev-setup.sh
- [ ] Can access http://localhost:8000
- [ ] Attended first standup
- [ ] Assigned first task

---

## Phase 7: First Sprint Planning (30 minutes)

### Sprint 1 Goals (Weeks 1-2)
- [ ] Set up monorepo structure
- [ ] Create Docker Compose development environment
- [ ] Set up PostgreSQL + Redis
- [ ] Create initial database models
- [ ] Set up FastAPI skeleton
- [ ] Create first entity model
- [ ] Write first tests
- [ ] Establish team workflow

### Create Sprint Issues
- [ ] Create issues in Linear/GitHub for each task
- [ ] Estimate each task (hours or story points)
- [ ] Assign tasks to team members
- [ ] Set sprint end date (2 weeks)

### Schedule Meetings
- [ ] Daily standup: [time] in Slack or Discord
- [ ] Sprint planning: [time] every 2 weeks
- [ ] Sprint review: [time] every 2 weeks
- [ ] Retrospective: [time] every 2 weeks

---

## Phase 8: Documentation (Ongoing)

### Create Initial Documentation
- [ ] Architecture diagram (can use Mermaid in markdown)
- [ ] Development guide (mostly done in CONTRIBUTING.md)
- [ ] API documentation (auto-generated from code)
- [ ] Deployment guide (create later)

### Knowledge Base
- [ ] Set up wiki or Notion for:
      - Onboarding docs
      - Architecture decisions
      - Meeting notes
      - Troubleshooting guides

---

## Phase 9: Monitoring & Alerts (Production - Later)

_Skip for now, set up when deploying to production_

### Monitoring
- [ ] Sign up for Sentry (error tracking)
- [ ] Set up logging aggregation (e.g., Logtail)
- [ ] Set up uptime monitoring (e.g., UptimeRobot)

### Alerts
- [ ] Configure Slack alerts for:
      - Production errors
      - Deployment status
      - CI/CD failures
      - High CPU/memory usage

---

## Verification Checklist

### Repository ✅
- [ ] Repository created on GitHub
- [ ] Branch protection enabled on main and develop
- [ ] All setup files committed
- [ ] Team members have access

### Project Management ✅
- [ ] Linear/GitHub Projects set up
- [ ] First sprint planned
- [ ] Tasks assigned to team

### Communication ✅
- [ ] Slack/Discord workspace active
- [ ] All team members joined
- [ ] GitHub notifications configured

### Development Environment ✅
- [ ] docker-compose.yml works
- [ ] All services start successfully
- [ ] Tests can run
- [ ] At least one developer successfully onboarded

### CI/CD ✅
- [ ] GitHub Actions workflow running
- [ ] Tests pass in CI
- [ ] Secrets configured correctly

---

## Common First-Time Issues

### Issue: Developers can't access repository
**Fix:** Check GitHub organization membership and repository permissions

### Issue: Docker won't start services
**Fix:** Ensure Docker Desktop is running, check port conflicts (5432, 8000, 6379)

### Issue: Tests failing in CI but passing locally
**Fix:** Check environment variables in GitHub Secrets, ensure test database is configured

### Issue: Pre-commit hooks not running
**Fix:** Run `pre-commit install` inside container

### Issue: Can't push to main/develop
**Fix:** This is correct! Branch protection is working. Must create PR.

---

## Success Metrics

After setup is complete, you should have:

- ✅ 100% of team can run `./scripts/dev-setup.sh` successfully
- ✅ 100% of team can see services at http://localhost:8000
- ✅ 100% of team can create a branch, commit, and open a PR
- ✅ All CI checks passing on every PR
- ✅ First sprint planned with assigned tasks
- ✅ Daily standups happening
- ✅ First feature merged to develop

---

## Timeline

- **Day 1 (4 hours):** Phases 1-4 (Repository, Project Management, Communication, Infrastructure)
- **Day 2 (2 hours):** Phases 5-6 (CI/CD, First developer onboarded)
- **Day 3 (2 hours):** Phase 7 (Sprint planning, team kickoff)
- **Week 1:** All developers onboarded
- **Week 2:** Team working smoothly

---

## Next Steps After Setup

Once all checkboxes are complete:

1. **Start Phase 1, Week 1:** Foundation core infrastructure
2. **Hold first daily standup:** Set regular cadence
3. **Review progress weekly:** Adjust as needed
4. **Celebrate wins:** First PR merged, first sprint complete, etc.

---

## Support

If you need help with any step:

- **GitHub setup:** GitHub support docs
- **Docker issues:** Docker documentation or Stack Overflow
- **Linear setup:** Linear support chat
- **General questions:** Post in #development Slack channel

---

**Good luck! You've got this! 🚀**

---

## Quick Reference Commands

```bash
# Initial clone
git clone https://github.com/WoulfGroup/ai-ecosystem.git
cd ai-ecosystem

# Run setup
./scripts/dev-setup.sh

# Daily workflow
git checkout develop
git pull origin develop
git checkout -b feature/TASK-123-description
# ... make changes ...
git add .
git commit -m "feat(scope): description"
git push origin feature/TASK-123-description
# ... create PR on GitHub ...

# Common commands
make up          # Start services
make down        # Stop services
make test        # Run tests
make logs        # View logs
make shell       # Open shell in container
```
