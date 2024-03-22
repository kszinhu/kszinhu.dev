import { Timeline as TimelineComponent, Text, Stack, Group, Avatar } from '@mantine/core';

import { TimelineProps } from '../../../types/components/timeline';
import TimelineImage from './image';

import classes from './timeline.module.css';

const Timeline = ({ items }: TimelineProps) => {
  return (
    <TimelineComponent bulletSize={35} lineWidth={2}>
      {items.map((item) => (
        <TimelineComponent.Item
          key={item.key}
          color="blue"
          title={item.title}
          lineVariant={item.dashed ? 'dashed' : 'solid'}
          {...(item.imageUrl && {
            bullet: <Avatar size="md" radius="xl" src={item.imageUrl} alt={item.title} />,
          })}
        >
          <Group>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {item.subtitle}
              </Text>
              <Text size="sm">{item.body}</Text>
              {item.imageUrl && (
                <TimelineImage
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={item.title}
                  src={item.imageUrl}
                  blurredSrc={item.blurredSrc}
                  style={{ maxWidth: '250px' }}
                  className={classes.timelineImage}
                />
              )}
            </Stack>
          </Group>
        </TimelineComponent.Item>
      ))}
    </TimelineComponent>
  );
};

export default Timeline;
