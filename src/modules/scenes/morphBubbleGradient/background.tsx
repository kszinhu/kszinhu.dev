import { CSSProperties } from 'react';

import classes from './morphBubbleGradient.module.css';

interface BubblesBackgroundProps {
  backgroundColor: CSSProperties['backgroundColor'];
}

export default function BubblesBackground({
  backgroundColor,
  ...props
}: React.PropsWithChildren<BubblesBackgroundProps>) {
  return <div style={{ backgroundColor }} className={classes['gradient-bg']} {...props} />;
}
