import styled from "@emotion/styled";
import { Card as MantineCard } from "@mantine/core";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Card = styled(MantineCard)`
  padding: "1.5rem";
  border-radius: 8;
  user-select: none;
  & header {
    padding-bottom: unset !important;
  }
  & :hover {
    & header {
      color: ${({ theme: { primaryColor } }) => primaryColor};
      transition: color 0.45s ease-in-out;
    }
  }
`;

export { Card };
