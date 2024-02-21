'use client'

import Search from "@/app/ui/Search";
import Table from "@/app/ui/employee/Table";
import { AddEmployee } from "@/app/ui/buttons";
import { useEffect, useState } from "react";
import { Empleado } from "@/app/lib/definitions";
import { fetchEmployees } from "@/app/lib/data";
import { db } from "@/app/db/firebase";
import { QueryDocumentSnapshot, collection, onSnapshot } from "firebase/firestore";



export default function Page() {

  const [empleados, setEmpleados] = useState<Empleado[]>([])

  useEffect(() => {
    fetchEmployees()
      .then((data: Empleado[] | undefined) => {
        setEmpleados(data ?? [])
        console.log(data)
      })
  },[])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "empleados"), (querySnapshot) => {
      const employeeData: Empleado[] = [];
  
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data() as Empleado;
        employeeData.push(data);
      });
  
      setEmpleados(employeeData);
    });
  
    return () => unsubscribe();
  }, []);


  return (
    <section className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl">Empleados</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Buscar empleado"/> */}
        <AddEmployee/>
      </div>
      <Table employeeData={empleados}/>
    </section>
    )
}
