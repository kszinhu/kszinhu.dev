import { NavLink as MantineNavLink, NavLinkProps as MantineNavLinkProps } from '@mantine/core';
import { LinkProps } from 'next/link';

import classes from './navlink.module.css';

type NavLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  MantineNavLinkProps & {
    component?: any;
    icon?: React.ReactNode;
  };

const NavigationLink = (props: NavLinkProps) => (
  <MantineNavLink {...props} className={classes.navlink} />
);

export default NavigationLink;
