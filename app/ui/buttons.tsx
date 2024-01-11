import { PlusIcon } from "@heroicons/react/16/solid"
import Link from "next/link"


export default function AddEmployee() {

  return (
    <Link
      href='/dashboard/employee/add'
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span>Agregar Empleado</span>
      <PlusIcon className="h-5 ml-4"/>
    </Link>
  )
}