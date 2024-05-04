'use client';

import { useEffect, useRef } from 'react';

import { Container, useMantineColorScheme } from '@mantine/core';
import anime from 'animejs';

import { MorphBubbleGradientProps } from '../../../types/components/morphBubbleGradient';
import BubblesBackground from './background';
import classes from './morphBubbleGradient.module.css';

export default function MorphBubbleGradient({
  children,
}: React.PropsWithChildren<MorphBubbleGradientProps>) {
  const bubbleInteractive = useRef<HTMLDivElement>(null);
  const backgroundElement = useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();

  const setMousePosition = (e: MouseEvent) => {
    anime({
      targets: bubbleInteractive.current,
      scale: 1.5,
      translateX: e.clientX - bubbleInteractive.current!.offsetWidth * 0.275,
      translateY: e.clientY - bubbleInteractive.current!.offsetHeight * 0.2,
      easing: 'easeOutExpo',
      duration: 300,
    });
  };

  useEffect(() => {
    const inmutableBuble = bubbleInteractive.current;
    const inmutableBackground = backgroundElement.current;

    if (backgroundElement.current && bubbleInteractive.current) {
      backgroundElement.current.addEventListener('mousemove', setMousePosition);
    }

    return () => {
      if (inmutableBackground && inmutableBuble) {
        inmutableBackground.removeEventListener('mousemove', setMousePosition);
      }
    };
  }, [backgroundElement, bubbleInteractive]);

  return (
    <Container ref={backgroundElement} className={classes.wrapper}>
      <BubblesBackground backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}>
        <div className={classes['bubble-1']} />
        <div className={classes['bubble-2']} />
        <div className={classes['bubble-3']} />
        <div className={classes['bubble-4']} />
        <div className={classes['bubble-5']} />
        <div
          data-is-interactive
          ref={bubbleInteractive}
          className={classes['bubble-interactive']}
        />
        <Container className={classes['container-content']}>{children}</Container>
      </BubblesBackground>
    </Container>
  );
}
