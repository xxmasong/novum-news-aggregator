import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { themedPalette } from '@/styles/themes';
import palette from '@/styles/palette';
import { useSpring, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import SpinnerBlock from './SpinnerBlock';
import { CircularProgress } from '@mui/material';

export type ToggleSwitchProps = {
  name?: string;
  value: boolean;
  onChange: (params: { name: string; value: boolean }) => void;
};

function ToggleSwitch({ value, name, onChange }: ToggleSwitchProps) {
  const [localValue, setLocalValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const layer = useSelector((state: RootState) => state.core.layer);

  const style = useSpring({
    transform: localValue ? 'translate(1.375rem)' : 'translate(0rem)',
    boxShadow: localValue
      ? '-2px 0 4px rgba(0, 0, 0, 0.1)'
      : '2px 0 4px rgba(0, 0, 0, 0.05)',
    config: {
      tension: 200,
      friction: 12,
      clamp: true,
    },
  });

  const toggle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onChange({
      name: name || '',
      value: !localValue,
    });
    setLoading(false);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <>
    {loading ? <CircularProgress /> : 
    <Block active={localValue} onClick={toggle}>
      <animated.div className="circle" style={style} />
    </Block>}
    </>
  );
}

const Block = styled.div<{ active: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 2.875rem;
  height: 1.5rem;
  background: ${palette.gray6};
  transition: 0.125s all ease-in;
  border-radius: 1.125rem;
  padding: 0.125rem;
  ${(props) =>
    props.active &&
    css`
      background: ${themedPalette.primary2};
    `}
  .circle {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.625rem;
    background: ${themedPalette.bg_element1};
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  }
`;

export default ToggleSwitch;
