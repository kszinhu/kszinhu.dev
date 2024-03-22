import { Container as MantineContainer, ContainerProps } from '@mantine/core';

import classes from './bodyWrapper.module.css';

const BodyWrapper = (props: ContainerProps) => (
  <MantineContainer {...props} className={classes['root-container']} />
);

export default BodyWrapper;
