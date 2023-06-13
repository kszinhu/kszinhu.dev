import { Card, Group, Stack, Text } from "@mantine/core"
import Image from "next/image"

interface CompetencesCardProps {
  title: string
  description: string
  icon: string | React.ElementType
}

const CompetencesCard: React.FC<CompetencesCardProps> = ({ title, description, icon: Icon }) => {

  return (
    <Card sx={{ padding: '1.5rem' }}>
      <Stack spacing='lg'>
      <Group>
        <Text>{title}</Text>
        {typeof Icon === 'string' ? <Image src={Icon} alt={title} width={100} height={100} /> : <Icon />}
      </Group>
      <Text>{description}</Text>
      </Stack>
    </Card>
  )
}

export default CompetencesCard
