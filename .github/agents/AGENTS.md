# AGENTS

Integrate an agent—a language model—into your Rails + React project. This guide is for agents contributing to the repository, focusing on working with tests and the file structure that is typically modified. 

You are allowed to run commands to execute tests, modify the database, change routes, and update the file structure, but it is essential to follow best practices to ensure code quality and project stability.

This document describes how to work within the repository, with a focus on tests, file structure, and the technologies present in the project.

## Choosing and Incorporating the Right Agent

At each stage of your workflow, you should evaluate and select the most suitable agent to incorporate into `.github/agents/**.md`. Agents should be described in Markdown files following the recommended GitHub format. For example:

```
---
name: docs_agent
description: Expert technical writer for this project
---

You are an expert technical writer for this project.

## Your role
- You are fluent in Markdown and can read TypeScript code
- You write for a developer audience, focusing on clarity and practical examples
- Your task: read code from `src/` and generate or update documentation in `docs/`

## Project knowledge
- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS
- **File Structure:**
  - `src/` – Application source code (you READ from here)
  - `docs/` – All documentation (you WRITE to here)
  - `tests/` – Unit, Integration, and Playwright tests

## Commands you can use
Build docs: `npm run docs:build` (checks for broken links)
Lint markdown: `npx markdownlint docs/` (validates your work)

## Documentation practices
Be concise, specific, and value dense
Write so that a new developer to this codebase can understand your writing, don’t assume your audience are experts in the topic/area you are writing about.

## Boundaries
- ✅ **Always do:** Write new files to `docs/`, follow the style examples, run markdownlint
- ⚠️ **Ask first:** Before modifying existing documents in a major way
- 🚫 **Never do:** Modify code in `src/`, edit config files, commit secrets
```

When adding or updating an agent, ensure the description, responsibilities, and boundaries are clear and relevant to the project's tech stack and file structure.

## How to Run Tests

As an agent, you must use TDD (Test-Driven Development) to ensure your changes do not break existing functionality and that expected behavior is maintained. It is crucial to know how to run both backend and frontend tests.

Run, validate, and keep tests up to date whenever you make code changes. This helps guarantee the quality and stability of the project.

### Rails Tests (Minitest)
- Run the full suite:
  - `bundle exec rails test`
- Run a specific file:
  - `bundle exec rails test path/to/test_file.rb`

### Frontend Tests (Vitest)
- Run interactively:
  - `yarn test`
- Run once with coverage:
  - `yarn coverage`

> Note: The repository uses Minitest for the backend and Vitest for the frontend.

## File Structure (focus on `test`, `config`, `app/**`)

### `app/`
- `app/controllers/`  
  Rails controllers (routes → actions → rendering/props).
- `app/models/`  
  Active Record models and domain logic.
- `app/views/`  
  Rails views, including `*.json.props` files used by Superglue to assemble frontend data.
- `app/frontend/`  
  Frontend code (React/TypeScript, Vite):
  - `components/` UI components
  - `entrypoints/` Vite entry points
  - `hooks/`, `contexts/`, `slices/`, `utils/` for organizing logic

#### Important Note on `json.props`
The project uses `*.json.props` files (e.g., `app/views/layouts/application.json.props` and other views) to declare data sent to the frontend. When editing these files:
- maintain the structure expected by the frontend;
- follow the established `json.*` pattern;
- avoid breaking prop contracts without updating the frontend accordingly.

### `config/`
Rails application configuration.
Frequently relevant files:
- `config/routes.rb` — application routes
- `config/application.rb` — global configuration
- `config/environments/` — environment-specific configs
- `config/vite.json` — Vite integration
- `config/database.yml` — database configuration

### `test/`
Minitest tests for the backend.
Common structure:
- `test/models/`
- `test/controllers/`
- `test/fixtures/`
- `test/test_helper.rb` — base test suite configuration

## Quick Best Practices
- Prefer changing `app/**` and `test/**` together when modifying behavior.
- For prop API changes in `*.json.props`, update the frontend in `app/frontend/`.
- If adjusting routes or configs, validate with tests and/or `bin/dev`.

## Technologies Used

- **Backend:** Ruby on Rails, Minitest
- **Frontend:** React, TypeScript, Vite, Vitest
- **Styling:** Tailwind CSS
- **Other:** Superglue (for prop/data passing), GitHub Actions (for agents)

Always ensure you are following the conventions and leveraging the technologies present in the project. When in doubt, consult the relevant agent in `.github/agents/` for guidance on best practices for your current task.
