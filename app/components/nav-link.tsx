'use client'

import Link from "next/link";
import { useSelectedLayoutSegment } from 'next/navigation';

export const NavLink = ({href, children}: {href: string, children: React.ReactNode}) => {
  let segment = useSelectedLayoutSegment();
  let active = href == `/${segment ?? ''}` ? `1px solid red`: '';

  return <Link href={href} style={{borderBottom: active}}>{children}</Link>
}