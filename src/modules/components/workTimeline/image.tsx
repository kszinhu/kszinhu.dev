import Image from 'next/image';

import type { TimelineImageProps } from '../../../types/components/timeline';

const TimelineImage = ({ blurredSrc, ...props }: TimelineImageProps) => (
  <Image
    {...props}
    loading="lazy"
    {...(blurredSrc ? { blurDataURL: blurredSrc, placeholder: 'blur' } : {})}
  />
);

export default TimelineImage;
