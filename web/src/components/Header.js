import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";

import Link from "next/link";
import { useUser } from "../utils/hooks";
import Menu from "../components/Menu";
const overrides = {
  Root: {
    style: {
      borderBottom: "none",
      backgroundColor: "#f5f5f5",
      padding: "1.5rem",
    },
  },
};

export default () => {
  const user = useUser({ redirectTo: "/" });

  const items  = [
    {label: 'example@gmail.com', href:'/'},
    {label: 'New tent', href:'/new-tent'},
    {label: 'log out', href:'/'}
  ]

  return (
    <>
      <HeaderNavigation overrides={overrides}>
        <StyledNavigationList>
          <StyledNavigationItem>
            <Link href="/">
              <a>Hire a tent</a>
            </Link>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Link href="/">
              <a>Sell your tent</a>
            </Link>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <div style={{paddingRight: '3rem'}}>

            { user && <Menu title='Menu' items={items} />}            </div>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
    </>
  );
};
