import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Button, Group, Title } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";

import { NavItem } from "../types/components/header";
import Layout from "@components/layout";
import type { NextPageWithLayout } from "./_app";
import { useStore } from "@modules/store/provider";

interface AdditionalProps {
  items: NavItem[];
}

type RootPageProps = InferGetServerSidePropsType<typeof getServerSideProps> &
  React.PropsWithChildren;

const RootPage: NextPageWithLayout<RootPageProps, RootPageProps> = ({
  items,
}) => {
  const { ref: aboutMeRef, entry: aboutMeEntry } = useIntersection({
    threshold: 0.5,
  });
  const {
    actions: { setItems },
  } = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    const itemsWithObservers = items.map((item) => ({
      ...item,
      ...(item.key === "about-me" && {
        observer: aboutMeEntry,
      }),
    }));

    setItems(itemsWithObservers);
  }, [items, aboutMeEntry, setItems]);

  return (
    <>
      <Group id='about-me' position='center' ref={aboutMeRef} mt={100}>
        <Title order={1}>Olá sou o Cassiano</Title>
        <Button size='xl'>{t("common:welcome")}</Button>
      </Group>
    </>
  );
};

RootPage.getLayout = (page) => <Layout {...page.props}>{page}</Layout>;

export const getServerSideProps: GetServerSideProps<AdditionalProps> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt_br")),
      items: [
        {
          key: "about-me",
          label: "about-me",
          path: "#about-me",
        },
      ],
    },
  };
};

export default RootPage;
