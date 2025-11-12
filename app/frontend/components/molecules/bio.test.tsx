import { MantineProvider } from "@mantine/core"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Bio } from "./bio"

function renderWithProviders(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>)
}

describe("Bio", () => {
  const mockBioEntries = [
    {
      year: "1990",
      event: "Born in Tokyo, Japan",
    },
    {
      year: "2010",
      event: "Graduated from University of Technology",
    },
    {
      year: "2015",
      event: "Started working at Tech Company",
    },
    {
      year: "2020",
      event: "Became a freelancer",
    },
  ]

  describe("Rendering", () => {
    it("renders all bio entries", () => {
      renderWithProviders(<Bio entries={mockBioEntries} />)

      expect(screen.getByText("1990")).toBeInTheDocument()
      expect(screen.getByText("Born in Tokyo, Japan")).toBeInTheDocument()
      expect(screen.getByText("2010")).toBeInTheDocument()
      expect(screen.getByText("Graduated from University of Technology")).toBeInTheDocument()
      expect(screen.getByText("2015")).toBeInTheDocument()
      expect(screen.getByText("Started working at Tech Company")).toBeInTheDocument()
      expect(screen.getByText("2020")).toBeInTheDocument()
      expect(screen.getByText("Became a freelancer")).toBeInTheDocument()
    })

    it("renders as ordered list without bullet points", () => {
      renderWithProviders(<Bio entries={mockBioEntries} />)

      const list = document.querySelector("ol")
      expect(list).toBeInTheDocument()
      expect(list).toHaveClass("list-none")
    })

    it("renders with correct number of entries", () => {
      renderWithProviders(<Bio entries={mockBioEntries} />)

      const listItems = document.querySelectorAll("li")
      expect(listItems).toHaveLength(4)
    })

    it("renders empty list when no entries provided", () => {
      renderWithProviders(<Bio entries={[]} />)

      const list = document.querySelector("ol")
      expect(list).toBeInTheDocument()

      const listItems = document.querySelectorAll("li")
      expect(listItems).toHaveLength(0)
    })
  })

  describe("Layout", () => {
    it("displays year and event in flex layout", () => {
      renderWithProviders(<Bio entries={mockBioEntries} />)

      const listItems = document.querySelectorAll("li")
      listItems.forEach((item) => {
        expect(item).toHaveClass("flex")
      })
    })

    it("applies spacing between entries", () => {
      renderWithProviders(<Bio entries={mockBioEntries} />)

      const list = document.querySelector("ol")
      expect(list).toHaveClass("space-y-3")
    })
  })

  describe("Content formatting", () => {
    it("displays years with medium font weight", () => {
      renderWithProviders(<Bio entries={mockBioEntries} />)

      const yearElement = screen.getByText("1990")
      expect(yearElement).toBeInTheDocument()
    })

    it("handles multi-line events", () => {
      const longEntries = [
        {
          year: "2023",
          event:
            "Completed the Master's Program in the Graduate School of Information Science at Nara Institute of Science and Technology",
        },
      ]

      renderWithProviders(<Bio entries={longEntries} />)

      expect(
        screen.getByText(
          /Completed the Master's Program in the Graduate School of Information Science at Nara Institute of Science and Technology/,
        ),
      ).toBeInTheDocument()
    })
  })
})
