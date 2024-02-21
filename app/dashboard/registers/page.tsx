'use client'

import { fetchEmployees, fetchRegisters, fetchRegistersByQuery, getEmployeeByDni } from "@/app/lib/data";
import { Empleado, Registro } from "@/app/lib/definitions";
import { Button } from "@/app/ui/Button";
import { AddRegister } from "@/app/ui/buttons";
import TableRegisters from "@/app/ui/registers/TableRegisters";
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

    fetchRegisters()
      .then((data) => {
        setRegistros(data || [])
      })

  }, [])
  
  
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

  useEffect(() => {
    setRegistros([])
    if (employeeSelected && month && year) {
      fetchRegistersByQuery(employeeSelected, month, year)
        .then((data) => {
          setRegistros(data || [])
      })
    }
  }, [click])

  const onHandlingClick = async () => {
    setClick(!click)
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
      <div className="mt-4 flex gap-4 flex-1">
        <ChoferInputOnChange 
          employees={employees} 
          name="chofer"
          setEmployeeSelected={setEmployeeSelected}  
        />
        <SelectMonth setMonth={setMonth}/>
        <SelectYear setYear={setYear} />
        <Button type="button" onClick={onHandlingClick} className="flex-1 justify-center">
          Filtrar
        </Button> 
      </div>
      {
        totalKM !== 0 && 
        <h3 className="p-2 text-3xl text-center border-2 border-blue-500 rounded-lg">Total KM del mes: {totalKM?.toLocaleString('es-AR',{
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,})}</h3>
      }
      <TableRegisters registersData={registros}/>
    </section>
    )
}