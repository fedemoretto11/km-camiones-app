'use client'

import Link from "next/link";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { Registro, Vehiculo } from "@/app/lib/definitions";
import { editRegister } from "@/app/lib/actions";
import { ChoferInput, FechaInput, VehiculoInput, KmFinales, Litros, ResumenOutput, Observaciones, TicketNumberInput } from "./inputs";
import { UNEDITABLE_INPUT } from "@/app/lib/const";



export default function EditFormRegisters({ register }: {register: Registro | undefined}){

  const [vehicleSelected, setVehicleSelected] = useState<Vehiculo | undefined>(register?.vehiculo)
  const [hasCodriver, setHasCodriver] = useState<boolean>(false)
  

  useEffect(() => {
    register?.ayudante ? setHasCodriver(true) : setHasCodriver(false)
  },[register])
    

  return (
    <form action={editRegister}>
      <div className="w-full rounded-md bg-gray-50 p-6">

        <TicketNumberInput ticket={register?.ticket} className={UNEDITABLE_INPUT}/>
        {
          register?.vehiculo &&
            <VehiculoInput 
              setVehicleSelected={setVehicleSelected} 
              defaultSelectedValue={register?.vehiculo}
            />

        }
        {/* Tiene acompañante? */}
        <div className="flex flex-1 items-center gap-6">
          {
            register?.chofer && 
            <ChoferInput 
            name="chofer"
            defaultValue={register?.chofer ? register.chofer.dni : ''}
          />
          }
          <label htmlFor="hasCodriver" className="block mb-2 text-sm font-medium">Tiene acompañante</label>
          <div className="relative">
            <input 
              type="checkbox" 
              name="hasCodriver" 
              id="hasCodriver" 
              checked={hasCodriver}
              onChange={() => {setHasCodriver(!hasCodriver)}}
              />
          </div>
          {
            hasCodriver &&
            <ChoferInput 
              name="codriver"
              defaultValue={register?.ayudante ? register.ayudante.dni : ''}
            />
          }
        </div>
        <FechaInput 
          fecha={register?.fecha}
          // className={UNEDITABLE_INPUT}
        />
        <KmFinales value={register?.kmFinales} className={UNEDITABLE_INPUT}/>
        <Litros value={register?.litrosCargados} className={UNEDITABLE_INPUT}/>

        <Observaciones defaultValue={register?.observaciones ? register.observaciones : ''}/>

        <div className="flex flex-1 flex-col w-96">
          <ResumenOutput  valor={register?.kmIniciales ?? ''} name="kmIniciales" label="KM Iniciales" />
          <ResumenOutput  valor={register?.kmViaje ?? ''} name="kmRecorridos" label="KM Recorridos" />
          <ResumenOutput  valor={register?.consumo ?? ''} name="consumo" label="Consumo cada 100 KM" />
        </div>

        <div className="flex mt-6 justify-end gap-4">
          <Link
            href='/dashboard/vehicles'
            className="flex h-10 items-center justify-center px-4 rounded-lg bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          
          {/* <Button type="button" className="border-2 border-blue-400 bg-gray-100 text-blue-400 hover:text-gray-100">Limpiar</Button> */}
          <Button type="submit" >Editar</Button>
        </div>

      </div>
    </form>
  )

}