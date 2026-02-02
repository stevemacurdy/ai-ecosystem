# Contributing to AI Ecosystem

Thank you for contributing to the AI Ecosystem project! This document provides guidelines and best practices for contributing.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Testing Guidelines](#testing-guidelines)
5. [Commit Message Convention](#commit-message-convention)
6. [Pull Request Process](#pull-request-process)
7. [Code Review Guidelines](#code-review-guidelines)

## Getting Started

### Prerequisites

- Docker Desktop installed
- Git installed
- GitHub account with repository access
- API keys (OpenAI, Odoo, etc.)

### Initial Setup

```bash
# Clone repository
git clone https://github.com/WoulfGroup/ai-ecosystem.git
cd ai-ecosystem

# Run setup script
./scripts/dev-setup.sh

# Start development environment
docker compose up
```

See [README.md](README.md) for detailed setup instructions.

## Development Workflow

### 1. Start New Feature

```bash
# Always start from latest develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/TASK-123-short-description
```

**Branch Naming Convention:**
- `feature/TASK-123-description` - New features
- `fix/TASK-123-description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions

### 2. Development

Make your changes following our [Code Standards](#code-standards).

```bash
# Run tests frequently
docker compose exec app pytest

# Format code
docker compose exec app black .

# Check linting
docker compose exec app ruff check .
```

### 3. Commit Changes

```bash
# Add changes
git add .

# Commit with conventional message
git commit -m "feat(finance): add payment reminder automation"

# Pre-commit hooks will run automatically
```

See [Commit Message Convention](#commit-message-convention) for details.

### 4. Push and Create PR

```bash
# Push to GitHub
git push origin feature/TASK-123-description

# Create Pull Request on GitHub
# - Use PR template
# - Request reviews from team
# - Link related issues
```

### 5. Address Review Feedback

```bash
# Make requested changes
git add .
git commit -m "refactor: address PR feedback"
git push origin feature/TASK-123-description

# PR will automatically update
```

### 6. After Merge

```bash
# Switch back to develop
git checkout develop
git pull origin develop

# Delete feature branch
git branch -d feature/TASK-123-description
```

## Code Standards

### Python Style Guide

We follow **PEP 8** with some modifications:

- **Line length:** 100 characters (not 79)
- **String quotes:** Double quotes preferred
- **Formatting:** Use Black (configured in project)
- **Import sorting:** Use isort (configured in project)
- **Type hints:** Required for public functions

#### Example

```python
from typing import Optional, List
from datetime import datetime

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from packages.core.models import Entity


class PaymentReminder(BaseModel):
    """Payment reminder model with validation."""
    
    entity_id: str
    amount: float
    due_date: datetime
    message: Optional[str] = None


def send_payment_reminder(
    entity_id: str,
    amount: float,
    due_date: datetime,
) -> PaymentReminder:
    """
    Send payment reminder to entity.
    
    Args:
        entity_id: Unique entity identifier
        amount: Payment amount owed
        due_date: Payment due date
        
    Returns:
        PaymentReminder object with sent details
        
    Raises:
        HTTPException: If entity not found or reminder fails
    """
    # Implementation
    pass
```

### File Organization

```
packages/core/module_name/
├── __init__.py          # Module exports
├── models.py            # Pydantic models, SQLAlchemy models
├── service.py           # Business logic
├── repository.py        # Database operations
├── schemas.py           # API request/response schemas
└── utils.py             # Helper functions
```

### Documentation

- **Docstrings:** Required for all public functions, classes, modules
- **Format:** Google style docstrings
- **Type hints:** Use Python type hints
- **Comments:** Explain "why", not "what"

```python
def calculate_late_fee(days_overdue: int, amount: float) -> float:
    """
    Calculate late fee based on days overdue.
    
    Uses tiered fee structure:
    - 1-30 days: 2% of amount
    - 31-60 days: 5% of amount
    - 61+ days: 10% of amount
    
    Args:
        days_overdue: Number of days payment is overdue
        amount: Original payment amount
        
    Returns:
        Late fee amount
        
    Example:
        >>> calculate_late_fee(45, 1000.00)
        50.00
    """
    if days_overdue <= 30:
        return amount * 0.02
    elif days_overdue <= 60:
        return amount * 0.05
    else:
        return amount * 0.10
```

### Error Handling

- Use exceptions for exceptional cases
- Provide helpful error messages
- Log errors with context
- Use custom exceptions when appropriate

```python
class EntityNotFoundError(Exception):
    """Raised when entity cannot be found."""
    
    def __init__(self, entity_id: str):
        self.entity_id = entity_id
        super().__init__(f"Entity not found: {entity_id}")


def get_entity(entity_id: str) -> Entity:
    """Get entity by ID."""
    entity = db.query(Entity).filter(Entity.id == entity_id).first()
    
    if not entity:
        logger.error(f"Entity not found", extra={"entity_id": entity_id})
        raise EntityNotFoundError(entity_id)
    
    return entity
```

## Testing Guidelines

### Test Structure

```
tests/
├── unit/                 # Fast, isolated tests
│   ├── test_entity_model.py
│   └── test_payment_service.py
├── integration/          # Tests with database, external services
│   ├── test_odoo_connector.py
│   └── test_finance_agent.py
└── e2e/                  # End-to-end tests
    └── test_payment_workflow.py
```

### Writing Tests

```python
import pytest
from datetime import datetime, timedelta

from packages.core.finance.service import calculate_late_fee, send_payment_reminder
from packages.core.finance.models import PaymentReminder


class TestLateFeeCalculation:
    """Test late fee calculation logic."""
    
    def test_1_to_30_days_overdue(self):
        """Should charge 2% for 1-30 days overdue."""
        fee = calculate_late_fee(days_overdue=15, amount=1000.00)
        assert fee == 20.00
    
    def test_31_to_60_days_overdue(self):
        """Should charge 5% for 31-60 days overdue."""
        fee = calculate_late_fee(days_overdue=45, amount=1000.00)
        assert fee == 50.00
    
    def test_over_60_days_overdue(self):
        """Should charge 10% for 61+ days overdue."""
        fee = calculate_late_fee(days_overdue=75, amount=1000.00)
        assert fee == 100.00


@pytest.mark.integration
class TestPaymentReminders:
    """Test payment reminder sending (integration tests)."""
    
    @pytest.fixture
    def test_entity(self, db_session):
        """Create test entity."""
        entity = Entity(id="TEST-001", name="Test Company")
        db_session.add(entity)
        db_session.commit()
        return entity
    
    def test_send_reminder_success(self, test_entity):
        """Should send reminder successfully."""
        reminder = send_payment_reminder(
            entity_id=test_entity.id,
            amount=1000.00,
            due_date=datetime.now() - timedelta(days=30)
        )
        
        assert reminder.entity_id == test_entity.id
        assert reminder.amount == 1000.00
        assert reminder.sent_at is not None
```

### Test Coverage

- **Target:** 80%+ coverage
- **Critical paths:** 100% coverage
- **Run coverage:** `make test-cov`
- **View report:** `open htmlcov/index.html`

### Running Tests

```bash
# Run all tests
make test

# Run specific test file
docker compose exec app pytest tests/unit/test_entity_model.py

# Run with coverage
make test-cov

# Run only unit tests
docker compose exec app pytest tests/unit/

# Run only integration tests
docker compose exec app pytest tests/integration/ -m integration
```

## Commit Message Convention

We use **Conventional Commits** specification.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring (no feature change)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config)
- `ci`: CI/CD changes

### Scopes

- `foundation`: Layer 1-3 changes
- `finance`: Finance agent
- `sellpronto`: SellPronto agent
- `str`: STR agent
- `creator`: Agent Creator
- `web`: Web Builder agent
- `marketing`: Marketing agent
- `sales`: Sales agent
- `api`: API changes
- `db`: Database changes
- `infra`: Infrastructure

### Examples

```bash
# Good commits
feat(finance): add automatic payment reminder system
fix(sellpronto): resolve eBay rate limiting issue
docs(foundation): update entity model documentation
refactor(api): extract authentication logic to middleware
test(finance): add tests for late fee calculation
chore(deps): update OpenAI SDK to v1.12.0

# Bad commits
fix: bug fix
update code
WIP
changes
```

### Commit Body (Optional)

```
feat(sellpronto): add eBay connector with OAuth support

Implements full eBay API integration including:
- OAuth 2.0 authentication flow
- Listing creation and updates
- Rate limit handling with retry logic
- Metrics tracking (views, favorites)

Resolves #123
```

## Pull Request Process

### 1. Before Creating PR

- [ ] All tests pass locally
- [ ] Code is formatted (`make format`)
- [ ] No linting errors (`make lint`)
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] Branch is up to date with develop

### 2. Create PR

- Use PR template (fills automatically)
- Write clear description
- Link related issues
- Add screenshots/videos if UI changes
- Select appropriate labels
- Request reviews from relevant team members

### 3. Required Checks

All PRs must pass:
- ✅ All tests passing
- ✅ Code coverage maintained/improved
- ✅ Linting checks passing
- ✅ No security vulnerabilities
- ✅ Documentation updated
- ✅ 1+ approving reviews (2+ for main branch)

### 4. Review Process

- Address all comments
- Push changes (will update PR automatically)
- Re-request review after changes
- Don't force-push after reviews (loses context)

### 5. Merging

- **Merge strategy:** Squash and merge (for clean history)
- **Delete branch:** After merge (automatic)
- **Update local:** `git pull origin develop` after merge

## Code Review Guidelines

### As a Reviewer

#### Focus Areas

1. **Correctness:** Does it work? Does it solve the problem?
2. **Architecture:** Does it fit the foundation architecture?
3. **Code Quality:** Is it readable, maintainable, testable?
4. **Security:** Any vulnerabilities? Secrets exposed?
5. **Performance:** Any obvious performance issues?
6. **Tests:** Are edge cases covered?

#### Review Checklist

- [ ] Code follows project standards
- [ ] Architecture fits Layers 1-3 model
- [ ] No hardcoded credentials
- [ ] Error handling is appropriate
- [ ] Tests cover new code
- [ ] Documentation is updated
- [ ] No obvious security issues
- [ ] Performance is acceptable

#### Providing Feedback

**Good:**
```
Consider extracting this into a separate function for reusability:
```python
def validate_entity_permissions(entity_id: str, user_id: str) -> bool:
    # ...
```
This would make testing easier and allow reuse in other agents.
```

**Bad:**
```
This is wrong.
Bad code.
Change this.
```

#### Review Response Time

- **Priority PRs:** Within 4 hours
- **Normal PRs:** Within 24 hours
- **Documentation PRs:** Within 48 hours

### As a PR Author

#### Responding to Feedback

- Thank reviewers for their time
- Ask questions if feedback is unclear
- Explain your reasoning when disagreeing
- Make requested changes promptly
- Re-request review after changes

#### Example Responses

```
Good point! I've extracted that logic into a shared utility function
and added unit tests. PTAL (please take another look).
```

```
I considered that approach, but went with this because [reasoning].
Open to other solutions if you have concerns.
```

## Architecture Guidelines

### Foundation-First Approach

All agents must use Layers 1-3:

```python
# ✅ Good - Uses foundation layers
from packages.core.governance import EntityGraph
from packages.core.knowledge import KnowledgeGraph
from packages.integrations.odoo import OdooConnector

def get_customer_invoices(customer_id: str) -> List[Invoice]:
    # Check permissions (Layer 1)
    if not entity_graph.can_access(user_id, customer_id):
        raise PermissionError()
    
    # Query knowledge graph (Layer 3)
    return knowledge_graph.query(
        "invoices for customer",
        entity_id=customer_id
    )

# ❌ Bad - Bypasses foundation
def get_customer_invoices(customer_id: str) -> List[Invoice]:
    # Direct database query - skips permissions, audit, etc.
    return db.query(Invoice).filter(customer_id=customer_id).all()
```

### Service Layer Pattern

```python
# Repository (database access)
class InvoiceRepository:
    def get_by_id(self, invoice_id: str) -> Invoice:
        return db.query(Invoice).filter(Invoice.id == invoice_id).first()

# Service (business logic)
class InvoiceService:
    def __init__(self, repository: InvoiceRepository):
        self.repository = repository
    
    def mark_as_paid(self, invoice_id: str, payment_amount: float):
        # Business logic
        invoice = self.repository.get_by_id(invoice_id)
        invoice.mark_paid(payment_amount)
        # Log to Layer 1 audit trail
        audit_log.record(...)

# API (HTTP interface)
@router.post("/invoices/{invoice_id}/pay")
def pay_invoice(invoice_id: str, amount: float):
    service = InvoiceService(InvoiceRepository())
    service.mark_as_paid(invoice_id, amount)
    return {"status": "paid"}
```

## Questions?

- **Slack:** #development channel
- **Email:** dev@woulfgroup.com
- **GitHub Issues:** For bugs/features

---

**Thank you for contributing!** 🚀
