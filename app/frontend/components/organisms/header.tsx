import { Burger, Button } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import * as TablerIcons from "@tabler/icons-react"
import type React from "react"
import { useEffect, useState } from "react"

interface MenuItem {
  label: string
  href: string
  icon?: string
}

interface HeaderProps {
  menuItems?: Array<MenuItem>
}

export const Header: React.FC<HeaderProps> = ({ menuItems = [] }) => {
  const [opened, { toggle }] = useDisclosure(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  // Detect active page based on current URL
  useEffect(() => {
    const currentPath = window.location.pathname
    const activeIdx = menuItems.findIndex((item) => {
      // Exact match or if current path starts with the menu item href (for nested routes)
      return currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href))
    })
    if (activeIdx !== -1) {
      setActiveIndex(activeIdx)
    }
  }, [menuItems])

  const getIcon = (iconName?: string) => {
    if (!iconName) return null
    const Icon = (TablerIcons as any)[iconName]
    return Icon ? <Icon size={18} /> : null
  }

  return (
    <header className="flex items-center justify-center py-4 bg-transparent">
      <div className="flex flex-col gap-4 w-full max-w-7xl px-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex grow shrink-0 items-center gap-2 after:content-[''] after:flex-1 after:h-[1em] after:bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,var(--mantine-primary-color-9)_4px,var(--mantine-primary-color-9)_8px)]">
            <a href="/" className="text-xl font-bold uppercase">
              KS
            </a>
          </div>

          {menuItems.length > 0 && (
            <>
              <div className="md:hidden">
                <Burger
                  opened={opened}
                  onClick={toggle}
                  aria-label="Toggle menu"
                  className="ml-1 shrink-0"
                />
              </div>

              <nav className="hidden md:block">
                <div className="flex items-center gap-2">
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      component="a"
                      href={item.href}
                      variant={activeIndex === index ? "filled" : "subtle"}
                      color={activeIndex === index ? "red" : "gray"}
                      leftSection={getIcon(item.icon)}
                      size="sm"
                      styles={
                        activeIndex === index
                          ? {
                              root: {
                                backgroundColor: "var(--color-primary)",
                              },
                            }
                          : undefined
                      }
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </nav>
            </>
          )}
        </div>

        {/* Mobile Menu Area (below header row) */}
        {menuItems.length > 0 && (
          <div
            className={`w-full md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              opened ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-2 p-3 bg-[rgba(26,27,30,0.95)] backdrop-blur-sm border border-white/10 rounded-lg">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  component="a"
                  href={item.href}
                  variant={activeIndex === index ? "filled" : "subtle"}
                  leftSection={getIcon(item.icon)}
                  justify="flex-start"
                  fullWidth
                  onClick={() => setActiveIndex(index)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
