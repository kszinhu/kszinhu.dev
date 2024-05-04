import { useEffect, useMemo } from 'react';

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

import { Button, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { CompetencesCard, MonoText, SmoothScrolling, WorkTimeline } from '@modules/components';
import { useTypingText } from '@modules/hooks';
import { AppLayout, BodyWrapper } from '@modules/layout';
import MorphBubbleGradient from '@modules/scenes/morphBubbleGradient';
import { useStore } from '@modules/store/provider';

import groupBy from '@utils/groupBy';

import { getBlurData } from '@lib/blurDataGenerator';
import { getLocalData } from '@lib/getLocalData';
import { getServerSideTranslations, useTranslation } from '@lib/getServerSideTranslactions';

import type { NavItem } from '../types/components/header';
import type { WorkTimelineItem } from '../types/components/timeline';
import { Competence } from '../types/config/competences';
import { Job, JobWithBlurredData } from '../types/config/jobs';
import type { NextPageWithLayout } from './_app';

function dateReviver(key: string, value: any) {
  const isDate = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

  if (typeof value === 'string' && isDate.test(value)) {
    return new Date(value);
  }

  return value;
}

interface ServerProps {
  jobs: string;
  skills: string;
}

type RootPageProps = React.PropsWithChildren<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const RootPage: NextPageWithLayout<RootPageProps, RootPageProps> = ({ jobs, skills }) => {
  const { t } = useTranslation();
  const { ref: aboutMeRef, entry: aboutMeEntry } = useIntersection({
    threshold: 0.25,
  });
  const { ref: skillsRef, entry: skillsEntry } = useIntersection({
    threshold: 0.5,
  });
  const { ref: experienceRef, entry: experienceEntry } = useIntersection({
    threshold: 0.25,
  });

  const {
    actions: { setItems },
  } = useStore();

  const { text } = useTypingText({
    words: [t('header:typingText')],
    style: { fontSize: '1.25rem', fontFamily: '"DM Mono", monospace' },
  });

  const observers = useMemo(
    () => [
      { key: 'about-me', entry: aboutMeEntry },
      { key: 'skills', entry: skillsEntry },
      { key: 'experience', entry: experienceEntry },
    ],
    [aboutMeEntry, skillsEntry, experienceEntry]
  );

  const items: NavItem[] = useMemo(
    () => [
      {
        key: 'about-me',
        label: 'about-me',
        path: '#about-me',
      },
      {
        key: 'skills',
        label: 'skills',
        path: '#skills',
      },
      {
        key: 'experience',
        label: 'experience',
        path: '#experience',
      },
    ],
    []
  );
  const competences: Competence[] = useMemo(() => JSON.parse(skills), [skills]);
  const timelineItems: WorkTimelineItem[] = useMemo(
    () =>
      Object.entries(
        groupBy<JobWithBlurredData>(JSON.parse(jobs, dateReviver), 'company.name')
      ).map(
        ([companyName, companyJobs]) =>
          ({
            key: companyName,
            name: companyName,
            banner: companyJobs[0].banner,
            avatar: companyJobs[0].company.picture,
            bannerBlurredSrc: companyJobs[0].blurredSrc,
            description: companyJobs[0].company.description,
            location: companyJobs[0].company.location,
            jobs: companyJobs.map(({ role, interval, ...rest }) => ({
              ...rest,
              title: role,
              date: interval,
            })),
          }) as WorkTimelineItem
      ),
    [jobs]
  );

  useEffect(() => {
    const itemsWithObservers = items.map((item) => ({
      ...item,
      observer: observers.find((observer) => observer.key === item.key)?.entry,
    })) as NavItem[];

    setItems(itemsWithObservers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observers]);

  return (
    <SmoothScrolling>
      <BodyWrapper>
        <section id="home">
          <MorphBubbleGradient>
            <Stack justify="space-between" align="flex-start" px="lg">
              <header style={{ paddingBottom: '0.7rem' }}>
                <Text>
                  <mark>Hello world 👋🏽</mark>
                </Text>
                <Title order={1}>Olá sou o Cassiano,</Title>
              </header>
              <section id="home-description">
                <Stack gap="lg">
                  {text}
                  <Group>
                    <Button size="md" style={{ width: 'fit-content' }}>
                      {t('common:talkWithMe')}
                    </Button>
                  </Group>
                </Stack>
              </section>
            </Stack>
          </MorphBubbleGradient>
        </section>
        <section id="about-me">
          <Grid align="center" justify="center" style={{ width: '100%', gap: '3.5rem' }}>
            <Grid.Col span="content" order={{ base: 2, sm: 1 }}>
              <Image
                priority
                src="/static/images/me.jpg"
                width={300}
                height={400}
                alt={t('aboutMe:meImageAlt')}
                aria-label={t('aboutMe:meImageAria') as string}
                about={t('aboutMe:meImageAria') as string}
                style={{
                  borderRadius: '1.25rem',
                  objectFit: 'cover',
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }} order={{ base: 1, sm: 2 }}>
              <header>
                <MonoText size="0.85rem" fw={400}>
                  /about-me
                </MonoText>
                <Title order={2} ref={aboutMeRef}>
                  {t('aboutMe:sectionTitle')}
                </Title>
              </header>
              <Text size="1.075rem" fw={400} style={{ lineHeight: '22.5px', color: '#ffffffAB' }}>
                {t('aboutMe:meText')}
              </Text>
            </Grid.Col>
          </Grid>
        </section>
        <section id="skills" ref={skillsRef}>
          <Stack>
            <header>
              <MonoText size="0.85rem" fw={400}>
                /skills
              </MonoText>
              <Title order={2}>{t('competences:sectionTitle')}</Title>
            </header>
            <Grid align="center" justify="center" style={{ width: '100%', gap: '1.5rem' }}>
              {competences.map(({ key, name: title, experience, ...rest }) => (
                <Grid.Col key={key} span={{ xs: 12, sm: 4, lg: 3 }}>
                  <CompetencesCard
                    title={title}
                    description={t('competences:experienceDescription', { count: experience })}
                    {...rest}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </section>
        <section id="experience" ref={experienceRef}>
          <Stack mx="lg">
            <header>
              <MonoText size="0.85rem" fw={400}>
                /experiences
              </MonoText>
              <Title order={2}>{t('experience:sectionTitle')}</Title>
            </header>
            <Stack id="works" gap="lg">
              <WorkTimeline items={timelineItems} />
            </Stack>
          </Stack>
        </section>
      </BodyWrapper>
    </SmoothScrolling>
  );
};

RootPage.getLayout = (page) => <AppLayout {...page.props}>{page}</AppLayout>;

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({ locale }) => {
  const jobs: JobWithBlurredData[] = await getLocalData('public/static/config/jobs.json', {
    type: 'JSON',
    parse: true,
  }).then(async (parsedJobs: Job[]) =>
    parsedJobs.reduce<Promise<JobWithBlurredData[]>>(
      async (acc, job) => {
        const blurredData = await getBlurData(job.company.picture);

        return [
          ...(await acc),
          {
            ...job,
            blurredSrc: blurredData?.base64 ?? '',
            alt: job.company.name,
          },
        ];
      },
      Promise.resolve([] as JobWithBlurredData[])
    )
  );
  const skills: string = await getLocalData('public/static/config/competences.json', {
    type: 'JSON',
  });

  return {
    props: {
      skills,
      jobs: JSON.stringify(jobs),
      ...(await getServerSideTranslations(locale)),
    },
  };
};

export default RootPage;
