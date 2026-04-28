import { MantineProvider } from "@mantine/core"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { WorkExperiences } from "./work-experiences"

const mockUseLocale = vi.fn(() => "en-US")
vi.mock("@javascript/hooks/use-locale", () => ({
  useLocale: () => mockUseLocale(),
}))

import { renderWithProviders } from "@javascript/test_helpers/test-utils"

describe("WorkExperiences", () => {
  const mockExperiences = [
    {
      company_name: "Tech Corp",
      company_url: "https://techcorp.com",
      company_image_url: "https://example.com/techcorp.png",
      roles: [
        {
          title: "Senior Developer",
          period: ["2023-01-01", null] as [string, string | null],
          duration_text: "1 year",
          description: "- Leading development\n- Code reviews\n- Mentoring",
        },
        {
          title: "Developer",
          period: ["2022-01-01", "2023-01-01"] as [string, string | null],
          duration_text: "1 year",
        },
      ],
    },
    {
      company_name: "StartupXYZ",
      company_url: "https://startupxyz.com",
      company_image_url: "https://example.com/startup.png",
      roles: [
        {
          title: "Frontend Developer",
          period: ["2021-06-01", "2022-01-01"] as [string, string | null],
          duration_text: "7 months",
          description: "Building amazing UIs",
        },
      ],
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseLocale.mockReturnValue("en-US")
  })

  describe("Timeline display", () => {
    it("displays all companies in timeline", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      expect(screen.getByText("Tech Corp")).toBeInTheDocument()
      expect(screen.getByText("StartupXYZ")).toBeInTheDocument()
    })

    it("displays all job roles", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      expect(screen.getByText("Senior Developer")).toBeInTheDocument()
      expect(screen.getByText("Developer")).toBeInTheDocument()
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument()
    })

    it("renders timeline with empty experiences", () => {
      renderWithProviders(<WorkExperiences experiences={[]} />)

      const timeline = document.querySelector('[class*="Timeline-root"]')
      expect(timeline).toBeInTheDocument()
    })

    it("sorts companies by most recent date first", () => {
      const experiences = [
        {
          company_name: "Old Company",
          company_url: "https://old.com",
          company_image_url: "https://example.com/old.png",
          roles: [
            {
              title: "Developer",
              period: ["2020-01-01", "2021-01-01"] as [string, string | null],
              duration_text: "1 year",
            },
          ],
        },
        {
          company_name: "New Company",
          company_url: "https://new.com",
          company_image_url: "https://example.com/new.png",
          roles: [
            {
              title: "Senior Developer",
              period: ["2023-01-01", null] as [string, string | null],
              duration_text: "1 year",
            },
          ],
        },
      ]

      renderWithProviders(<WorkExperiences experiences={experiences} />)

      const companyLinks = screen.getAllByRole("link")
      expect(companyLinks[0]).toHaveTextContent("New Company")
      expect(companyLinks[1]).toHaveTextContent("Old Company")
    })
  })

  describe("Company information links", () => {
    it("creates external links to company websites", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const techCorpLink = screen.getByRole("link", { name: "Tech Corp" })
      expect(techCorpLink).toHaveAttribute("href", "https://techcorp.com")
      expect(techCorpLink).toHaveAttribute("target", "_blank")
      expect(techCorpLink).toHaveAttribute("rel", "noopener noreferrer")

      const startupLink = screen.getByRole("link", { name: "StartupXYZ" })
      expect(startupLink).toHaveAttribute("href", "https://startupxyz.com")
    })

    it("displays company logos with descriptive alt text", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const avatars = screen.getAllByRole("img")
      expect(avatars).toHaveLength(2)
      expect(avatars[0]).toHaveAttribute("alt", "Tech Corp")
      expect(avatars[0]).toHaveAttribute("src", "https://example.com/techcorp.png")
    })
  })

  describe("Date and duration formatting", () => {
    it("shows Present for ongoing positions in English", () => {
      mockUseLocale.mockReturnValue("en-US")

      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      expect(screen.getByText(/Present/)).toBeInTheDocument()
      expect(screen.getAllByText(/1 year/).length).toBeGreaterThan(0)
    })

    it("shows Presente for ongoing positions in Portuguese", () => {
      mockUseLocale.mockReturnValue("pt-BR")

      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      expect(screen.getByText(/Presente/)).toBeInTheDocument()
    })

    it("displays start and end dates for completed positions", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const developerRole = screen.getByText("Developer")
      expect(developerRole).toBeInTheDocument()

      const allText = document.body.textContent || ""
      expect(allText).toContain("2021")
      expect(allText).toContain("2022")
      expect(allText).toContain("Jun 2021 - Jan 2022")
    })

    it("formats dates according to browser locale", () => {
      mockUseLocale.mockReturnValue("pt-BR")

      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const dateElements = screen.getAllByText(/\d{4}/)
      expect(dateElements.length).toBeGreaterThan(0)
    })

    it("displays duration text with date ranges", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      expect(screen.getAllByText(/1 year/)[0]).toBeInTheDocument()
      expect(screen.getByText(/7 months/)).toBeInTheDocument()
    })

    it("handles null end dates as current positions", () => {
      const experiences = [
        {
          company_name: "Current Company",
          company_url: "https://current.com",
          company_image_url: "https://example.com/current.png",
          roles: [
            {
              title: "Current Role",
              period: ["2023-01-01", null] as [string, string | null],
              duration_text: "1 year 3 months",
            },
          ],
        },
      ]

      renderWithProviders(<WorkExperiences experiences={experiences} />)

      expect(screen.getByText(/Present/)).toBeInTheDocument()
    })
  })

  describe("Description toggle functionality", () => {
    it("shows expand button when description exists", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const showMoreButtons = screen.getAllByRole("button", {
        name: /Show more/i,
      })
      expect(showMoreButtons.length).toBeGreaterThan(0)
    })

    it("hides expand button when description is missing", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const developerSection = screen.getByText("Developer").closest("div")

      expect(developerSection).toBeInTheDocument()

      const buttons = screen.getAllByRole("button")
      const developerButtons = buttons.filter((button) => developerSection?.contains(button))

      expect(developerButtons.length).toBe(0)
    })

    it("expands and collapses description on button click", async () => {
      const user = userEvent.setup()
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const showMoreButton = screen.getAllByRole("button", {
        name: /Show more/i,
      })[0]

      await user.click(showMoreButton)

      expect(screen.getByText(/Leading development/)).toBeInTheDocument()

      expect(screen.getAllByRole("button", { name: /Show less/i })[0]).toBeInTheDocument()
    })

    it("displays bullet points from description", async () => {
      const user = userEvent.setup()
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const showMoreButton = screen.getAllByRole("button", {
        name: /Show more/i,
      })[0]

      await user.click(showMoreButton)

      expect(screen.getByText(/Leading development/)).toBeInTheDocument()
      expect(screen.getByText(/Code reviews/)).toBeInTheDocument()
      expect(screen.getByText(/Mentoring/)).toBeInTheDocument()
    })

    it("displays non-bullet text as paragraphs", async () => {
      const user = userEvent.setup()
      const experiences = [
        {
          company_name: "Test Company",
          company_url: "https://test.com",
          company_image_url: "https://example.com/test.png",
          roles: [
            {
              title: "Developer",
              period: ["2023-01-01", null] as [string, string | null],
              duration_text: "1 year",
              description: "This is a regular paragraph\n- This is a bullet\nAnother paragraph",
            },
          ],
        },
      ]

      renderWithProviders(<WorkExperiences experiences={experiences} />)

      const showMoreButton = screen.getByRole("button", { name: /Show more/i })
      await user.click(showMoreButton)

      expect(screen.getByText(/This is a regular paragraph/)).toBeInTheDocument()
      expect(screen.getByText(/This is a bullet/)).toBeInTheDocument()
      expect(screen.getByText(/Another paragraph/)).toBeInTheDocument()
    })

    it("supports multiple bullet point formats", async () => {
      const user = userEvent.setup()
      const experiences = [
        {
          company_name: "Test Company",
          company_url: "https://test.com",
          company_image_url: "https://example.com/test.png",
          roles: [
            {
              title: "Developer",
              period: ["2023-01-01", null] as [string, string | null],
              duration_text: "1 year",
              description: "- Dash bullet\n• Circle bullet\n* Star bullet",
            },
          ],
        },
      ]

      renderWithProviders(<WorkExperiences experiences={experiences} />)

      const showMoreButton = screen.getByRole("button", { name: /Show more/i })
      await user.click(showMoreButton)

      expect(screen.getByText(/Dash bullet/)).toBeInTheDocument()
      expect(screen.getByText(/Circle bullet/)).toBeInTheDocument()
      expect(screen.getByText(/Star bullet/)).toBeInTheDocument()
    })
  })

  describe("Multiple roles handling", () => {
    it("displays all roles for companies with multiple positions", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      expect(screen.getByText("Senior Developer")).toBeInTheDocument()
      expect(screen.getByText("Developer")).toBeInTheDocument()
    })

    it("handles empty description strings", () => {
      const experiences = [
        {
          company_name: "Test Company",
          company_url: "https://test.com",
          company_image_url: "https://example.com/test.png",
          roles: [
            {
              title: "Developer",
              period: ["2023-01-01", null] as [string, string | null],
              duration_text: "1 year",
              description: "",
            },
          ],
        },
      ]

      renderWithProviders(<WorkExperiences experiences={experiences} />)

      expect(screen.queryByRole("button", { name: /Show more/i })).not.toBeInTheDocument()
    })

    it("renders toggle button for whitespace-only descriptions", () => {
      const experiences = [
        {
          company_name: "Test Company",
          company_url: "https://test.com",
          company_image_url: "https://example.com/test.png",
          roles: [
            {
              title: "Developer",
              period: ["2023-01-01", null] as [string, string | null],
              duration_text: "1 year",
              description: "   \n   \n   ",
            },
          ],
        },
      ]

      renderWithProviders(<WorkExperiences experiences={experiences} />)

      expect(screen.getByRole("button", { name: /Show more/i })).toBeInTheDocument()
    })
  })

  describe("Accessibility compliance", () => {
    it("provides accessible names for all links", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const links = screen.getAllByRole("link")
      links.forEach((link) => {
        expect(link).toHaveAccessibleName()
      })
    })

    it("provides alt text for all images", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const images = screen.getAllByRole("img")
      images.forEach((image) => {
        expect(image).toHaveAttribute("alt")
      })
    })

    it("provides accessible names for all buttons", () => {
      renderWithProviders(<WorkExperiences experiences={mockExperiences} />)

      const buttons = screen.getAllByRole("button")
      buttons.forEach((button) => {
        expect(button).toHaveAccessibleName()
      })
    })
  })
})
