import styled from "@emotion/styled";
import { Container as MantineContainer } from "@mantine/core";

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
    &[id="home"] {
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
        font-weight: bolder;
      }
    }
  }
`;

export { Container };
