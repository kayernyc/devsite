'use client'

import Link from "next/link";
import { useSelectedLayoutSegment } from 'next/navigation';

export const NavLink = ({href, children, className}: {href: string, children: React.ReactNode, className?:string}) => {
  let segment = useSelectedLayoutSegment();
  let active = href == `/${segment ?? ''}` ? `1px solid red`: '';

  return <Link href={href} className={className} style={{borderBottom: active}}>{children}</Link>
}
