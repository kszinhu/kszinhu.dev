import Link from 'next/link';

import { ActionIcon, Group, AppShellHeader as MantineHeader } from '@mantine/core';
import { useStore } from '@modules/store/provider';
import {
  IconBrandInstagram as InstagramIcon,
  IconBrandLinkedin as LinkedinIcon,
  IconBrandGithub as GithubIcon,
} from '@tabler/icons-react';

import { useTranslation } from '@lib/getServerSideTranslactions';

import NavigationLink from '../../components/navigationLink';
import Burger from '../burger/burger';
import classes from './header.module.css';

export default function Header() {
  const {
    state: { header: { items, opened } = {} },
    actions: { toggleOpened: toggle },
  } = useStore();
  const { t } = useTranslation('header');

  const socialMedias: { key: string; href: string; icon: React.ElementType }[] = [
    {
      key: 'instagram',
      href: 'https://www.instagram.com/kszinhu/',
      icon: InstagramIcon,
    },
    {
      key: 'linkedin',
      href: 'https://www.linkedin.com/in/kszinhu/',
      icon: LinkedinIcon,
    },
    {
      key: 'github',
      href: 'https://www.github.com/kszinhu/',
      icon: GithubIcon,
    },
  ];

  return (
    <MantineHeader className={classes.header}>
      <section id="navigation" className={classes['navigation-section']}>
        {items && (
          <>
            <Group visibleFrom="sm">
              {items.map((item) => (
                <NavigationLink
                  variant="light"
                  key={item.key}
                  href={item.path}
                  label={t(item.label) ?? item.label}
                  active={item?.observer?.isIntersecting}
                  scroll={false}
                  component={Link}
                />
              ))}
            </Group>
            <Burger
              size="sm"
              color="#87878b"
              opened={opened}
              onClick={toggle}
              title="Open navigation"
              aria-label="Open navigation"
            />
          </>
        )}
      </section>
      <section id="social-medias" className={classes['social-media-section']}>
        <Group>
          {socialMedias.map(({ key, icon: Icon, ...props }) => (
            <ActionIcon
              key={key}
              component={Link}
              rel="noopener noreferrer"
              target="_blank"
              variant="transparent"
              {...props}
            >
              <Icon />
            </ActionIcon>
          ))}
        </Group>
      </section>
    </MantineHeader>
  );
}
