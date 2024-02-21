'use client'

import { getEmployeeByDni } from "@/app/lib/data";
import { Empleado } from "@/app/lib/definitions";
import EditForm from "@/app/ui/employee/EditForm";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: {id: string} }) {

  const [empleado, setEmpleado] = useState<Empleado>()

  const dni = params.id

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const data = await getEmployeeByDni(dni)
        setEmpleado(data as Empleado)
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    fetchEmpleado()
  }, [dni])

  return ( 

    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-3xl"><span className="text-gray-400">Empleados / </span>Editar</h1>
      </div>

      <EditForm  employee={empleado}/>
    </main>



  )
}