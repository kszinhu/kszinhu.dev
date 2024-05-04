export type IconsAvailable = Exclude<
  keyof typeof import('@tabler/icons-react'),
  'createReactComponent'
>;

export interface Competence {
  key: string;
  name: string;
  icon: IconsAvailable;
  experience: number;
}
