export type NavItem = {
  key: string;
  label: string;
  path: string;
  observer?: IntersectionObserverEntry;
};
