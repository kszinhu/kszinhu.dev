'use client';

import { ReactLenis } from '@lib/reactLenis';

type SmoothScrollingProps = React.PropsWithChildren<unknown>;

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
