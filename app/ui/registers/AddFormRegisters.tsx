'use client'

import { 
  AtSymbolIcon,
  CalculatorIcon,
  CalendarDaysIcon,
  TruckIcon, 
  UserCircleIcon 
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { Button } from "../Button";
import { ChangeEvent, useEffect, useState } from "react";
import { Empleado, Vehiculo } from "@/app/lib/definitions";
import { fetchEmployees, fetchVehicles, getVehicleById } from "@/app/lib/data";
import { createRegister } from "@/app/lib/actions";


export default function AddFormRegisters(){

  const [vehicles, setVehicles] = useState<Vehiculo[]>([])
  const [employees, setEmployees] = useState<Empleado[]>([])

  const [vehicleSelected, setVehicleSelected] = useState<Vehiculo>()

  const [hasCodriver, setHasCodriver] = useState<boolean>(false)

  const [kmTicket, setKmTicket] = useState<number>()
  const [kmRecorridos, setKmRecorridos] = useState<number>()
  const [consumo, setConsumo] = useState<number>()
  const [litros, setLitros] = useState<number>()

  useEffect(() => {
    fetchVehicles()
      .then((data: Vehiculo[] | undefined) => {
        setVehicles(data ?? [])
      })

    fetchEmployees()
      .then((data: Empleado[] | undefined) => {
        setEmployees(data ?? [])
      })
  },[])

  useEffect(() => {
    if (kmTicket && vehicleSelected) {
      setKmRecorridos(kmTicket - vehicleSelected?.kmTotales)
    }

  }, [kmTicket])

  useEffect(() => {
    if (litros && kmRecorridos) {
      const consumoCalculado = (litros / kmRecorridos) * 100;
      const consumoRedondeado = parseFloat(consumoCalculado.toFixed(2));
      setConsumo(consumoRedondeado);
    } else {
      setConsumo(0)
    }
  }, [litros, kmRecorridos]);



  return (
    <form action={createRegister}>
      <div className="w-full rounded-md bg-gray-50 p-6">

        {/* Vehiculo */}
        <div className="mb-4">
          <label htmlFor="reparto" className="block mb-2 text-sm font-medium">Reparto</label>
          <div className="relative">
            <select
              id="reparto"
              name="reparto"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const selectedVehicle = vehicles.find(vehicle => vehicle.patente === event.target.value);
                setVehicleSelected(selectedVehicle);
              }}
            >
              <option value="" disabled>
                Reparto
              </option>
              {
                vehicles?.map((vehiculo) => (
                  <option
                    key={vehiculo.patente}
                    value={vehiculo.patente}
                  >
                    Reparto {vehiculo.reparto} || {vehiculo.marca} {vehiculo.modelo} || {vehiculo.patente} 
                  </option>
                ))
              }
            </select>
            <TruckIcon 
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            />
          </div>
          
          
        </div>

        {/* chofer */}
        <div className="mb-4">
          <label htmlFor="chofer" className="block mb-2 text-sm font-medium">Chofer</label>
          <div className="relative">
          <select
            id="chofer"
            name="chofer"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
          >
            <option value="" disabled>
              Chofer
            </option>
            {
              employees?.map((empleado) => (
                <option
                  value={empleado.dni}
                  key={empleado.dni}
                >
                  {empleado.nombre}  {empleado.apellido}
                </option>
              ))
            }
          </select>
            <UserCircleIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>  

        {/* Tiene acompañante */}
        <div className="mb-4 flex gap-6">
          <label htmlFor="hasCodriver" className="block mb-2 text-sm font-medium">Tiene acompañante</label>
          <div className="relative">
            <input 
              type="checkbox" 
              name="hasCodriver" 
              id="hasCodriver" 
              onChange={() => {setHasCodriver(!hasCodriver)}}
              />
          </div>
        </div>


        {/* Acompañante */}
        {
          hasCodriver &&
          <div className="mb-4">
          <label htmlFor="codriver" className="block mb-2 text-sm font-medium">Acopañante</label>
          <div className="relative">
          <select
            id="codriver"
            name="codriver"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
          >
            <option value="" disabled>
              Chofer
            </option>
            {
              employees?.map((empleado) => (
                <option
                  value={empleado.dni}
                >
                  {empleado.nombre}  {empleado.apellido}
                </option>
              ))
            }
          </select>
            <UserCircleIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
        }

        {/* fecha */}
        <div className="mb-4">
          <label htmlFor="fecha" className="block mb-2 text-sm font-medium">Fecha</label>
          <div className="relative">
            <input
              id="fecha"
              name="fecha"
              type="date"
              placeholder="Ingrese la fecha" 
              className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            />
            <CalendarDaysIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* kmIniciales */}
        <div className="mb-4">
          <label htmlFor="kmIniciales" className="block mb-2 text-sm font-medium">KM Iniciales</label>
          <div className="relative">
            <input
              id="kmIniciales"
              name="kmIniciales"
              type="number"
              placeholder="Seleccione un vehiculo para ver los KM" 
              className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={vehicleSelected?.kmTotales}
              readOnly
            />
            <CalculatorIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

          {/* kmFinales */}
          <div className="mb-4">
            <label htmlFor="kmFinales" className="block mb-2 text-sm font-medium">KM Ticket</label>
            <div className="relative">
              <input
                id="kmFinales"
                name="kmFinales"
                type="number"
                placeholder="Ingrese los kilometros" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setKmTicket(Number(event.target.value));
                }}
              />
              <CalculatorIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* kmRecorridos */}
          <div className="mb-4">
            <label htmlFor="kmRecorridos" className="block mb-2 text-sm font-medium">KM Recorridos</label>
            <div className="relative">
              <input
                id="kmRecorridos"
                name="kmRecorridos"
                type="number"
                placeholder="Ingrese los kilometros" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={kmRecorridos}
                
              />
              <CalculatorIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* litros */}
          <div className="mb-4">
            <label htmlFor="litros" className="block mb-2 text-sm font-medium">Litros Cargados</label>
            <div className="relative">
              <input
                id="litros"
                name="litros"
                type="text"
                placeholder="Ingrese los litros cargados" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setLitros(parseFloat(event.target.value));
                }}
                
              />
              <CalculatorIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* consumo */}
          <div className="mb-4">
            <label htmlFor="consumo" className="block mb-2 text-sm font-medium">Consumo cada 100 KM</label>
            <div className="relative">
              <input
                id="consumo"
                name="consumo"
                type="number"
                placeholder="Aqui vera el consumo" 
                className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={consumo}
                readOnly
                
              />
              <CalculatorIcon
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