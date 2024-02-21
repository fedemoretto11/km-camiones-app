'use client'

import { getRegisterById } from "@/app/lib/data";
import { Registro } from "@/app/lib/definitions";
import EditFormRegisters from "@/app/ui/registers/EditFormRegisters";
import { RegisterFormSkeleton } from "@/app/ui/skeletons";
import { Suspense, useEffect, useState } from "react";


export default function Page({ params }: { params: {id: string} }) {

  const id = params.id

  const [registro, setRegistro] = useState<Registro>()

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
  }, [params.id])



  return ( 

    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-3xl"><span className="text-gray-400">Registros / </span>Editar</h1>
      </div>
      <Suspense fallback={<RegisterFormSkeleton />}>
        <EditFormRegisters  register={registro}/>
      </Suspense>

    </main>



  )
}