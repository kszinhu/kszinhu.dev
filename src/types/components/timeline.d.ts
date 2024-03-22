import { ImageProps } from 'next/image';

import { DateInterval } from '../common';

export interface TimelineItem {
  key: string;
  title: string;
  imageUrl?: string;
  blurredSrc?: string;
  subtitle: string;
  body: string;
  dashed?: boolean;
  media?: Url;
  date: DateInterval;
}

export interface TimelineImageProps extends ImageProps {
  src: string;
  blurredSrc?: string;
  alt: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}
