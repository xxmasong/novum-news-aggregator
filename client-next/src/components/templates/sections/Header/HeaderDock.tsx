import styled from 'styled-components';
import RoundButton from '@/components/atoms/RoundButton';
import MainResponsive from '@/components/atoms/MainResponsive';
import useHeader from '../../../../hooks/useHeader';
import HeaderLogo from './HeaderLogo';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import HeaderSearchButton from './HeaderSearchButton';
import HeaderThemeButton from './HeaderThemeButton';
import useAuth from '@/hooks/useAuth';
import { useCallback, useEffect, useRef, useState } from 'react';
import HeaderUserIcon from './HeaderUserIcon';
import HeaderUserMenu from './HeaderUserMenu';
import useToggle from '@/hooks/useToggle';

function HeaderDock() {
  const { user, isAuthorized, validating} = useAuth();
  const { onLogin, onLogout } = useHeader();
  const [isAccount, setHasAccount] = useState(""); 
  const [userMenu, toggleUserMenu] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);
  const themeReady = useSelector(
    (state: RootState) => state.theme.systemTheme !== 'not-ready',
  );

  const onOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as any)) return;
      toggleUserMenu();
    },
    [toggleUserMenu],
  );

  useEffect(() => {
    if (!validating) {
      setHasAccount(isAuthorized ? "has": "none");
    }
  }, [validating]);
  
  return (
    <Block>
      <HeaderLogo />
      <Right>
        {themeReady && <HeaderThemeButton />}
        <HeaderSearchButton />
        {isAccount === "none" &&
          <RoundButton color="darkGray" onClick={onLogin}>
            Login
          </RoundButton>
        }
        {isAccount === "has" &&
          <>
            <div ref={ref}>
              <HeaderUserIcon user={user} onClick={toggleUserMenu} />
            </div>
            <HeaderUserMenu
              onClose={onOutsideClick}
              onLogout={onLogout}
              visible={userMenu}
            />
          </>
        }
      </Right>
    </Block>
  );
}

const Block = styled(MainResponsive)`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

export default HeaderDock;
