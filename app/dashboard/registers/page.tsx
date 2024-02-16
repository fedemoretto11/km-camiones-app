'use client'

import { fetchEmployees } from "@/app/lib/data";
import { Empleado } from "@/app/lib/definitions";
import { AddRegister } from "@/app/ui/buttons";
import { ChoferInput } from "@/app/ui/registers/inputs";
import { useEffect, useState } from "react";

export default function Page() {

  const [employees, setEmployees] = useState<Empleado[]>([])
  

  useEffect(() => {
    fetchEmployees()
      .then((data: Empleado[] | undefined) => {
        setEmployees(data ?? [])
      })
  }, [])


  return (
    <section className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl">Registros</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Buscar vehiculo"/> */}
        <AddRegister />
      </div>
      <div className="mt-4">
      </div>
    </section>
    )
}