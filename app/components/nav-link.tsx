'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  let segment = useSelectedLayoutSegment();
  let currentSegment = href == `/${segment ?? ''}`;
  let active = currentSegment
    ? { borderBottom: `1px solid red;`, pointerEvent: 'none' }
    : undefined;

  return (
    <Link
      aria-disabled={currentSegment}
      role="link"
      href={href}
      className={className}
      style={active}
    >
      {children}
    </Link>
  );
};
