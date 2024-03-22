import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getBlurData } from '@lib/blurDataGenerator';
import { getLocalData } from '@lib/getLocalData';
import { getServerTranslations } from '@lib/getServerSideTranslactions';
import { Button, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { CompetencesCard, MonoText, SocialMedia, Timeline } from '@modules/components';
import { useTypingText } from '@modules/hooks';
import { useStore } from '@modules/store/provider';
import {
  IconBrandPython as PythonIcon,
  IconBrandJavascript as JavascriptIcon,
  IconBrandTypescript as TypescriptIcon,
  IconBrandNextjs as NextJSIcon,
  IconBrandReact as ReactIcon,
} from '@tabler/icons-react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';

import type { NavItem } from '../types/components/header';
import type { TimelineItem } from '../types/components/timeline';
import { Job } from '../types/config/jobs';
import type { NextPageWithLayout } from './_app';
import { AppLayout, BodyWrapper } from '@modules/layout';

function dateReviver(key: string, value: any) {
  const isDate = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

  if (typeof value === 'string' && isDate.test(value)) {
    return new Date(value);
  }

  return value;
}

type JobWithBlurredData = Job & { blurredSrc: string; alt: string };

interface SkillItem {
  key: string;
  name: string;
  icon: string | React.ElementType;
  experience: number;
}

interface StaticProps {
  jobs: string; // RawData of jobs
}

type RootPageProps = React.PropsWithChildren<InferGetStaticPropsType<typeof getStaticProps>>;

const RootPage: NextPageWithLayout<RootPageProps, RootPageProps> = ({ jobs }) => {
  const { t } = useTranslation();
  const { ref: aboutMeRef, entry: aboutMeEntry } = useIntersection({
      threshold: 0.5,
    }),
    { ref: skillsRef, entry: skillsEntry } = useIntersection({
      threshold: 0.5,
    }),
    { ref: experienceRef, entry: experienceEntry } = useIntersection({
      threshold: 0.5,
    });

  const {
    actions: { setItems },
  } = useStore();

  const { text } = useTypingText({
    words: ['Engenheiro de Software'],
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
    ),
    competences: SkillItem[] = useMemo(
      () => [
        {
          key: 'ReactJS',
          name: 'React',
          icon: ReactIcon,
          experience: 3,
        },
        {
          key: 'NextJS',
          name: 'Next.js',
          icon: NextJSIcon,
          experience: 1,
        },
        {
          key: 'Typescript',
          name: 'Typescript',
          icon: TypescriptIcon,
          experience: 3,
        },
        {
          key: 'Javascript',
          name: 'Javascript',
          icon: JavascriptIcon,
          experience: 4,
        },
        {
          key: 'Python',
          name: 'Python',
          icon: PythonIcon,
          experience: 2,
        },
      ],
      []
    ),
    timelineItems: TimelineItem[] = useMemo(
      () =>
        JSON.parse(jobs, dateReviver).map(
          (job: JobWithBlurredData, index: number, jobs: JobWithBlurredData[]) =>
            ({
              key: job.key,
              title: job.company.name,
              subtitle: job.role,
              imageUrl: job.company.picture,
              body: job.description,
              date: job.interval,
              media: job.banner,
              dashed: index !== jobs.length - 1,
              blurredSrc: job.blurredSrc,
            }) as TimelineItem
        ),
      [jobs]
    );

  useEffect(() => {
    const itemsWithObservers = items.map((item) => ({
      ...item,
      observer: observers.find((observer) => observer.key === item.key)?.entry,
    }));

    setItems(itemsWithObservers);
  }, [items, setItems, observers]);

  return (
    <BodyWrapper>
      <section id="home">
        <Stack justify="space-between" align="flex-start" px="lg">
          <header style={{ paddingBottom: '0.7rem' }}>
            <Text>Hello world 👋🏽</Text>
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
      </section>
      <section id="about-me">
        <Grid align="center" justify="center" style={{ width: '100%', gap: '3.5rem' }}>
          <Grid.Col span="content" order={{ base: 2, sm: 1 }}>
            <Image
              priority
              src={'/static/images/me.jpg'}
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
        <Stack mx={'lg'}>
          <header>
            <MonoText size="0.85rem" fw={400}>
              /experiences
            </MonoText>
            <Title order={2}>{t('experience:sectionTitle')}</Title>
          </header>
          <Stack id="works" gap="lg">
            <Timeline items={timelineItems} />
          </Stack>
        </Stack>
      </section>
    </BodyWrapper>
  );
};

RootPage.getLayout = (page) => <AppLayout {...page.props}>{page}</AppLayout>;

export const getStaticProps: GetStaticProps<StaticProps> = async ({ locale }) => {
  const jobs = await getLocalData('public/static/config/jobs.json'),
    parsedJobs: Job[] = JSON.parse(jobs);

  // @ts-expect-error - return type is not inferred
  const jobsWithBlurredData: JobWithBlurredData[] = await parsedJobs.reduce<
    Promise<JobWithBlurredData[]>
  >(
    // @ts-expect-error - return type is not inferred
    async (acc, job) => {
      const blurredData = await getBlurData(job.company.picture);

      return [
        ...(await acc),
        {
          ...job,
          blurredSrc: blurredData?.base64,
          alt: job.company.name,
        },
      ];
    },
    Promise.resolve([] as JobWithBlurredData[])
  );

  return {
    props: {
      ...(await getServerTranslations(locale ?? 'pt_br')),
      jobs: JSON.stringify(jobsWithBlurredData),
    },
  };
};

export default RootPage;
