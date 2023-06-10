import React from "react";

import styled from "@emotion/styled";
import {
  Header as MantineHeader,
  NavLink as MantineNavLink,
  NavLinkProps as MantineNavLinkProps,
  Burger as MantineBurger,
} from "@mantine/core";
import { LinkProps } from "next/link";

const HeaderWrapper = styled(MantineHeader)`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-around;

  border-bottom: 0;

  background-color: ${({
    theme: {
      colors,
      fn: { rgba },
    },
  }) => rgba(colors.dark[9], 0)};
  backdrop-filter: blur(3.25rem);

  ${({ theme }) => theme.fn.smallerThan("sm")} {
    justify-content: space-between;
    padding: 0 0.25rem;
  }
`;

type NavLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  MantineNavLinkProps & { component: React.ElementType };

const NavLink = styled(MantineNavLink)<NavLinkProps>`
  width: fit-content;
  display: block;
  opacity: 0.65;
  font-weight: 700;

  &[data-active="true"],
  &:not([data-active="true"]):hover {
    opacity: 1;
    background-color: transparent;
    color: unset;

    transition: opacity 0.3s;

    & span {
      overflow: visible;
    }
    & .mantine-NavLink-body > :nth-of-type(1)::after {
      width: 100%;
    }
    &:hover {
      background-color: transparent;
    }
  }

  &:not([data-active="true"]) .mantine-NavLink-body > :nth-of-type(1)::after {
    width: 0%;
    opacity: 0 !important;

    transition: width 0.4s, opacity 0.41s;
  }

  & .mantine-NavLink-body > :nth-of-type(1)::after {
    content: "";
    opacity: 1;
    width: 0%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.gray[0]};

    display: block;

    position: relative;
    bottom: -1rem;
    border-radius: 0.25rem;

    padding-inline: 0.5rem;
    transition: width 0.4s;
  }
`;

const MediaLink = styled(NavLink)`
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.1rem;
  span.mantine-NavLink-icon {
    margin-right: 0;
  }
  span.mantine-NavLink-body {
    display: none;
  }
  ${({ theme }) => theme.fn.smallerThan("sm")} {
    svg {
      stroke-width: 1.5;
    }
  }
`;

const Burger = styled(MantineBurger)`
  ${({ theme }) => theme.fn.largerThan("sm")} {
    display: none;
  }
`;

export { HeaderWrapper, NavLink, MediaLink, Burger };
