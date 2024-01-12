import { 
  IdentificationIcon, 
  TruckIcon, 
  UserCircleIcon 
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { Button } from "../Button";
import { Empleado } from "@/app/lib/definitions";


export default function EditForm({ employee }: {employee: Empleado}){

  return (
    <form action="">
      <div className="w-full rounded-md bg-gray-50 p-6">

        {/* DNI */}
        <div className="mb-4">
          <label htmlFor="dni" className="block mb-2 text-sm font-medium">DNI</label>
          <div className="relative">
            <input
              id="dni"
              type="text"
              placeholder="Ingrese el dni" 
              className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={employee.dni}
            />
            <IdentificationIcon 
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* Nombre */}
        <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Nombre</label>
            <div className="relative">
              <input
                id="name"
                type="text"
                placeholder="Ingrese el nombre" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={employee.nombre}
              />
              <UserCircleIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Apellido */}
          <div className="mb-4">
            <label htmlFor="lastname" className="block mb-2 text-sm font-medium">Apellido</label>
            <div className="relative">
              <input
                id="lastname"
                type="text"
                placeholder="Ingrese el apellido" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={employee.apellido}
              />
              <UserCircleIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Camioneros */}
          <div className="mb-4">
            <label htmlFor="union" className="mb-2 block text-sm font-medium">
              Pertenece a camioneros
            </label>
            <div className="relative">
              <select
                id="union"
                name="union"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={`${employee.isCamionero ? 'SI' : 'NO'}`}
              >
                <option value="" disabled>
                  Pertenece a camioneros
                </option>
                <option value="true" >
                  SI
                </option>
                <option value="false" >
                  NO
                </option>
              </select>
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="flex mt-6 justify-end gap-4">
            <Link
              href='/dashboard/employees'
              className="flex h-10 items-center justify-center px-4 rounded-lg bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancelar
            </Link>
            <Button type="submit">Editar</Button>

          </div>
      </div>
    </form>
  )

}