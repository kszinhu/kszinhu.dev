import { Group, Stack, Text } from "@mantine/core"
import Image from "next/image"

import { Card } from "./styles"

interface CompetencesCardProps {
  title: string
  description: string
  icon: string | React.ElementType
}

const CompetencesCard: React.FC<CompetencesCardProps> = ({ title, description, icon: Icon }) => {

  return (
    <Card>
      <Stack spacing='lg'>
        <header>
          <Group position='apart'>
            <Text weight='bold'>{title}</Text>
            {typeof Icon === 'string' ? <Image src={Icon} alt={title} width={100} height={100} /> : <Icon />}
          </Group>
        </header>
        <Text>{description}</Text>
      </Stack>
    </Card>
  )
}

export default CompetencesCard
