'use client'

import { 
  HomeIcon, 
  UserIcon, 
  TruckIcon, 
  ArchiveBoxIcon 
} from "@heroicons/react/16/solid"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const LINKS = [
  {
    name: 'Inicio',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Empleados',
    href: '/dashboard/employees',
    icon: UserIcon
  },
  {
    name: 'Vehiculos',
    href: '/dashboard/vehicles',
    icon: TruckIcon
  },
  {
    name: 'Registros',
    href: '/dashboard/registers',
    icon: ArchiveBoxIcon
  },
  
]


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