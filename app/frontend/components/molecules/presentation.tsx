import useCyclingText from "@javascript/hooks/use-cycling-text"
import type { PropsWithChildren } from "react"

const TITLE_CYCLE_SPEED = 2000
const SPINNER_SPEED = 200
const SPINNER_CHARS = ["-", "\\", "|", "/"] as const

interface PresentationProps {
  name: string
  subtitle: string
  titles: string[]
}

export function Presentation({ name, subtitle, titles }: PresentationProps) {
  return (
    <div className="space-y-2">
      <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
        {name}
      </h1>
      <div
        className="text-lg font-medium text-muted-foreground flex justify-center items-center"
        aria-live="polite"
      >
        <CycleTitle titles={titles}>
          <Spinner />
        </CycleTitle>
      </div>
      <p className="text-sm text-muted-foreground max-w-xl mx-auto text-pretty">{subtitle}</p>
    </div>
  )
}

interface CycleTitleProps {
  titles: string[]
}

function CycleTitle({ children, titles }: PropsWithChildren<CycleTitleProps>) {
  const title = useCyclingText({
    texts: titles,
    speed: TITLE_CYCLE_SPEED,
    effect: "typewriter",
  })

  return (
    <span className="w-fit font-mono bg-linear-to-r from-primary/10 to-accent/10">
      [{title}]{children}
    </span>
  )
}

function Spinner() {
  const spinner = useCyclingText({
    texts: SPINNER_CHARS as unknown as string[],
    speed: SPINNER_SPEED,
  })

  return (
    <output className="inline-block animate-pulse ml-1" aria-label="Loading">
      {spinner}
    </output>
  )
}
