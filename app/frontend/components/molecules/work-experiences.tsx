import { Anchor, Avatar, Button, Collapse, Text, Timeline } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { useLocale } from "../../hooks/use-locale"

type PeriodDate = [string, string | null]

interface WorkExperiencesProps {
  experiences: {
    company_name: string
    company_url: string
    company_image_url: string
    roles: {
      title: string
      period: PeriodDate
      duration_text: string
      description?: string
    }[]
  }[]
}

export function WorkExperiences({ experiences }: WorkExperiencesProps) {
  const sortedExperiences = experiences.sort((a, b) => {
    const dateA = new Date(a.roles[0].period[0])
    const dateB = new Date(b.roles[0].period[0])
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <Timeline
      active={sortedExperiences.length}
      bulletSize={56}
      lineWidth={2}
      className="col-span-2"
    >
      {sortedExperiences.map(({ company_name, company_image_url, company_url, roles }, index) => (
        <Timeline.Item
          key={index}
          bullet={<Avatar src={company_image_url} alt={company_name} size="lg" radius="md" />}
          title={
            <Anchor href={company_url} target="_blank" rel="noopener noreferrer" fw={500} size="lg">
              {company_name}
            </Anchor>
          }
        >
          <div className="space-y-3 mt-2">
            {roles.map((role, roleIndex) => (
              <RoleItem key={roleIndex} role={role} />
            ))}
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

function RoleItem({
  role,
}: {
  role: {
    title: string
    period: PeriodDate
    duration_text: string
    description?: string
  }
}) {
  const [opened, { toggle }] = useDisclosure(false)
  const locale = useLocale()
  const showMoreText = locale.startsWith("pt") ? "Ver mais" : "Show more"
  const showLessText = locale.startsWith("pt") ? "Ver menos" : "Show less"

  return (
    <div className="space-y-2">
      <div>
        <Text fw={500} size="md">
          {role.title}
        </Text>
        <Text size="sm" c="dimmed">
          <ExperiencePeriod period={role.period} durationText={role.duration_text} />
        </Text>
      </div>

      {role.description && (
        <>
          <Collapse in={opened}>
            <div className="space-y-2">
              <RoleDescription description={role.description} />
            </div>
          </Collapse>
          <Button
            variant="subtle"
            size="compact-xs"
            onClick={toggle}
            rightSection={opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
          >
            {opened ? showLessText : showMoreText}
          </Button>
        </>
      )}
    </div>
  )
}

function RoleDescription({ description }: { description: string }) {
  return (
    <div className="space-y-2">
      {description.split("\n").map((line, index) => {
        const trimmedLine = line.trim()
        if (!trimmedLine) return null

        const isBulletPoint = /^[-•*]/.test(trimmedLine)
        const cleanedLine = trimmedLine.replace(/^[-•*]\s*/, "")

        if (isBulletPoint) {
          return (
            <li key={index}>
              <Text size="sm" className="text-muted-foreground">
                {cleanedLine}
              </Text>
            </li>
          )
        }

        return (
          <Text key={index} size="sm" className="text-muted-foreground">
            {trimmedLine}
          </Text>
        )
      })}
    </div>
  )
}

function ExperiencePeriod({ period, durationText }: { period: PeriodDate; durationText: string }) {
  const locale = useLocale()
  const [start, end] = getDatePeriod(period)

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  }

  const presentText = locale.startsWith("pt") ? "Presente" : "Present"
  const startStr = start.toLocaleDateString(locale, options)
  const endStr = end ? end.toLocaleDateString(locale, options) : presentText

  return (
    <span>
      {startStr} - {endStr} ({durationText})
    </span>
  )
}

const getDatePeriod = (period: PeriodDate): [Date, Date] | [Date, null] => {
  const [startDate, endDate] = period
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null

  return [start, end]
}
