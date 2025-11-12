import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Presentation } from "./presentation"

vi.mock("@javascript/hooks/use-cycling-text", () => ({
  default: vi.fn(({ texts }) => texts[0] || ""),
}))

describe("Presentation", () => {
  const defaultProps = {
    name: "Cassiano Rodrigues",
    subtitle: "Tech Influencer inspired by gugard tech",
    titles: ["Developer", "Designer", "Creator"],
  }

  it("renders the name correctly", () => {
    render(<Presentation {...defaultProps} />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Cassiano Rodrigues")
  })

  it("renders the subtitle correctly", () => {
    render(<Presentation {...defaultProps} subtitle="Software Engineer from Brazil" />)
    expect(screen.getByText("Software Engineer from Brazil")).toBeInTheDocument()
  })

  it("renders the cycling title with correct aria-label", () => {
    render(<Presentation {...defaultProps} />)

    const cyclingElement = screen.getByLabelText(/Current role cycling through different titles/)
    expect(cyclingElement).toBeInTheDocument()
  })

  it("renders the first title from the titles array", () => {
    render(<Presentation {...defaultProps} titles={["Full-stack Developer"]} />)
    expect(screen.getByText(/Full-stack Developer/)).toBeInTheDocument()
  })

  it("renders the spinner with loading status", () => {
    render(<Presentation {...defaultProps} />)
    const spinner = screen.getByRole("status")
    expect(spinner).toHaveAttribute("aria-label", "Loading")
  })
})
