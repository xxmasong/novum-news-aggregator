'use client';

import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { themedPalette } from '@/styles/themes';
import { MdArrowDropDown } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import media from '@/styles/media';
import PlainNavLink from '@/components/atoms/PlainNavLink';
import MainResponsive from '@/components/atoms/MainResponsive';
import useToggle from '@/hooks/useToggle';
import CategoryPicker from '../../../atoms/CategoryPicker';
import { Stack } from '@mui/system';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

function HeaderTab() {
  const pathname = usePathname();
  const [isAccount, setHasAccount] = useState(""); 
  const {isAuthorized, validating} = useAuth();
  const [categoryPicker, toggleCategoryPicker] = useToggle(false);
  const springStyle = useSpring({
    left: 
      pathname === '/' ? '0%' : '50%',
        config: {
          friction: 0,
          tension: 0,
          duration: 0
        },
  });

  const categoryMatch = pathname.match(/^\/category\/(.*)$/);
  const isArticle = /^\/article\/(.*)$/.test(pathname);
  const isSearch = /^\/search/.test(pathname);
  const isSettings = /^\/account/.test(pathname);
  const isCategory = !!categoryMatch;
  const category = isCategory ? categoryMatch[1] : "";

  const onCloseCategoryPicker = () => {
    toggleCategoryPicker();
  };

  useEffect(() => {
    if (!validating) {
      setHasAccount(isAuthorized ? "has": "none");
    }    
  }, [validating, isAuthorized]);

  if (isArticle || isSettings || isSearch) 
    return null;
    
  return (
    <MainResponsive>     
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"> 
        <CategoryWrapper>
          <TabItem exact to={"/"}>
            {isAccount !== "" && "Headlines"}
          </TabItem>
          <TabItem exact to={"/category/top"}>
            {isAccount === "none" && "Top News"}
            {isAccount === "has" && "Categories"}
          </TabItem>      
          {!validating && <Indicator style={springStyle} />}
        </CategoryWrapper>   
        {(isAccount === "has" && isCategory &&
          (<OptionWrapper>
            <Selector onClick={toggleCategoryPicker}>
              {category.toLowerCase().charAt(0).toUpperCase() + category.slice(1)}
              <MdArrowDropDown />
            </Selector>
            <CategoryPicker
              category={category}
              visible={categoryPicker}
              onClose={onCloseCategoryPicker}
            />
          </OptionWrapper>)
        )}
      </Stack>
    </MainResponsive>
  );
}

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
  ${media.xsmall} {
    width: 100%;
  }
`;

const TabItem = styled(PlainNavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 3rem;
  color: ${themedPalette.text2};
  text-decoration: none;
  transition: 0.25s color ease-in-out;
  font-weight: 600;
  svg {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  &.active {
    color: ${themedPalette.primary2};
  }
  ${media.small} {
    flex: 1;
    font-size: 1rem;
    height: 2.5rem;
  }
`;

const Indicator = styled(animated.div)`
  width: 50%;
  height: 2px;
  background: ${themedPalette.primary2};
  position: absolute;
  bottom: -2px;
  transition: 0.25s left ease-in-out;
  ${media.small} {
    width: 50%;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  ${media.small} {
    justify-content: center;
  }
`;

const Selector = styled.div`
  background: ${themedPalette.bg_element1};
  height: 2rem;
  width: 8rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: ${themedPalette.text2};
  font-size: 0.875rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.75;
    }
  }
  ${media.xsmall} {
    width: 75%;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 0.75rem;
  }
`;

export default HeaderTab;
