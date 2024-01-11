'use client'

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const LINKS = [
  {
    name: 'Inicio',
    href: '/dashboard'
  },
  {
    name: 'Empleados',
    href: '/dashboard/employees'
  },
  {
    name: 'Vehiculos',
    href: '/dashboard/vehicles'
  },
  {
    name: 'Registros',
    href: '/dashboard/registers'
  },
  
]


export default function Navlinks() {

  const pathname = usePathname()

  return (
    <>
      {
      LINKS.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-700 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-sky-100 text-blue-700': pathname === link.href
            })}
          >
            <p>{link.name}</p>
          </Link>
        )
      })
    }
    </>
  )
}