## Description
<!-- Provide a clear description of what this PR does -->

## Related Issues
<!-- Link related issues using #issue_number -->
Closes #
Related to #

## Type of Change
<!-- Mark the relevant option with an 'x' -->
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🎨 UI/UX improvement
- [ ] 🧪 Test addition or improvement

## Agent/Layer
<!-- Which agent or layer does this affect? -->
- [ ] 🏗️ Foundation (Layer 1-3)
- [ ] 💰 Finance Agent
- [ ] 🏪 SellPronto Agent
- [ ] 🏠 STR Agent
- [ ] 🤖 Agent Creator
- [ ] 🌐 Web Builder Agent
- [ ] 📢 Marketing Agent
- [ ] 💼 Sales Agent
- [ ] 🛠️ Infrastructure
- [ ] 📖 Documentation

## Changes Made
<!-- List the main changes in this PR -->
- 
- 
- 

## Testing
<!-- Describe how you tested this -->

### Test Strategy
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] End-to-end tests added/updated

### Test Coverage
<!-- If applicable, add test coverage statistics -->
- Coverage before: _%
- Coverage after: _%

### Manual Testing Steps
1. 
2. 
3. 

## Screenshots/Videos
<!-- If applicable, add screenshots or videos demonstrating the changes -->

## Checklist
<!-- Ensure all items are checked before requesting review -->

### Code Quality
- [ ] Code follows project style guidelines (ran `black` and `ruff`)
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] No console.log or debugging code left in
- [ ] No unnecessary commented-out code
- [ ] Variable and function names are clear and descriptive

### Documentation
- [ ] README updated (if needed)
- [ ] API documentation updated (if adding/changing endpoints)
- [ ] Inline code comments added where necessary
- [ ] Architecture docs updated (if changing structure)

### Testing
- [ ] All tests pass locally (`make test`)
- [ ] New tests cover edge cases
- [ ] Tested with different user roles/permissions (if applicable)
- [ ] Tested error handling and edge cases

### Security
- [ ] No secrets/API keys in code
- [ ] Input validation added where needed
- [ ] Authentication/authorization properly implemented
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (sanitized inputs)

### Database
- [ ] Database migrations created (if schema changes)
- [ ] Migrations tested with `make migrate`
- [ ] Rollback strategy considered
- [ ] Database indexes added for performance (if needed)

### Performance
- [ ] No obvious performance issues
- [ ] Database queries optimized (no N+1 queries)
- [ ] Caching implemented where appropriate
- [ ] Large file uploads handled properly

### Dependencies
- [ ] New dependencies justified and documented
- [ ] requirements.txt updated (if adding Python packages)
- [ ] package.json updated (if adding Node packages)

### Git
- [ ] Branch is up to date with develop
- [ ] No merge conflicts
- [ ] Commit messages follow convention (feat/fix/docs/refactor/test/chore)
- [ ] Commits are atomic and well-organized

## Deployment Notes
<!-- Any special deployment considerations? -->
- [ ] Requires environment variable changes (document below)
- [ ] Requires database migration
- [ ] Requires manual steps after deployment
- [ ] Backwards compatible with current production

### Environment Variables
<!-- If new env vars are needed, list them -->
```bash
# Add to .env:
NEW_VAR=value
```

## Breaking Changes
<!-- If this introduces breaking changes, document them -->

### What breaks?


### Migration path for existing code:


## Rollback Plan
<!-- How to rollback if this causes issues in production? -->


## Additional Context
<!-- Any other context, implementation decisions, or tradeoffs made -->


## Reviewer Notes
<!-- Specific areas you'd like reviewers to focus on -->
- Please review: 
- Known issues: 
- Future improvements: 

---

### Post-Merge Checklist (for reviewers)
- [ ] Merge approved by required reviewers
- [ ] All CI checks passed
- [ ] Documentation updated in knowledge base
- [ ] Team notified in Slack (if significant change)
- [ ] Monitoring set up (if new feature)
