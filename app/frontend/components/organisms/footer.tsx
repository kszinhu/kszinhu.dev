import * as TablerIcons from "@tabler/icons-react"
import { Button } from "@mantine/core"
import type React from "react"
import { useContent } from "@thoughtbot/superglue"

interface NavLink {
  label: string
  href: string
}

interface SocialLink {
  name: string
  label?: string
  href: string
  icon?: string
  aria_label?: string
}

interface FooterProps {
  nav_links: NavLink[]
  social_links: SocialLink[]
  owner_name: string
  copy_right: string
}

export const Footer: React.FC = () => {
  const content = useContent<{ footer: FooterProps }>()
  const { nav_links: navLinks, social_links: socials, copy_right: copyRightText } = content.footer

  const getIcon = (iconName?: string) => {
    if (!iconName) return null
    const Icon = (TablerIcons as any)[iconName]
    return Icon ? <Icon size={18} /> : null
  }

  return (
    <footer className="text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <nav className="flex flex-wrap justify-center gap-6 mb-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex justify-center gap-4 mb-6">
          {socials.map((s) => (
            <Button
              component="a"
              key={s.name}
              href={s.href}
              aria-label={s.aria_label || s.label || s.name}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              size="icon"
            >
              {getIcon(s.icon)}
            </Button>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">{copyRightText}</div>
      </div>
    </footer>
  )
}

export default Footer
