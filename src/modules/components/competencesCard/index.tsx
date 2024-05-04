import { Card, Group, Stack, Text } from '@mantine/core';

import { IconsAvailable } from '../../../types/config/competences';
import IconSelector from '../iconSelector';
import classes from './competencesCard.module.css';

interface CompetencesCardProps {
  title: string;
  description: string;
  icon: IconsAvailable;
}

const CompetencesCard: React.FC<CompetencesCardProps> = ({ title, description, icon: Icon }) => (
  <Card className={classes['competences-card']}>
    <Stack gap="lg">
      <header>
        <Group justify="space-around">
          <Text fw="bold">{title}</Text>
          <IconSelector icon={Icon} />
        </Group>
      </header>
      <Text>{description}</Text>
    </Stack>
  </Card>
);

export default CompetencesCard;
