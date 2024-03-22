import Image from "next/image";

import { TimelineImageProps } from "../../../types/components/timeline";


const TimelineImage = (props: TimelineImageProps) => {
  return (
    <Image {...props} blurDataURL={props.blurredSrc} placeholder="blur" loading="lazy" objectFit="cover" />
  )
}

export default TimelineImage;