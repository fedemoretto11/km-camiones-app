import { PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { deleteEmployee, deleteVehicle } from "../lib/actions"


export function AddEmployee() {

  return (
    <Link
      href='/dashboard/employees/add'
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span>Agregar Empleado</span>
      <UserPlusIcon className="h-5 ml-4"/>
    </Link>
  )
}


export function EditEmployee({ dni }: { dni: string }){

  return (
    <Link
      href={`/dashboard/employees/${dni}/edit`}
      className="rounded-md border p-2 hover:bg-gray-200"
    >
      <PencilIcon className="w-5"/>
    </Link>
  )

}


export function DeleteEmployee({ dni }: { dni: string }) {

  const deleteEmployeeWithDni = deleteEmployee.bind(null, dni)
  
  return (
    
    <form action={deleteEmployeeWithDni}>
      <button className="rounded-md border p-2 hover:bg-gray-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  )

}


export function AddVehicle() {

  return (
    <Link
      href='/dashboard/vehicles/add'
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span>Agregar Vehiculo</span>
      <PlusCircleIcon className="h-5 ml-4"/>
    </Link>
  )
}



export function EditVehicle({ patente }: { patente: string }){

  return (
    <Link
      href={`/dashboard/vehicles/${patente}/edit`}
      className="rounded-md border p-2 hover:bg-gray-200"
    >
      <PencilIcon className="w-5" />
    </Link>
  )

}

export function DeleteVehicle({ patente }: { patente: string }) {


  const deleteVehicleWithPlate = deleteVehicle.bind(null, patente)

  
  return (
    
    <form action={deleteVehicleWithPlate}>
      <button className="rounded-md border p-2 hover:bg-gray-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  )

}