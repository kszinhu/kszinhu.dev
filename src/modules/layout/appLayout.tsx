import { AppShell } from '@mantine/core';
import { useStore } from '@modules/store/provider';

import Header from './header/header';

const AppLayout: React.FC<React.PropsWithChildren & any> = ({ children, ...props }) => {
  const {
    state: { header: { opened: _ } = {} },
  } = useStore();

  return (
    <AppShell header={{ height: 60 }}>
      <Header {...props} />
      <AppShell.Main pt={0} mt={-60}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
