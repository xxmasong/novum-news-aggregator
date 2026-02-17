import styled from 'styled-components';
import SpinnerBlock from '@/components/atoms/SpinnerBlock';

/**
 * Login with email code
 */
export default function FullLoading() {
   return (
    <Fullscreen>
      <SpinnerBlock />
    </Fullscreen>
  );
}

const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
