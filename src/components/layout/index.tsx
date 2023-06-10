import React from "react";

import Header from "./header";

const Layout: React.FC<React.PropsWithChildren & any> = ({
  children,
  ...props
}) => {
  return (
    <>
      <Header {...props} />
      {children}
    </>
  );
};

export default Layout;
