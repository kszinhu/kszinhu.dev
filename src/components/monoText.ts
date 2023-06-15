import styled from "@emotion/styled";
import { Text as MantineText, TextProps } from "@mantine/core";

type MonoTextProps = React.PropsWithChildren & TextProps;

const MonoText = styled(MantineText)<MonoTextProps>`
  font-family: ${({ theme: { fontFamilyMonospace } }) => fontFamilyMonospace};
`;

export default MonoText;
