import { createContext, type ReactNode, useContext, useState } from "react"

interface LayoutContextType {
  layout: "base" | "dashboard" | "public" | "auth"
  setLayout: (layout: LayoutContextType["layout"]) => void
  layoutProps: Record<string, any>
  setLayoutProps: (props: Record<string, any>) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayout] = useState<LayoutContextType["layout"]>("base")
  const [layoutProps, setLayoutProps] = useState<Record<string, any>>({})

  return (
    <LayoutContext.Provider value={{ layout, setLayout, layoutProps, setLayoutProps }}>
      {children}
    </LayoutContext.Provider>
  )
}
