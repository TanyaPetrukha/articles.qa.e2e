# QA Dojo Articles

End-to-End testing suite for the Articles application using Playwright.

## Project Overview

This project contains automated E2E tests for the Articles application. Tests are written using Playwright Test framework and include validation of user scenarios and error handling.

## Prerequisites

- Node.js 16+ 
- npm 

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file in the project root and configure environment variables:

```
UI_URL=http://your-app-url
API_URL=http://your-api-url
```

## Running Tests

### Run all tests

```bash
npm test
```

Or use Playwright directly:

```bash
npx playwright test
```

### Run specific test file

```bash
npx playwright test tests/auth.spec.ts
```

### Run tests with specific tag

```bash
npx playwright test --grep @auth
npx playwright test --grep @registration
npx playwright test --grep @login
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

### Run tests with UI mode

```bash
npx playwright test --ui
```

### View HTML report

```bash
npx playwright show-report
```
