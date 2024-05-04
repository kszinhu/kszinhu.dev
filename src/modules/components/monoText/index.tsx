import { Text as MantineText, TextProps } from '@mantine/core';

import classes from './monoText.module.css';

const MonoText: React.FC<React.PropsWithChildren<TextProps>> = (props) => (
  <MantineText {...props} className={`${classes['mono-text']} ${props.className}`} />
);

export default MonoText;
