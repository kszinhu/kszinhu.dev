import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { MantineProvider } from "@mantine/core"
import "@testing-library/jest-dom"

const mockFooter = {
  nav_links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  social_links: [
    {
      name: "twitter",
      label: "Twitter",
      href: "https://twitter.com/kch0w1",
      icon: "IconBrandTwitter",
    },
    {
      name: "github",
      label: "GitHub",
      href: "https://github.com/kszinhu",
      icon: "IconBrandGithub",
    },
  ],
  owner_name: "Test Owner",
  copy_right: "© 2025 Test Owner",
}

vi.mock("@thoughtbot/superglue", () => ({
  useContent: vi.fn(() => ({ footer: mockFooter })),
}))

import { Footer } from "../footer"

const renderWithProviders = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>)

describe("Footer", () => {
  it("renders navigation links with correct hrefs", () => {
    renderWithProviders(<Footer />)

    const homeLink = screen.getByText("Home")
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.closest("a")).toHaveAttribute("href", "/")

    const aboutLink = screen.getByText("About")
    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink.closest("a")).toHaveAttribute("href", "/about")
  })

  it("renders social buttons with aria-label and opens in new tab", () => {
    renderWithProviders(<Footer />)

    const twitter = screen.getByLabelText("Twitter")
    expect(twitter).toBeInTheDocument()
    expect(twitter).toHaveAttribute("href", "https://twitter.com/kch0w1")
    expect(twitter).toHaveAttribute("target", "_blank")

    const github = screen.getByLabelText("GitHub")
    expect(github).toBeInTheDocument()
    expect(github).toHaveAttribute("href", "https://github.com/kszinhu")
    expect(github).toHaveAttribute("target", "_blank")
  })

  it("displays copy_right text when provided", () => {
    renderWithProviders(<Footer />)

    expect(screen.getByText("© 2025 Test Owner")).toBeInTheDocument()
  })
})
