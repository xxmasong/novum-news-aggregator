'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import OutsideClickHandler from 'react-outside-click-handler';
import { themedPalette } from '@/styles/themes';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export type CategoryPickerProps = {
  category: string;
  visible: boolean;
  onClose: (e: any) => void;
};

function CategoryPicker({ category, visible, onClose }: CategoryPickerProps) {
  const router = useRouter();
  const {user} = useAuth();
  const [categories, setCategories] = useState<string[]>([]);
  const transition = useTransition(visible, {
    from: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    config: {
      tension: 350,
      friction: 26,
    },
  });

  const handleNavigate = (c: string) => {
    router.push("/category/" + c);
    // onClose(null); // Assuming onClose doesn't strictly require event object or we can mock it?
    // Actually onClick passes event.
  };

  useEffect(() => {
    if (user && user.categories) {
      const categories = user.categories;
      setCategories(
        Object.entries(categories)
          .filter(([_, value]) => value === true)
          .map(([category]) => category)
      );
    }
  }, [user]);

  return (
    <>
      {!!categories.length && transition((styles, item) =>
        item ? (
          <Aligner>
            <OutsideClickHandler onOutsideClick={onClose}>
              <Block style={styles} onClick={onClose}>
                <ul>
                  {categories.map((c: string) => (
                    <li
                      key={c}
                      onClick={() => handleNavigate(c)}
                      className={c === category ? 'active' : ''}
                    >
                      {c.toLowerCase().charAt(0).toUpperCase() + c.slice(1)}
                    </li>
                  ))}
                </ul>
              </Block>
            </OutsideClickHandler>
          </Aligner>
        ) : null,
      )}
    </>
  );
}

const Aligner = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 5;
`;

const Block = styled(animated.div)`
  margin-top: 0.5rem;
  width: 12rem;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  background: ${themedPalette.bg_element1};
  color: ${themedPalette.text1};
  transform-origin: top right;
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  li {
    cursor: pointer;
    &:hover {
      background: ${themedPalette.bg_element2};
    }
    font-weight: 600;

    font-size: 0.75rem;
    padding: 0.75rem 1rem;

    &.active {
      color: ${themedPalette.primary1};
    }
  }
  li + li {
    border-top: 1px solid ${themedPalette.border4};
  }
  .contact {
    border-top: 1px solid #f1f3f5;
    padding: 1rem;
    h5 {
      margin: 0;
      font-size: 0.75rem;
    }
    .email {
      color: ${themedPalette.text1};
      font-size: 0.75rem;
    }
  }
`;

export default CategoryPicker;
