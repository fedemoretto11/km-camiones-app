'use client'

import { 
  AtSymbolIcon,
  IdentificationIcon, 
  TruckIcon, 
  UserCircleIcon 
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { Button } from "../Button";
import { createVehicle } from "@/app/lib/actions";
import { FormEvent, useState } from "react";


export default function AddFormVehicle(){

  const [error, setError] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await createVehicle(formData)
    if (result) {
      setError(true)
    }
  }



  return (
    <form onSubmit={handleSubmit}>
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
              defaultValue=""
            />
            <IdentificationIcon 
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            />
          </div>
          {
            error &&
            <span 
            className="block mb-2 ml-2 text-sm font-medium text-red-700"
          >
            Ya existe un vehiculo con la misma patente
          </span>
          }
          
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
                defaultValue=""
              />
              <UserCircleIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

        {/* marca */}
        <div className="mb-4">
            <label htmlFor="marmca" className="block mb-2 text-sm font-medium">Marca</label>
            <div className="relative">
              <input
                id="marca"
                name="marca"
                type="text"
                placeholder="Ingrese la marca" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
              />
              <AtSymbolIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>



          <div className="flex mt-6 justify-end gap-4">
            <Link
              href='/dashboard/vehicles'
              className="flex h-10 items-center justify-center px-4 rounded-lg bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancelar
            </Link>
            <Button type="submit">Crear</Button>

          </div>
      </div>
    </form>
  )

}