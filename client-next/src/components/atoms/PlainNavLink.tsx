'use client';

import React, { HTMLProps, CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type PlainNavLinkProps = HTMLProps<HTMLAnchorElement> & {
  to: string;
  activeClassName?: string;
  activeStyle?: CSSProperties;
  exact?: boolean;
};

/**
 * Needed when StyledLink has a custom props
 */
const PlainNavLink: React.FC<PlainNavLinkProps> = ({
  to,
  activeClassName,
  activeStyle,
  className,
  children,
  onClick,
  exact,
}) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === to : pathname.startsWith(to);

  return (
    <Link
      href={to}
      className={`${className || ''} ${isActive ? (activeClassName || '') : ''}`}
      style={isActive ? activeStyle : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default PlainNavLink;
