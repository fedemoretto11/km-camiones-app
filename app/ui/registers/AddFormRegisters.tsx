'use client'

import Link from "next/link";
import { Button } from "../Button";
import { useEffect, useMemo, useState } from "react";
import { Empleado, Vehiculo } from "@/app/lib/definitions";
import { fetchEmployees } from "@/app/lib/data";
import { createRegister } from "@/app/lib/actions";
import { ChoferInput, FechaInput, VehiculoInput, KmFinales, Litros, ResumenOutput, Observaciones, TicketNumberInput } from "./inputs";



export default function AddFormRegisters(){

  // const [vehicles, setVehicles] = useState<Vehiculo[]>([])
  // const [employees, setEmployees] = useState<Empleado[]>([])

  const [vehicleSelected, setVehicleSelected] = useState<Vehiculo>()

  const [hasCodriver, setHasCodriver] = useState<boolean>(false)

  const [kmTicket, setKmTicket] = useState<number>()
  const [kmRecorridos, setKmRecorridos] = useState<number>()
  const [litros, setLitros] = useState<number>()

  // useEffect(() => {
  //   fetchEmployees()
  //     .then((data: Empleado[] | undefined) => {
  //       setEmployees(data ?? [])
  //     })
  //     .catch((error) => {
  //       console.log("Error al cargar Empleados: ", error)
  //     })
  // },[])

  useEffect(() => {
    if (kmTicket && vehicleSelected) {
      setKmRecorridos(kmTicket - vehicleSelected?.kmTotales)
    }

  }, [kmTicket])


  const consumo = useMemo(() => {
    if (litros && kmRecorridos) {
      const consumoCalculado = (litros / kmRecorridos) * 100;
      return parseFloat(consumoCalculado.toFixed(2))
    }
    return 0
  }, [litros, kmRecorridos])


  return (
    <form action={createRegister}>
      <div className="w-full rounded-md bg-gray-50 p-6">

        <TicketNumberInput />
        <VehiculoInput setVehicleSelected={setVehicleSelected} defaultValue=''/>
        {/* Tiene acompañante? */}
        <div className="flex flex-1 items-center gap-6">
          <ChoferInput name="chofer" defaultValue=''/>
          <label htmlFor="hasCodriver" className="block mb-2 text-sm font-medium">Tiene acompañante</label>
          <div className="relative">
            <input 
              type="checkbox" 
              name="hasCodriver" 
              id="hasCodriver" 
              onChange={() => {setHasCodriver(!hasCodriver)}}
              />
          </div>
          {
            hasCodriver &&
              <ChoferInput name="codriver" defaultValue=''/>
          }
        </div>
        <FechaInput />
        <KmFinales setKmTicket={setKmTicket}/>
        <Litros setLitros={setLitros}/>

        <Observaciones />

        <div className="flex flex-1 flex-col w-96">
          <ResumenOutput  valor={vehicleSelected?.kmTotales ?? ''} name="kmIniciales" label="KM Iniciales" />
          <ResumenOutput  valor={kmRecorridos ?? ''} name="kmRecorridos" label="KM Recorridos" />
          <ResumenOutput  valor={consumo ?? ''} name="consumo" label="Consumo cada 100 KM" />
        </div>

        <div className="flex mt-6 justify-end gap-4">
          <Link
            href='/dashboard/vehicles'
            className="flex h-10 items-center justify-center px-4 rounded-lg bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          
          {/* <Button type="button" className="border-2 border-blue-400 bg-gray-100 text-blue-400 hover:text-gray-100">Limpiar</Button> */}
          <Button type="submit" >Crear</Button>
        </div>

      </div>
    </form>
  )

}