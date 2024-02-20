'use client'

import { LINKS } from "@/app/lib/const"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function Navlinks() {

  const pathname = usePathname()

  return (
    <>
      {
      LINKS.map((link) => {
        const LinkIcon = link.icon
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-700 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-sky-100 text-blue-700': pathname === link.href
            })}
          >
            <LinkIcon className='w-6' />
            <p>{link.name}</p>
          </Link>
        )
      })
    }
    </>
  )
}