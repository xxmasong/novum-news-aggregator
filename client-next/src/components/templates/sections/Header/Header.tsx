import { Fragment } from 'react';
import HeaderDock from './HeaderDock';
import OpaqueLayer from '@/components/atoms/OpaqueLayer';
import AuthModalContainer from '@/components/organisms/auth/AuthModalContainer';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import HeaderTab from './HeaderTab';
import { useEffect, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { getScrollTop } from '@/utils/utils';
import { themedPalette } from '@/styles/themes';

function Header() {
  const layer = useSelector((state: RootState) => state.core.layer);
  const [visible, setVisible] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [marginTop, setMarginTop] = useState(0);
  
  useEffect(() => {
    if (!blockRef.current) return;
    setHeight(blockRef.current.clientHeight);
    setMarginTop(-1 * blockRef.current.clientHeight);
  }, []);

  const prevScrollTop = useRef(0);
  const direction = useRef<'UP' | 'DOWN'>('DOWN');
  const transitionPoint = useRef(0);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';

    if (
      direction.current === 'DOWN' &&
      nextDirection === 'UP' &&
      transitionPoint.current - scrollTop < 0
    ) {
      setVisible(true);
      transitionPoint.current = scrollTop;
    }

    if (
      direction.current === 'UP' &&
      nextDirection === 'DOWN' &&
      scrollTop - transitionPoint.current < -1 * height
    ) {
      transitionPoint.current = scrollTop + height;
    }

    if (scrollTop < 64) {
      setVisible(false);
    }

    setMarginTop(
      Math.min(0, -1 * height + transitionPoint.current - scrollTop),
    );

    direction.current = nextDirection;
    prevScrollTop.current = scrollTop;
  }, [height]);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <Fragment>
      <OpaqueLayer visible={layer} />
      <AuthModalContainer />
      <HeaderDock/>
      <HeaderTab/>
      <FloatingBlock
        style={
          visible
            ? { marginTop: marginTop, display: 'block' }
            : { display: 'none', }
        }
        ref={blockRef}
      >
        <HeaderDock/>
        <HeaderTab />
      </FloatingBlock>
    </Fragment>
  );
}

const FloatingBlock = styled.div`
  position: fixed;
  top: 0;
  background: ${themedPalette.bg_element1};
  width: 100%;
  z-index: 10;
  box-shadow: 0px 0 8px rgba(0, 0, 0, 0.08);
`;

export default Header;
