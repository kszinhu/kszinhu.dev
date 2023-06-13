import Link from "next/link";

import type { SocialMediaProps } from "../types/components/socialMedia";
import { MediaLink } from "./layout/styles";

const SocialMedia: React.FC<SocialMediaProps> = ({ items }) => {
  return (
    <>
      {items.map(({ key, icon: Icon, ...props }) => (
        <MediaLink
          key={key}
          target='_blank'
          rel='noopener noreferrer'
          component={Link}
          icon={<Icon />}
          {...props}
        />
      ))}
    </>
  );
}

export default SocialMedia;