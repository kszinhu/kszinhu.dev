export interface SocialMediaItem {
  key: string;
  href: string;
  icon: React.ElementType;
}

export interface SocialMediaProps {
  items: SocialMediaItem[];
}
