import React from "react";
import {
  Header as MantineHeader,
  NavLink as MantineNavLink,
  NavLinkProps as MantineNavLinkProps,
} from "@mantine/core";
import styled from "@emotion/styled";
import { LinkProps } from "next/link";

const HeaderWrapper = styled(MantineHeader)`
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.dark[7]};
  backdrop-filter: blur(1rem);
`;

type NavLinkProps = LinkProps &
  MantineNavLinkProps & { component: React.ElementType };

const NavLink = styled(MantineNavLink)<NavLinkProps>`
  width: fit-content;
  opacity: 0.65;
  font-weight: 700;

  &[data-active="true"] {
    opacity: 1;
    background-color: transparent;
    color: unset;

    & span {
      overflow: visible;
    }
    & .mantine-NavLink-body > :nth-child(1)::after {
      width: 100%;
    }
    &:hover {
      background-color: transparent;
    }
  }
  & .mantine-NavLink-body > :nth-child(1)::after {
    content: "";
    width: 0%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.gray[0]};

    display: block;

    position: relative;
    bottom: -1rem;

    padding-inline: 0.5rem;
    transition: width 0.25s ease-in-out;
  }
`;

export { HeaderWrapper, NavLink };
