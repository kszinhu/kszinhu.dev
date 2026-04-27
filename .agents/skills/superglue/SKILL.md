name: superglue-patterns
description: Patterns and checklists for working with Superglue props, Operations and ViewModels in this repository. Use when adding or changing `*.json.props`, ViewModels, or when coordinating backend→frontend contracts.
allowed-tools: Read, Write, Edit, Bash

# Superglue Patterns (Skill)

Purpose
- Teach agents how Superglue is used in this project and provide repeatable TDD-first workflows for changing prop contracts or adding ViewModels/Operations.
- Make prop contracts explicit, testable and maintainable across backend and frontend.

Quick facts (repo-specific)
- The app uses Superglue to hydrate frontend React views with backend-provided props through `*.json.props` files.
- Frontend consumes props via `useContent<T>()` from `@thoughtbot/superglue`.
- Preferred structure:
  - Data loading / authorization -> Operations (place reusable logic in `app/superglue/operations`)
  - Formatting / computed fields -> ViewModels (place helpers in `app/superglue/view_models`)
  - Exposure -> `app/views/**/*.json.props` files that call operations/viewmodels and `json.<key>` the resulting data.

Core principles (must follow)
- TDD ALWAYS: Red → Green → Refactor. Tests must describe the expected prop contract before implementing it.
- Small explicit contracts: prefer simple arrays and objects with stable keys over ad-hoc nested structures.
- Single source of truth for global UI data (e.g., footer) unless pages intentionally vary the content.
- Keep business logic in models/services. Operations and ViewModels should orchestrate and format.
- Document contract changes and update frontend types (`useContent<T>()`) whenever props change.

File locations and responsibilities
- `app/superglue/operations/` — data fetching, authorization, heavy lifting. (Write here)
- `app/superglue/view_models/` — formatting and computed presentation values. (Write here)
- `app/views/**/*.json.props` — final exposure of props to the client (Write/Read).
- `app/frontend/` — frontend components that consume the props (Read; coordinate with frontend agents).
- `spec/` — RSpec tests for backend (view, operation, request specs).
- `app/frontend/.../*.test.tsx` — Vitest tests for frontend components.

When to add an Operation or ViewModel
- Create an Operation when:
  - Multiple views need the same data preparation.
  - Data loading requires multiple model calls or authorization checks.
- Create a ViewModel when:
  - Computed presentation logic is non-trivial (e.g., formatting dates, merging lists, sorting by priority).
  - You want to keep `*.json.props` files declarative and thin.

TDD-first workflow (backend)
1. RED
   - Add an RSpec example that renders the `*.json.props` file (view spec) or calls the Operation directly.
   - Assert the expected JSON structure (keys, types, minimal values).
   - Run `bundle exec rspec` and confirm the spec fails.
2. GREEN
   - Implement the Operation/ViewModel or update the `*.json.props` file to produce the shape required by the test.
   - Re-run `bundle exec rspec` until the tests pass.
3. REFACTOR
   - Clean code, extract helpers, keep tests unchanged to validate behavior.
   - Run linters and full test suite.
4. DOCUMENT
   - Update `AGENTS.md` or `docs/` describing the prop contract and where to find it.
   - If global/shared props changed, note plan for migration and add `requires-operator-review` label to the PR if breaking.

TDD-first workflow (frontend)
1. RED
   - Add a Vitest unit test for the component that consumes the props. Mock `useContent()` to return the intended contract.
   - Assert rendering, presence of labels, hrefs and `aria-label` for interactive elements.
   - Run `yarn test` and confirm failure.
2. GREEN
   - Implement or revise component code to satisfy the tests.
   - Add minimal defensive fallbacks for the absence of server props to make dev/test easier (but tests must assert actual expected prop behavior).
   - Re-run `yarn test` until green.
3. REFACTOR
   - Improve code structure, extract helpers, run linters and full frontend tests.

Testing checklist and examples
- Backend (RSpec) suggestions:
  - View spec that evaluates the `*.json.props` output. Example assertions:
    - `expect(json[:footer][:nav_links]).to be_an(Array)`
    - `expect(json[:footer][:social_links].first).to include(:name, :label, :href, :icon)`
  - Operation spec: instantiate an operation and assert returned Hash shape.
  - Request spec (if props are produced by controller path): call route and parse JSON payload used by Superglue to assert presence of keys.
- Frontend (Vitest) suggestions:
  - Unit test for `Footer`:
    - Mock `useContent()` to return `{ footer: { nav_links: [...], social_links: [...] } }`.
    - Assert nav links render with correct text and href.
    - Assert social buttons have required `aria-label` and link targets.
  - Test fallback behavior when `content.footer` is undefined.

Example: Footer (practical)
- Desired contract:
  - footer.nav_links: [{ label: string, href: string }]
  - footer.social_links: [{ name: string, label: string, href: string, icon?: string }]
  - footer.copy_right: string or `owner_name` + year
- Backend RSpec example (pseudocode):
  - Render `app/views/root/index.json.props` and parse `json`.
  - expect(json[:footer][:nav_links].first.keys).to include(:label, :href)
- Frontend Vitest example (pseudocode):
  - Mock `useContent()` to return desired footer.
  - Render `Footer` component and expect `screen.getByText('Home')` toBeInTheDocument() and social links to have `target="_blank"`.

Contract maintenance and coordination
- Always update TypeScript types used with `useContent<T>()` to reflect changes.
- When changing a global contract (breaking change), create a migration plan:
  - Deprecate keys and add new keys in parallel for one or more deploy cycles, or
  - Coordinate simultaneous deploys if both backend and frontend are changed in a single release with full test coverage.
- Add a short "contract note" to PR describing fields, types, pages affected, and any required frontend typing changes.

Documentation and doc artifacts
- When adding/modifying props:
  - Update `AGENTS.md` (root) with a short summary of the change and where to find the new contract.
  - Add a small doc in `docs/recipes/` (e.g., `docs/recipes/footer.md`) that contains:
    - Prop shape example (JSON)
    - Which view/layout provides it
    - Example consumption in frontend (TypeScript interface)
- If multiple `json.footer` definitions exist, add `docs/superglue/footer_matrix.md` that maps which views produce which footer variants.

Debugging tips
- If frontend doesn't receive expected props:
  - Confirm the `*.json.props` file executes for the rendered template path.
  - Ensure `application.json.props` or other layout-level props are not overriding or omitting keys.
  - Temporarily log values inside `*.json.props` (use `Rails.logger.debug`) for development only.
- When tests fail:
  - Reproduce the failing spec locally and inspect serialized JSON.
  - For frontend tests, ensure `useContent` is mocked consistently and that the component mounts with necessary context/providers.

PR checklist for Superglue changes
- [ ] RSpec tests added/updated and passing locally
- [ ] Vitest tests added/updated and passing locally
- [ ] Frontend TypeScript types for `useContent<T>()` updated
- [ ] Documentation updated (AGENTS.md, docs/recipes or inline comments)
- [ ] If breaking, PR includes migration plan and is labeled `requires-operator-review`
- [ ] Security checks and linter run before requesting merge

Final notes
- Prefer minimal, well-tested changes. Small, test-covered PRs are easier to review and safer to release.
- Keep prop shapes stable. When in doubt, add tests that codify the intended contract before changing code.