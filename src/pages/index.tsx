import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CompetencesCard, MonoText, RootContainer, SocialMedia } from "@components/index";
import Layout from "@components/layout";
import { Button, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useTypingText } from "@modules/hooks";
import { useStore } from "@modules/store/provider";
import { IconBrandPython as PythonIcon, IconBrandJavascript as JavascriptIcon, IconBrandTypescript as TypescriptIcon, IconBrandNextjs as NextJSIcon, IconBrandReact as ReactIcon } from "@tabler/icons-react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";

import type { NavItem } from "../types/components/header";
import type { NextPageWithLayout } from "./_app";

interface SkillItem {
  key: string;
  name: string;
  icon: string | React.ElementType;
  experience: number;
}

interface ServerSideProps {}

type RootPageProps = React.PropsWithChildren<InferGetServerSidePropsType<typeof getServerSideProps>>;

const RootPage: NextPageWithLayout<RootPageProps, RootPageProps> = () => {
  const { t } = useTranslation();
  const { ref: aboutMeRef, entry: aboutMeEntry } = useIntersection({
      threshold: 0.5,
    }),
    { ref: skillsRef, entry: skillsEntry } = useIntersection({
      threshold: 0.5,
    });

  const {
    actions: { setItems },
  } = useStore();

  const { text } = useTypingText({
    words: ["Engenheiro de Software"],
    style: { fontSize: "1.25rem", fontFamily: '"DM Mono", monospace' },
  });

  const observers = useMemo(
    () => [
      { key: "about-me", entry: aboutMeEntry },
      { key: "skills", entry: skillsEntry },
    ],
    [aboutMeEntry, skillsEntry]
  );

  const items: NavItem[] = useMemo(() => [
    {
      key: "about-me",
      label: "about-me",
      path: "#about-me",
    },
    {
      key: "skills",
      label: "skills",
      path: "#skills",
    },
  ], []), competences: SkillItem[] = useMemo(() => [
    {
      key: "ReactJS",
      name: "React",
      icon: ReactIcon,
      experience: 3,
    },
    {
      key: "NextJS",
      name: "Next.js",
      icon: NextJSIcon,
      experience: 1,
    },
    {
      key: "Typescript",
      name: "Typescript",
      icon: TypescriptIcon,
      experience: 3,
    },
    {
      key: "Javascript",
      name: "Javascript",
      icon: JavascriptIcon,
      experience: 4,
    },
    {
      key: "Python",
      name: "Python",
      icon: PythonIcon,
      experience: 2,
    }
  ], []);

  useEffect(() => {
    const itemsWithObservers = items.map((item) => ({
      ...item,
      observer: observers.find((observer) => observer.key === item.key)?.entry,
    }));

    setItems(itemsWithObservers);
  }, [items, setItems, observers]);

  return (
    <RootContainer>
      <section id='home'>
        <Stack justify='space-between' align='flex-start' px='lg'>
          <header style={{ paddingBottom: "0.7rem" }}>
            <Text>Hello world 👋🏽</Text>
            <Title order={1}>Olá sou o Cassiano,</Title>
          </header>
          <section id='home-description'>
            <Stack spacing='lg'>
              {text}
              <Group>
                <Button size='md' sx={{ width: "fit-content" }}>
                  {t("common:talkWithMe")}
                </Button>
                <SocialMedia items={[]} />
              </Group>
            </Stack>
          </section>
        </Stack>
      </section>
      <section id='about-me'>
        <Grid
          align='center'
          justify='center'
          sx={{ width: "100%", gap: "3.5rem" }}
        >
          <Grid.Col span='content' order={2} orderSm={1}>
            <Image
              priority
              src={"/images/me.jpg"}
              width={300}
              height={400}
              alt={t("aboutMe:meImageAlt")}
              aria-label={t("aboutMe:meImageAria") as string}
              about={t("aboutMe:meImageAria") as string}
              style={{
                borderRadius: "1.25rem",
                objectFit: "cover",
              }}
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} order={1} orderSm={2}>
            <header>
              <MonoText size='0.85rem' weight={400}>
                /about-me
              </MonoText>
              <Title order={2} ref={aboutMeRef}>
                {t("aboutMe:sectionTitle")}
              </Title>
            </header>
            <Text
              size='1.075rem'
              weight={400}
              sx={{ lineHeight: "22.5px", color: "#ffffffAB" }}
            >
              {t("aboutMe:meText")}
            </Text>
          </Grid.Col>
        </Grid>
      </section>
      <section id='skills' ref={skillsRef}>
        <Stack>
          <header>
            <MonoText size='0.85rem' weight={400}>
              /skills
            </MonoText>
            <Title order={2}>
              {t("competences:sectionTitle")}
            </Title>
          </header>
          <Grid
            align='center'
            justify='center'
            sx={{ width: "100%", gap: "1.5rem" }}
          >
            {competences.map(({ key, name: title, experience, ...rest }) => (
              <Grid.Col key={key} span={6} sm={3}>
                <CompetencesCard title={title} description={t('competences:experienceDescription', { count: experience })} {...rest} />
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </section>
    </RootContainer>
  );
};

RootPage.getLayout = (page) => <Layout {...page.props}>{page}</Layout>;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt_br" )),
    },
  };
};

export default RootPage;
