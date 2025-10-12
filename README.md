# Kong QA Automation Framework

## 1. Project Overview

This is a comprehensive end-to-end test automation framework for Kong API Gateway built with **Cypress** and **TypeScript**. The framework provides robust testing capabilities for Kong Manager UI and API endpoints, featuring page object models, test reporting with Allure, and CI integration.

## 2. Core Features

- **Page Object Model**: Maintainable TypeScript test structure
- **Test Organization**: Tagged tests (`ui`, `smoke`, `regression`) with `@cypress/grep`
- **Allure Reporting**: Detailed reports with screenshots and CI integration
- **Multi-Environment**: Local, QA, and custom environment support
- **Kong Gateway Testing**: workspace management, and UI validation
- **Code Quality**: ESLint for TypeScript linting and Prettier for code formatting
- **Development Tools**: Automated code quality checks and consistent styling

## 3. Setup Instructions for Running Tests Locally

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose

### Quick Start

```bash
# 1. Clone and setup
git clone https://github.com/chptcleo/qa-automation-kong.git
cd qa-automation-kong
npm install

# 2. Start Kong Gateway
docker-compose up -d

# 3. Create cypress.env.qa.json
{
  "UI_URL": "http://localhost:8002",
  "API_URL": "http://localhost:8001"
}

# 4. Run tests
npm run cypress:open    # Interactive mode
npm run cypress:run     # Headless mode

# 5. View reports
npm run allure:generate && npm run allure:open
```

### Test Execution Options

```bash
npm run cypress:run:ui         # UI tests only
npm run cypress:run:smoke      # Smoke tests only
npm run cypress:run:regression # Regression tests only
```

## 4. CI Pipeline and Test Results

### Auto-Triggered CI

- **Runs on**: Every push to any branch or pull request
- **Manual**: Actions tab → Continuous Integration → Run workflow

### View Test Results

1. Go to **Actions** tab in GitHub
2. Click latest workflow run
3. Download **allure-report** artifact
4. Extract and run:

```bash
allure open allure-report
```

### Pipeline Configuration

- Auto-deploys Kong Gateway with Docker Compose
- Runs Cypress tests in Chrome headless mode
- Generates Allure reports with screenshots

## 5. Multi-Environment Testing

### Environment Configuration

Create config files for different environments:

```bash
cypress.env.qa.json       # QA environment
cypress.env.staging.json  # Staging environment
cypress.env.prod.json     # Production environment
```

### Add Environment Scripts to `package.json`

```json
{
  "scripts": {
    "cypress:staging": "cp cypress.env.staging.json cypress.env.json && cypress run --browser chrome",
    "cypress:prod": "cp cypress.env.prod.json cypress.env.json && cypress run --browser chrome --env grepTags=smoke"
  }
}
```

### Run Tests by Environment

```bash
npm run cypress:run      # QA (default)
npm run cypress:staging  # Staging
npm run cypress:prod     # Production
```

## 6. Code Quality Tools

### ESLint - Code Linting
Ensures TypeScript code quality and catches potential issues.

```bash
npm run eslint:check    # Check for linting issues
npm run eslint:fix      # Auto-fix linting issues
```

### Prettier - Code Formatting
Maintains consistent code formatting across all files.

```bash
npm run prettier        # Format all files
```

### Configuration
- **ESLint**: `eslint.config.mts` - TypeScript rules and error detection
- **Prettier**: `.prettierrc.json` - Code formatting standards (2 spaces, semicolons, double quotes)

**Happy Testing! 🚀**
