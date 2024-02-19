'use client'

import { fetchEmployees, fetchRegistersByQuery, getEmployeeByDni } from "@/app/lib/data";
import { Empleado, Registro } from "@/app/lib/definitions";
import { AddRegister } from "@/app/ui/buttons";
import { ChoferInputOnChange, SelectMonth, SelectYear } from "@/app/ui/registers/inputs";
import { useEffect, useState } from "react";

export default function Page() {

  const [registros, setRegistros] = useState<Registro[]>([])
  const [totalKM, setTotalKm] = useState<number>()

  const [employees, setEmployees] = useState<Empleado[]>([])
  
  const [employeeSelected, setEmployeeSelected] = useState<Empleado>()
  const [month, setMonth] = useState<string>()
  const [year, setYear] = useState<string>()

  const [click, setClick] = useState<boolean>(false)
  
  useEffect(() => {
    fetchEmployees()
      .then((data) => {
        setEmployees(data || [])
      })
  }, [])
  
  
  useEffect(() => {
    // dni harcodeado de prueba
    setRegistros([])
    if (employeeSelected && month && year) {
      fetchRegistersByQuery(employeeSelected?.dni, month, year)
        .then((data) => {
          setRegistros(data || [])
        })
    }
  }, [employeeSelected, month, year])

  useEffect(() => {
    if (employeeSelected && employeeSelected.isCamionero === false) {
      if (registros.length > 0) {
        const totalKmReduce: number = registros.reduce(
          (accumulator, current) => accumulator + current.kmViaje, 0
        )
        setTotalKm(totalKmReduce)
      }
    } else {
      setTotalKm(0)
    }
  },[registros])

  const onHandlingClick = async () => {
    // console.log(employees)
    // console.log("Registros: ", registros)
    // console.log(totalKM)
    // console.log("Empleado seleccionado: ", employeeSelected)
    // console.log("Mes: ", month)
    // console.log("Año: ", year)
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
      <div className="mt-4 flex gap-4">
        <ChoferInputOnChange 
          employees={employees} 
          name="chofer"
          setEmployeeSelected={setEmployeeSelected}  
        />
        <SelectMonth setMonth={setMonth}/>
        <SelectYear setYear={setYear} />
        <button type="button" onClick={onHandlingClick}>
          Filtrar
        </button>
      </div>
        <h3>Total KM: {totalKM}</h3>
    </section>
    )
}