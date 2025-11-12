import { Button, Menu } from "@mantine/core"
import { IconLanguage } from "@tabler/icons-react"
import { changeLocale, getCurrentLocale } from "../../utils/locale"

interface LocaleSwitcherProps {
  variant?: "default" | "subtle" | "filled" | "outline"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

/**
 * Component for switching between available locales
 * Uses query parameters to change the locale and reloads the page
 */
export function LocaleSwitcher({ variant = "subtle", size = "sm" }: LocaleSwitcherProps) {
  const currentLocale = getCurrentLocale()

  const locales = [
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ] as const

  const getCurrentLocaleLabel = () => {
    const locale = locales.find((l) => currentLocale.startsWith(l.code))
    return locale ? `${locale.flag} ${locale.label}` : "🌐 Language"
  }

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Button
          variant={variant}
          size={size}
          leftSection={<IconLanguage size={16} />}
          aria-label="Change language"
        >
          {getCurrentLocaleLabel()}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Select Language</Menu.Label>
        {locales.map((locale) => (
          <Menu.Item
            key={locale.code}
            onClick={() => changeLocale(locale.code)}
            leftSection={<span>{locale.flag}</span>}
            disabled={currentLocale.startsWith(locale.code)}
          >
            {locale.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
