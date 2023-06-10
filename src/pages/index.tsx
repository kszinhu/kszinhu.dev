import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Layout from '@components/layout'
import { Button, Grid, Stack, Text, Title } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useTypingText } from '@modules/hooks'
import { useStore } from '@modules/store/provider'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'


import type { NavItem } from '../types/components/header'
import type { NextPageWithLayout } from './_app'
import { Container } from './styles'


interface AdditionalProps {
  items: NavItem[]
}

type RootPageProps = InferGetServerSidePropsType<typeof getServerSideProps> &
React.PropsWithChildren

const RootPage: NextPageWithLayout<RootPageProps, RootPageProps> = ({
  items
}) => {
  const { ref: aboutMeRef, entry: aboutMeEntry } = useIntersection({
    threshold: 0.5
  })
  const {
    actions: { setItems }
  } = useStore()
  const { t } = useTranslation()

  const { text } = useTypingText({ words: ['Engenheiro de Software'], style: { fontSize: '1.25rem', fontFamily: '"DM Mono", monospace' } })

  useEffect(() => {
    const itemsWithObservers = items.map((item) => ({
      ...item,
      ...(item.key === 'about-me' && {
        observer: aboutMeEntry
      })
    }))

    setItems(itemsWithObservers)
  }, [items, aboutMeEntry, setItems])

  return (
    <Container>
      <section id='home'>
        <Stack justify='flex-start' align='flex-start' px='lg'>
          <header style={{ paddingBottom: '0.7rem' }}>
            <Text>Hello world 👋🏽</Text>
            <Title order={1}>Olá sou o Cassiano,</Title>
          </header>
          <section id='home-description'>
            <Stack spacing='sm'>
              {text}
              <Button variant='outline' size='lg' sx={{ width: 'fit-content' }}>
                {t('common:talkWithMe')}
              </Button>
            </Stack>
          </section>
        </Stack>
      </section>
      <section id='about-me'>
        <Grid
          align='center'
          justify='center'
          sx={{ width: '100%', gap: '3.5rem' }}
        >
          <Grid.Col span='content' order={2} orderSm={1}>
            <Image
              priority
              src={'/images/me.jpg'}
              width={300}
              height={400}
              alt={t('aboutMe:meImageAlt')}
              aria-label={t('aboutMe:meImageAria') as string}
              about={t('aboutMe:meImageAria') as string}
              style={{
                borderRadius: '1.25rem',
                objectFit: 'cover',
                boxShadow: '0 1.5rem #000'
              }}
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} order={1} orderSm={2} ref={aboutMeRef}>
            <header>
              <Title order={2}>{t('aboutMe:sectionTitle')}</Title>
            </header>
            <Text
              size='1.075rem'
              weight={400}
              sx={{ lineHeight: '22.5px', color: '#ffffffAB' }}
            >
              {t('aboutMe:meText')}
            </Text>
          </Grid.Col>
        </Grid>
      </section>
    </Container>
  )
}

RootPage.getLayout = (page) => <Layout {...page.props}>{page}</Layout>

export const getServerSideProps: GetServerSideProps<AdditionalProps> = async ({
  locale
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'pt_br')),
      items: [
        {
          key: 'about-me',
          label: 'about-me',
          path: '#about-me'
        }
      ]
    }
  }
}

export default RootPage
