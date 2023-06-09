import { useTranslation } from "react-i18next";

import { HeaderWrapper, NavLink } from "./styles";
import { useStore } from "@modules/store/provider";
import Link from "next/link";

const Header: React.FC = () => {
  const {
    state: { header: { items } = {} },
  } = useStore();
  const { t } = useTranslation("header");

  return (
    <HeaderWrapper height={60} sx={{ zIndex: 1000 }}>
      {items &&
        items.map((item) => (
          <NavLink
            variant='light'
            key={item.key}
            href={item.path}
            label={t(item.label) ?? item.label}
            active={item?.observer?.isIntersecting}
            component={Link}
          />
        ))}
    </HeaderWrapper>
  );
};

export default Header;
