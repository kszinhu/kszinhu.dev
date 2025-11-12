import { MantineProvider } from "@mantine/core"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Header } from "./header"
import "@testing-library/jest-dom"

const renderWithMantine = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>)
}

describe("Header", () => {
  const mockMenuItems = [
    { label: "Home", href: "/", icon: "IconHome" },
    { label: "Blog", href: "/posts", icon: "IconBook" },
    { label: "About", href: "/about" },
  ]

  it("renders the logo correctly", () => {
    renderWithMantine(<Header />)
    expect(screen.getByText("KS")).toBeInTheDocument()
  })

  it("renders the logo as a link to home", () => {
    renderWithMantine(<Header />)
    const logoLink = screen.getByRole("link", { name: /KS/i })
    expect(logoLink).toHaveAttribute("href", "/")
  })

  it("does not render menu when menuItems is empty", () => {
    renderWithMantine(<Header menuItems={[]} />)
    expect(screen.queryByLabelText("Toggle menu")).not.toBeInTheDocument()
  })

  it("renders mobile menu burger button when menuItems are provided", () => {
    renderWithMantine(<Header menuItems={mockMenuItems} />)
    const burger = screen.getByLabelText("Toggle menu")
    expect(burger).toBeInTheDocument()
  })

  it("renders desktop navigation links", () => {
    const { container } = renderWithMantine(<Header menuItems={mockMenuItems} />)

    const desktopNav = container.querySelector("nav.hidden.md\\:block")
    expect(desktopNav).toBeInTheDocument()

    const allLinks = screen.getAllByRole("link")
    const homeLinks = allLinks.filter((link) => link.textContent === "Home")
    const blogLinks = allLinks.filter((link) => link.textContent === "Blog")
    const aboutLinks = allLinks.filter((link) => link.textContent === "About")

    expect(homeLinks.length).toBeGreaterThanOrEqual(1)
    expect(blogLinks.length).toBeGreaterThanOrEqual(1)
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1)
  })

  it("renders correct hrefs for menu items", () => {
    renderWithMantine(<Header menuItems={mockMenuItems} />)

    const allLinks = screen.getAllByRole("link")
    const homeLinks = allLinks.filter((link) => link.textContent === "Home")
    const blogLinks = allLinks.filter((link) => link.textContent === "Blog")
    const aboutLinks = allLinks.filter((link) => link.textContent === "About")

    expect(homeLinks.some((link) => link.getAttribute("href") === "/")).toBe(true)
    expect(blogLinks.some((link) => link.getAttribute("href") === "/posts")).toBe(true)
    expect(aboutLinks.some((link) => link.getAttribute("href") === "/about")).toBe(true)
  })

  it("burger button has correct accessibility attributes", () => {
    renderWithMantine(<Header menuItems={mockMenuItems} />)

    const burger = screen.getByLabelText("Toggle menu")
    expect(burger).toHaveAttribute("type", "button")
  })

  it("burger button toggles opened state when clicked", async () => {
    const user = userEvent.setup()
    const { container } = renderWithMantine(<Header menuItems={mockMenuItems} />)

    const burger = screen.getByLabelText("Toggle menu")
    const mobileMenu = container.querySelector(".w-full.overflow-hidden.transition-all")

    expect(mobileMenu).toHaveClass("max-h-0")
    expect(mobileMenu).toHaveClass("opacity-0")

    await user.click(burger)
    expect(mobileMenu).toHaveClass("max-h-96")
    expect(mobileMenu).toHaveClass("opacity-100")

    await user.click(burger)
    expect(mobileMenu).toHaveClass("max-h-0")
    expect(mobileMenu).toHaveClass("opacity-0")
  })

  it("renders Menu component in mobile view", () => {
    const { container } = renderWithMantine(<Header menuItems={mockMenuItems} />)

    const burger = screen.getByLabelText("Toggle menu")
    expect(burger).toBeInTheDocument()

    const mobileContainer = container.querySelector(".md\\:hidden")
    expect(mobileContainer).toBeInTheDocument()
  })

  it("renders with default empty menuItems when prop is not provided", () => {
    renderWithMantine(<Header />)
    expect(screen.queryByLabelText("Toggle menu")).not.toBeInTheDocument()
  })

  it("handles single menu item correctly", () => {
    const singleItem = [{ label: "Home", href: "/", icon: "IconHome" }]
    renderWithMantine(<Header menuItems={singleItem} />)

    const homeLinks = screen.getAllByRole("link", { name: /Home/i })
    expect(homeLinks.length).toBeGreaterThanOrEqual(1)
  })

  it("applies correct CSS classes for responsive behavior", () => {
    const { container } = renderWithMantine(<Header menuItems={mockMenuItems} />)

    const mobileMenuContainer = container.querySelector(".md\\:hidden")
    expect(mobileMenuContainer).toBeInTheDocument()

    const desktopNav = container.querySelector("nav.hidden.md\\:block")
    expect(desktopNav).toBeInTheDocument()
  })
})
