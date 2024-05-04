import { useCallback, useMemo } from 'react';

import { Timeline as TimelineComponent, Text, Stack, Group, Avatar } from '@mantine/core';

import { useTranslation } from '@lib/getServerSideTranslactions';

import { DateInterval } from '../../../types/common';
import { WorkTimelineProps } from '../../../types/components/timeline';
import TimelineImage from './image';
import classes from './timeline.module.css';

const WorkTimeline = ({ items }: WorkTimelineProps) => {
  const { t } = useTranslation();

  const experienceTime = useCallback(
    ({ start, end }: DateInterval) => {
      // calculate years of experience or months if less than a year passed
      const years = end
        ? end.getFullYear() - start.getFullYear()
        : new Date().getFullYear() - start.getFullYear();
      const months = end
        ? end.getMonth() - start.getMonth()
        : new Date().getMonth() - start.getMonth();

      return years > 0
        ? t('experience:year', { count: years })
        : t('experience:month', { count: months });
    },
    [t]
  );

  const jobInformations = useMemo(
    () =>
      items
        .map((item) =>
          item.jobs.map(
            (job) =>
              `${item.location} - ${job.employmentType.toLocaleUpperCase()} - ${experienceTime(
                job.date
              )}`
          )
        )
        .flat(),
    [items, experienceTime]
  );

  return (
    <TimelineComponent bulletSize={35} lineWidth={2}>
      {items.map((item, itemIndex) => (
        <TimelineComponent.Item
          key={item.key}
          color="blue"
          title={item.name}
          lineVariant={itemIndex === items.length - 1 ? 'dashed' : 'solid'}
          {...(item.avatar && {
            bullet: <Avatar size="md" radius="xl" src={item.avatar} alt={item.name} />,
          })}
          {...(item.banner && {
            banner: (
              <TimelineImage
                width={600}
                height={350}
                sizes="100vw"
                alt={item.name}
                src={item.banner}
                blurredSrc={item.bannerBlurredSrc}
                className={classes.timelineImage}
              />
            ),
          })}
        >
          <Group>
            <Stack gap="xs">
              {item.jobs.map((job, jobIndex) => (
                <Stack key={job.title} gap="xs">
                  <Text size="lg" w={500}>
                    {job.title}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {jobInformations[jobIndex]}
                  </Text>
                  {jobIndex + 1 === item.jobs.length && <Text size="sm">{job.description}</Text>}
                </Stack>
              ))}
              {item.banner && (
                <TimelineImage
                  width={600}
                  height={350}
                  sizes="100vw"
                  alt={item.name}
                  src={item.banner}
                  blurredSrc={item.bannerBlurredSrc}
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

export default WorkTimeline;
