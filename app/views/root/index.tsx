import { Header, Presentation } from "@javascript/components"
import { Bio } from "@javascript/components/molecules/bio"
import { WorkExperiences } from "@javascript/components/molecules/work-experiences"
import { Button } from "@mantine/core"
import { IconBrandGithub, IconBrandLinkedin, IconFileText } from "@tabler/icons-react"
import { useContent } from "@thoughtbot/superglue"

interface RootIndexProps {
  header: {
    name: string
    subtitle: string
    short_bio: string
    titles: string[]
    links: {
      github: string
      linkedin: string
      resume: { url: string; label: string }
    }
  }
  bio: {
    year: string
    event: string
  }[]
  navigation: {
    menu_items: Array<{
      label: string
      href: string
      icon?: string
    }>
  }
  cards: {
    techstack: { title: string; technologies: string }[]
    works_experiences: {
      company_name: string
      company_url: string
      company_image_url: string
      roles: {
        title: string
        period: [string, string | null]
        duration_text: string
        description?: string
      }[]
    }[]
  }
}

export default function RootIndex() {
  const {
    header: { name, titles, subtitle, short_bio: shortBio, links },
    bio,
    navigation: { menu_items: menuItems },
    cards: { works_experiences: worksExperiences },
  } = useContent<RootIndexProps>()

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Header menuItems={menuItems} />
      <div className="flex lg:items-center flex-1">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
          <section className="text-center mb-8 md:mb-12 space-y-4 transform transition-all duration-700 ease-out translate-y-0 opacity-100">
            <Presentation name={name} titles={titles} subtitle={subtitle} />
            <p className="text-sm text-muted-foreground max-w-xl mx-auto text-pretty">{shortBio}</p>
            <div className="flex flex-wrap gap-3 md:gap-5 justify-center items-center [&_a]:hover:scale-105 [&_a]:transition-transform [&_a]:duration-200">
              <Button
                variant="outline"
                size="xs"
                component="a"
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandGithub className="size-4 mr-1 md:mr-2" /> GitHub
              </Button>
              <Button
                variant="outline"
                size="xs"
                component="a"
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandLinkedin className="size-4 mr-1 md:mr-2" /> LinkedIn
              </Button>
              <Button
                variant="outline"
                size="xs"
                component="a"
                href={links.resume.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconFileText className="size-4 mr-1 md:mr-2" />
                {links.resume.label}
              </Button>
            </div>
          </section>
          <div className="md:hidden mt-8">
            <Bio entries={bio} />
          </div>
          <ul className="hidden md:grid grid-cols-3 grid-rows-2 gap-6 transform transition-all duration-700 ease-out translate-y-0 opacity-100">
            {/* Future content cards can be placed here */}
            <WorkExperiences experiences={worksExperiences} />
          </ul>
        </div>
      </div>
    </div>
  )
}
