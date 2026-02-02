#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
    echo ""
}

# Main setup function
main() {
    print_header "🚀 AI Ecosystem Developer Setup"
    
    print_info "This script will set up your local development environment."
    echo ""
    
    # Check if running from correct directory
    if [ ! -f "docker-compose.yml" ]; then
        print_error "docker-compose.yml not found!"
        print_info "Please run this script from the repository root directory."
        exit 1
    fi
    
    # Step 1: Check prerequisites
    print_header "Step 1: Checking Prerequisites"
    check_prerequisites
    
    # Step 2: Environment setup
    print_header "Step 2: Setting Up Environment Variables"
    setup_environment
    
    # Step 3: Build Docker images
    print_header "Step 3: Building Docker Images"
    build_docker_images
    
    # Step 4: Start services
    print_header "Step 4: Starting Services"
    start_services
    
    # Step 5: Wait for database
    print_header "Step 5: Waiting for Database"
    wait_for_database
    
    # Step 6: Run migrations
    print_header "Step 6: Running Database Migrations"
    run_migrations
    
    # Step 7: Install pre-commit hooks
    print_header "Step 7: Installing Pre-commit Hooks"
    install_precommit
    
    # Step 8: Verify installation
    print_header "Step 8: Verifying Installation"
    verify_installation
    
    # Step 9: Show next steps
    print_header "🎉 Setup Complete!"
    show_next_steps
}

# Check if required tools are installed
check_prerequisites() {
    local all_good=true
    
    # Check Docker
    if command -v docker &> /dev/null; then
        print_success "Docker is installed ($(docker --version))"
    else
        print_error "Docker is not installed"
        print_info "Install from: https://www.docker.com/products/docker-desktop"
        all_good=false
    fi
    
    # Check Docker Compose
    if docker compose version &> /dev/null; then
        print_success "Docker Compose is installed ($(docker compose version))"
    else
        print_error "Docker Compose is not installed"
        all_good=false
    fi
    
    # Check Git
    if command -v git &> /dev/null; then
        print_success "Git is installed ($(git --version))"
    else
        print_error "Git is not installed"
        all_good=false
    fi
    
    # Check Docker daemon
    if docker info &> /dev/null; then
        print_success "Docker daemon is running"
    else
        print_error "Docker daemon is not running"
        print_info "Please start Docker Desktop"
        all_good=false
    fi
    
    if [ "$all_good" = false ]; then
        print_error "Please install missing prerequisites and try again"
        exit 1
    fi
}

# Set up environment variables
setup_environment() {
    if [ -f ".env" ]; then
        print_warning ".env file already exists"
        read -p "Do you want to overwrite it? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Keeping existing .env file"
            return
        fi
    fi
    
    print_info "Creating .env from .env.example..."
    cp .env.example .env
    print_success ".env file created"
    
    print_warning "IMPORTANT: You need to edit .env and add your API keys"
    print_info "Required keys:"
    echo "  - OPENAI_API_KEY"
    echo "  - ODOO_URL, ODOO_DB, ODOO_LOGIN, ODOO_API_KEY"
    echo "  - AWS credentials (if using S3)"
    echo ""
    
    read -p "Open .env in your default editor now? (Y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        ${EDITOR:-nano} .env
    else
        print_warning "Remember to edit .env before running the application!"
    fi
}

# Build Docker images
build_docker_images() {
    print_info "Building Docker images (this may take 5-10 minutes on first run)..."
    
    if docker compose build; then
        print_success "Docker images built successfully"
    else
        print_error "Failed to build Docker images"
        exit 1
    fi
}

# Start Docker services
start_services() {
    print_info "Starting Docker services..."
    
    if docker compose up -d; then
        print_success "Services started successfully"
    else
        print_error "Failed to start services"
        exit 1
    fi
    
    print_info "Waiting for services to initialize..."
    sleep 5
}

# Wait for PostgreSQL to be ready
wait_for_database() {
    print_info "Waiting for PostgreSQL to be ready..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if docker compose exec -T db pg_isready -U postgres &> /dev/null; then
            print_success "PostgreSQL is ready"
            return
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "PostgreSQL failed to start within 60 seconds"
    print_info "Check logs with: docker compose logs db"
    exit 1
}

# Run database migrations
run_migrations() {
    print_info "Running database migrations..."
    
    # Check if alembic is set up
    if [ ! -d "alembic" ]; then
        print_warning "Alembic not initialized yet - skipping migrations"
        print_info "You'll need to run 'alembic init alembic' later"
        return
    fi
    
    if docker compose exec -T app alembic upgrade head; then
        print_success "Database migrations completed"
    else
        print_warning "Migration failed (this is OK if database is empty)"
    fi
}

# Install pre-commit hooks
install_precommit() {
    if [ -f ".pre-commit-config.yaml" ]; then
        print_info "Installing pre-commit hooks..."
        
        if docker compose exec -T app pre-commit install; then
            print_success "Pre-commit hooks installed"
        else
            print_warning "Failed to install pre-commit hooks (non-critical)"
        fi
    else
        print_warning ".pre-commit-config.yaml not found - skipping"
    fi
}

# Verify installation
verify_installation() {
    print_info "Verifying installation..."
    
    # Check if API is responding
    local api_health=false
    for i in {1..10}; do
        if curl -s http://localhost:8000/health &> /dev/null; then
            api_health=true
            break
        fi
        sleep 2
    done
    
    if [ "$api_health" = true ]; then
        print_success "API is responding at http://localhost:8000"
    else
        print_warning "API not responding yet (may still be starting up)"
    fi
    
    # Check running containers
    print_info "Running containers:"
    docker compose ps
}

# Show next steps
show_next_steps() {
    echo ""
    print_success "Development environment is ready!"
    echo ""
    echo -e "${GREEN}Available services:${NC}"
    echo "  📡 API:          http://localhost:8000"
    echo "  📖 API Docs:     http://localhost:8000/docs"
    echo "  🎨 Admin UI:     http://localhost:3000"
    echo "  🗄️  pgAdmin:      http://localhost:5050 (admin@woulf.com / admin)"
    echo "  🌸 Flower:       http://localhost:5555 (Celery monitoring)"
    echo "  📧 MailHog:      http://localhost:8025 (Email testing)"
    echo ""
    echo -e "${BLUE}Common commands:${NC}"
    echo "  🚀 Start:        docker compose up"
    echo "  🛑 Stop:         docker compose down"
    echo "  📊 Logs:         docker compose logs -f"
    echo "  🔧 Shell:        docker compose exec app bash"
    echo "  🧪 Tests:        docker compose exec app pytest"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "  1. ✏️  Edit .env and add your API keys (if you haven't already)"
    echo "  2. 💬 Join the team Slack/Discord"
    echo "  3. 📚 Read docs/DEVELOPMENT.md for detailed documentation"
    echo "  4. 📋 Check Linear/GitHub Projects for available tasks"
    echo "  5. 🌿 Create a feature branch: git checkout -b feature/your-task"
    echo ""
    echo -e "${GREEN}Happy coding! 🚀${NC}"
    echo ""
}

# Run main function
main
