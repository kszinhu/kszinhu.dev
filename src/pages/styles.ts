import styled from "@emotion/styled";
import {
  Container as MantineContainer,
  Text as MantineText,
  TextProps,
} from "@mantine/core";

const Container = styled(MantineContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: unset;

  background-color: ${({ theme: { colors } }) => colors.dark[9]};

  padding-left: 0;
  padding-right: 0;
  & > section {
    background-color: ${({ theme: { colors } }) => colors.dark[8]};

    &:not([id="about-me"]) {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    &[id="home"],
    &[id="skills"] {
      display: flex;
      justify-content: space-around;

      background-color: ${({ theme: { colors } }) => colors.dark[9]};
      border-radius: ${({ theme: { radius } }) => radius.md};

      margin-left: 0;
      margin-right: 0;
      padding-left: 0;
      padding-right: 0;
    }
    padding-block: 12rem;
    & header {
      padding-bottom: 1.5rem;
      & > h2,
      h1 {
        color: ${({ theme: { primaryColor } }) => primaryColor};
      }
    }
  }
`;

type MonoTextProps = React.PropsWithChildren & TextProps;

const MonoText = styled(MantineText)<MonoTextProps>`
  font-family: ${({ theme: { fontFamilyMonospace } }) => fontFamilyMonospace};
`;

export { Container, MonoText };
