import { useEffect, useState, memo } from 'react';

import type { TablerIconsProps } from '@tabler/icons-react';

import type { Competence } from '../../types/config/competences';

type IconSelectorProps = React.PropsWithChildren<{ icon: Competence['icon'] } & TablerIconsProps>;

function IconSelector({ icon: selectedIcon, ...props }: IconSelectorProps) {
  const [IconRenderable, setIcon] = useState<React.FC<TablerIconsProps> | null>(null);

  useEffect(() => {
    import('@tabler/icons-react').then((icons) => setIcon(icons[selectedIcon]));
  }, [selectedIcon]);

  return IconRenderable ? <IconRenderable {...props} /> : null;
}

export default memo(IconSelector, (prevProps, nextProps) => prevProps.icon === nextProps.icon);
