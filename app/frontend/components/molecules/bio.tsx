import { Text } from "@mantine/core"

interface BioProps {
  entries: {
    year: string
    event: string
  }[]
}

export function Bio({ entries }: BioProps) {
  return (
    <ol className="space-y-3 list-none p-0 m-0">
      {entries.map((entry) => (
        <li key={`${entry.year}-${entry.event}`} className="flex gap-3">
          <Text size="sm" fw={500} className="shrink-0 min-w-[3rem]">
            {entry.year}
          </Text>
          <Text size="sm" className="text-muted-foreground">
            {entry.event}
          </Text>
        </li>
      ))}
    </ol>
  )
}
