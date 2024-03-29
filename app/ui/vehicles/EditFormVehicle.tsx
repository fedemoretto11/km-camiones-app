'use client'

import { 
  AtSymbolIcon,
  IdentificationIcon, 
  TruckIcon, 
  UserCircleIcon 
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { Button } from "../Button";
import { Vehiculo } from "@/app/lib/definitions";
import { editVehicle } from "@/app/lib/actions";


export default function EditFormVehicle({ vehiculo }: { vehiculo: Vehiculo | undefined}){

  return (
    <form action={editVehicle}>
      <div className="w-full rounded-md bg-gray-50 p-6">

        {/* patente */}
        <div className="mb-4">
          <label htmlFor="patente" className="block mb-2 text-sm font-medium">Patente</label>
          <div className="relative">
            <input
              id="patente"
              name="patente"
              type="text"
              placeholder="Ingrese la patente" 
              className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={vehiculo?.patente}
            />
            <IdentificationIcon 
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* reparto */}
        <div className="mb-4">
            <label htmlFor="reparto" className="block mb-2 text-sm font-medium">Reparto</label>
            <div className="relative">
              <input
                id="reparto"
                name="reparto"
                type="text"
                placeholder="Ingrese el modelo" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={vehiculo?.reparto}
              />
              <UserCircleIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

        {/* marca */}
        <div className="mb-4">
            <label htmlFor="marca" className="block mb-2 text-sm font-medium">Marca</label>
            <div className="relative">
              <input
                id="marca"
                name="marca"
                type="text"
                placeholder="Ingrese la marca" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={vehiculo?.marca}
              />
              <UserCircleIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* modelo */}
          <div className="mb-4">
            <label htmlFor="modelo" className="block mb-2 text-sm font-medium">Modelo</label>
            <div className="relative">
              <input
                id="modelo"
                name="modelo"
                type="text"
                placeholder="Ingrese el modelo" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={vehiculo?.modelo}
              />
              <UserCircleIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* KM */}
          <div className="mb-4">
            <label htmlFor="kmTotales" className="block mb-2 text-sm font-medium">Kilometros</label>
            <div className="relative">
              <input
                id="kmTotales"
                name="kmTotales"
                type="number"
                placeholder="Ingrese los kilometros" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={vehiculo?.kmTotales}
              />
              <AtSymbolIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
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