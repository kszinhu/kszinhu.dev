import { AppShell, Container, Title } from "@mantine/core"
import { useHeadroom } from "@mantine/hooks"
import { useContent } from "@thoughtbot/superglue"
import type { ReactNode } from "react"
import { useAppSelector } from "../store"

interface BaseLayoutProps {
  children: ReactNode
  currentTab?: string
  showHeader?: boolean
  showSidebar?: boolean
  containerSize?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

export const BaseLayout = ({
  children,
  currentTab,
  showHeader = true,
  showSidebar = false,
  containerSize = "lg",
  className = "",
}: BaseLayoutProps) => {
  const flash = useAppSelector((state) => state.flash)
  const pinned = useHeadroom({ fixedAt: 120 })

  return (
    <AppShell
      header={{
        height: showHeader ? 60 : 0,
        collapsed: !pinned,
      }}
      navbar={{ width: showSidebar ? 300 : 0, breakpoint: "sm" }}
      padding="md"
    >
      {showHeader && (
        <AppShell.Header className="!bg-transparent backdrop-blur-sm border-b border-gray-200">
          <Container size={containerSize} className="bg-transparent">
            {currentTab && <Title order={1}>{currentTab}</Title>}
          </Container>
        </AppShell.Header>
      )}

      {showSidebar && <AppShell.Navbar>{/* Sidebar content */}</AppShell.Navbar>}

      <AppShell.Main>
        {/* Flash Messages */}
        {flash.success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {flash.success}
          </div>
        )}
        {flash.error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {flash.error}
          </div>
        )}

        <Container size={containerSize} className={className}>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

interface DashboardLayoutProps extends BaseLayoutProps {}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <BaseLayout showHeader={true} showSidebar={true} containerSize="xl">
      <div className="flex gap-6">
        <aside className="w-64">
          {/* Dashboard Sidebar content */}
          <nav>
            <ul>
              <li className="mb-2">
                <a href="/dashboard" className="text-blue-500 hover:underline">
                  Dashboard Home
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </BaseLayout>
  )
}

interface PublicLayoutProps extends BaseLayoutProps {}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <BaseLayout showHeader={true} showSidebar={false}>
      {children}
    </BaseLayout>
  )
}

interface SmartLayoutProps {
  children: ReactNode
  currentTab?: string
}

interface LayoutConfig {
  type: "base" | "dashboard" | "public"
  showHeader?: boolean
  showSidebar?: boolean
  containerSize?: "xs" | "sm" | "md" | "lg" | "xl"
}

export const SmartLayout = ({ children, currentTab }: SmartLayoutProps) => {
  const content = useContent<{ layout?: LayoutConfig }>()
  const layoutConfig = content.layout || { type: "base" }

  console.log("Layout Config:", layoutConfig)

  const renderLayout = () => {
    switch (layoutConfig.type) {
      case "dashboard":
        return <DashboardLayout currentTab={currentTab}>{children}</DashboardLayout>
      case "public":
        return <PublicLayout currentTab={currentTab}>{children}</PublicLayout>
      default:
        return (
          <BaseLayout currentTab={currentTab} {...layoutConfig}>
            {children}
          </BaseLayout>
        )
    }
  }

  return renderLayout()
}
