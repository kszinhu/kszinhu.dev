import { useTranslation } from "react-i18next";

import SocialMedia from "@components/socialMedia";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStore } from "@modules/store/provider";
import {
  IconBrandInstagram as InstagramIcon,
  IconBrandLinkedin as LinkedinIcon,
  IconBrandGithub as GithubIcon,
} from "@tabler/icons-react";
import Link from "next/link";

import { HeaderWrapper, NavLink, Burger } from "./styles";

const Header: React.FC = () => {
  const {
    state: { header: { items } = {} },
  } = useStore();
  const [opened, { toggle }] = useDisclosure(false);
  const { t } = useTranslation("header");

  const socialMedias: { key: string; href: string; icon: React.ElementType }[] =
    [
      {
        key: "instagram",
        href: "https://www.instagram.com/kszinhu/",
        icon: InstagramIcon,
      },
      {
        key: "linkedin",
        href: "https://www.linkedin.com/in/kszinhu/",
        icon: LinkedinIcon,
      },
      {
        key: "github",
        href: "https://www.github.com/kszinhu/",
        icon: GithubIcon,
      },
    ];

  return (
    <HeaderWrapper height={60}>
      <section id='navigation'>
        {items && (
          <>
            <Group
              sx={({ fn }) => ({
                [fn.smallerThan("sm")]: {
                  display: "none",
                },
              })}
            >
              {items.map((item) => (
                <NavLink
                  variant='light'
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
              size='sm'
              color='#87878b'
              opened={opened}
              onClick={toggle}
              title='Open navigation'
              aria-label='Open navigation'
            >
              {items.map((item) => (
                <NavLink
                  variant='light'
                  key={item.key}
                  href={item.path}
                  label={t(item.label) ?? item.label}
                  active={item?.observer?.isIntersecting}
                  scroll={false}
                  component={Link}
                />
              ))}
            </Burger>
          </>
        )}
      </section>
      <section id='social-medias'>
        <Group>
          <SocialMedia items={socialMedias} />
        </Group>
      </section>
    </HeaderWrapper>
  );
};

export default Header;
