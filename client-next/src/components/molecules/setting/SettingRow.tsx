import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '@/styles/themes';
import SettingEditButton from './SettingEditButton';
import media from '@/styles/media';

export type SettingRowProps = {
  title: string;
  children: React.ReactNode;
  onClickEdit?: () => void;
  editButton?: boolean;
  description?: string;
};

function SettingRow({
  title,
  children,
  editButton,
  description,
  onClickEdit,
}: SettingRowProps) {
  return (
    <Row>
      <div className="wrapper">
        <div className="title-wrapper">
          <h3>{title}</h3>
        </div>
        <div className="block-for-mobile">
          <div className="contents">
            {children}
            {editButton && (
              <div className="edit-wrapper">
                <SettingEditButton onClick={onClickEdit} customText="Change" />
              </div>
            )}
          </div>
        </div>
      </div>
      {description && <div className="description">{description}</div>}
    </Row>
  );
}

const Row = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  & > .wrapper {
    display: flex;
    ${media.small} {
      flex-direction: column;
    }
  }
  .title-wrapper {
    display: flex;
    width: 8rem;
    flex-shrink: 0;
    align-items: center; 
    h3 {
      line-height: 1.5;
      color: ${themedPalette.text1};
      margin: 0;
      font-size: 1.125rem;
      ${media.small} {
        margin-bottom: 0.5rem;
      }
    }
  }
  .block-for-mobile {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .contents {
    font-size: 1rem;
    color: ${themedPalette.text2};
    line-height: 1.5;
  }
  .description {
    margin-top: 0.875rem;
    color: ${themedPalette.text3};
    font-size: 0.875rem;
  }
  .edit-wrapper {
    display: flex;
    flex: 1;
    margin-top: 1rem;
  }
  & + & {
    border-top: 1px solid ${themedPalette.border4};
    border-bottom: 1px solid ${themedPalette.border4};
  }
`;

export default SettingRow;
