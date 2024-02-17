'use client'

import { fetchEmployees, fetchRegistersByQuery } from "@/app/lib/data";
import { Empleado, Registro } from "@/app/lib/definitions";
import { Button } from "@/app/ui/Button";
import { AddRegister } from "@/app/ui/buttons";
import { useEffect, useState } from "react";

export default function Page() {

  const [registros, setRegistros] = useState<Registro[]>([])
  const [totalKM, setTotalKm] = useState<number>()

  const [employees, setEmployees] = useState<Empleado[]>([])
  
  const [employeeSelected, setEmployeeSelected] = useState<Empleado>()
  const [date, setDate] = useState<Date>()
  
  useEffect(() => {
    fetchRegistersByQuery("10855133")
      .then((data) => {
        if (data) {
          setRegistros([...registros, ...data])
        }
      })
  }, [])

  useEffect(() => {
    if (registros.length > 0) {
      const totalKmReduce = registros.reduce(
        (accumulator, current) => accumulator + current.kmViaje, 0
      )
      setTotalKm(totalKmReduce)
    }
  },[registros])

  const onHandlingClick = async () => {
    console.log(registros)
    console.log(totalKM)
  }


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
        <button type="button" onClick={onHandlingClick}>
          ver
        </button>
      </div>
    </section>
    )
}