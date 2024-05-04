import { useCallback } from 'react';

import { NavLink as MantineNavLink, NavLinkProps as MantineNavLinkProps } from '@mantine/core';
import { useLenis } from '@studio-freight/react-lenis';
import { LinkProps } from 'next/link';

import classes from './navlink.module.css';

type NavLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  MantineNavLinkProps & {
    component?: any;
    icon?: React.ReactNode;
  };

const NavigationLink = (props: NavLinkProps) => {
  const scrollManager = useLenis();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (!scrollManager || !props.href) return;

      scrollManager.scrollTo(props.href, { offset: 0, lerp: 0.1, duration: 350 });
    },
    [scrollManager, props.href]
  );

  return (
    <MantineNavLink
      {...props}
      className={classes.navlink}
      {...(props.href && !props.onClick ? { onClick: handleClick } : {})}
    />
  );
};

export default NavigationLink;
