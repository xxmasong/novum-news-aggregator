'use client';

import styled from 'styled-components';
import PageTemplate from '@/components/templates/PageTemplate';
import SettingRowsContainer from '@/components/organisms/setting/SettingRowsContainer';
import media from '@/styles/media';
import SettingUserProfileContainer from '../organisms/setting/SettingUserProfileContainer';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export type SettingPageProps = {};

function SettingPage(props: SettingPageProps) {
  const { user, validating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!validating && !user) {
      router.push('/');
    }
  }, [user, validating, router]);

  if (validating || !user) {
    return null; 
  }

  return (
    <SettingTemplate>
      <main>
        <SettingUserProfileContainer />
        <SettingRowsContainer />
      </main>
    </SettingTemplate>
  );
}

export const SettingTemplate = styled(PageTemplate)`
  main {
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    width: 768px;
    padding-bottom: 5rem;
    ${media.medium} {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    ${media.small} {
      width: 100%;
      margin-top: 1.5rem;
    }
  }
`;

export default SettingPage;
