import * as React from 'react';
import styled from 'styled-components';

const PageTemplateBlock = styled.div`
  padding-bottom: 4rem;
`;

interface PageTemplateProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  style,
  className,
  children,
}) => {
  return (
    <PageTemplateBlock style={style} className={className}>
      {children}
    </PageTemplateBlock>
  );
};

export default PageTemplate;
