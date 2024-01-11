import Link from "next/link";
import Navlinks from "./NavLinks";
import Image from "next/image";
import logoArcor from '@/public/logo-arcor.webp'


export default function Sidebar() {

  return (
    <section className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        href='/dashboard'
        className="mb-2 flex h-20 justify-center items-center rounded-md bg-blue-900 p-4 md:h-40"
      >
        <Image
          src={logoArcor}
          width={150}
          height={150}
          alt="Logo Arcor"
        ></Image>
      </Link>
      <div>
        <Navlinks />
      </div>
    </section>
  )
}