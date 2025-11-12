import { BaseLayout } from "@javascript/components"
import type { ComponentType } from "react"

interface LayoutConfig {
  showHeader?: boolean
  showSidebar?: boolean
  containerSize?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

export function withLayout<P extends object>(
  Component: ComponentType<P>,
  layoutConfig: LayoutConfig = {},
) {
  return function LayoutWrappedComponent(props: P) {
    return (
      <BaseLayout {...layoutConfig}>
        <Component {...props} />
      </BaseLayout>
    )
  }
}
