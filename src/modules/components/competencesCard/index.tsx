import { Card, Group, Stack, Text } from '@mantine/core';
import Image from 'next/image';

import classes from './competencesCard.module.css';

interface CompetencesCardProps {
  title: string;
  description: string;
  icon: string | React.ElementType;
}

const CompetencesCard: React.FC<CompetencesCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <Card className={classes['competences-card']}>
      <Stack gap="lg">
        <header>
          <Group justify="space-around">
            <Text fw="bold">{title}</Text>
            {typeof Icon === 'string' ? (
              <Image src={Icon} alt={title} width={100} height={100} />
            ) : (
              <Icon />
            )}
          </Group>
        </header>
        <Text>{description}</Text>
      </Stack>
    </Card>
  );
};

export default CompetencesCard;
