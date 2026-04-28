import React, { ReactElement } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { MantineProvider } from "@mantine/core"
import { vi } from "vitest"

/**
 * Providers wrapper used by tests.
 * Keep this minimal — do not add unnecessary comments to production code.
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      {children}
    </MantineProvider>
  )
}

type CustomRenderOptions = Omit<RenderOptions, "wrapper">

/**
 * Utility to render components with the common providers used across the frontend tests.
 * Use this instead of importing MantineProvider in every test.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  return render(ui, { wrapper: Providers as React.ComponentType, ...options })
}

/**
 * Helper to mock Superglue's `useContent` hook.
 *
 * Usage in tests:
 *   import { mockUseContent } from "test_helpers/test-utils"
 *   mockUseContent({ footer: { ... } })
 *
 * Notes:
 * - `vi.mock` is used so the mock is registered with Vitest's module system.
 * - If you need to change the mock between tests, call `restoreUseContentMock()` first.
 */
export function mockUseContent(returnValue: unknown) {
  // Ensure modules are isolated when switching mocks
  try {
    // If an existing mock exists, unmock it first to avoid stale factories
    // (vi.unmock throws if no mock exists; guard with try/catch)
    vi.unmock("@thoughtbot/superglue")
  } catch {
    // ignore
  }

  vi.mock("@thoughtbot/superglue", () => {
    return {
      useContent: () => returnValue,
    }
  })
}

/**
 * Restore the original module behavior for `@thoughtbot/superglue`.
 * Call this between tests when you need to clear/mutate module mocks.
 */
export function restoreUseContentMock() {
  try {
    vi.unmock("@thoughtbot/superglue")
  } catch {
    // ignore
  }
}

export * from "@testing-library/react"
export { render }
