import { AppShell } from '@mantine/core';

import Header from './header/header';

const AppLayout: React.FC<React.PropsWithChildren & any> = ({ children, ...props }) => {
  return (
    <AppShell header={{ height: 60 }}>
      <Header {...props} />
      <AppShell.Main pt={0}>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
