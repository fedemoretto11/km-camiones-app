'use client'

import { getRegisterById } from "@/app/lib/data";
import { Registro } from "@/app/lib/definitions";
import EditFormRegisters from "@/app/ui/registers/EditFormRegisters";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: {id: string} }) {

  const [registro, setRegistro] = useState<Registro>()

  const id = params.id

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const data = await getRegisterById(id)
        setRegistro(data as Registro)
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    fetchEmpleado()
  }, [])

  return ( 

    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-3xl"><span className="text-gray-400">Registros / </span>Editar</h1>
      </div>

      <EditFormRegisters  register={registro}/>
    </main>



  )
}