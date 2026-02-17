import React from 'react';
import MainTemplate from '@/components/molecules/main/MainTemplate';

export type MainPageTemplateProps = {
  children?: React.ReactNode;
};

function MainPageTemplate({ children }: MainPageTemplateProps) {
  return (
    <MainTemplate>
      {children}
    </MainTemplate>
  );
}

export default MainPageTemplate;
