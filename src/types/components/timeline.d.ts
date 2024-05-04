import { ImageProps } from 'next/image';

import { DateInterval } from '../common';

export interface TimelineJob {
  title: string;
  date: DateInterval;
  description: string;
  employmentType: string;
}

export type WorkTimelineItem = {
  key: string;
  name: string;
  avatar: string;
  location: string;
  jobs: TimelineJob[];
} & (
  | {
      banner: string;
      bannerBlurredSrc: string;
    }
  | {
      banner?: never;
      bannerBlurredSrc?: never;
    }
);

export interface WorkTimelineProps {
  items: WorkTimelineItem[];
}

export interface TimelineImageProps extends ImageProps {
  src: string;
  blurredSrc?: string;
  alt: string;
}
