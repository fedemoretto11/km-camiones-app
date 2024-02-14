'use client'

import Search from "@/app/ui/Search";


import { AddVehicle } from "@/app/ui/buttons";
import TableVehicle from "@/app/ui/vehicles/TableVehicle";

import { Vehiculo } from "@/app/lib/definitions";
import { fetchVehicles } from "@/app/lib/data";
import { useEffect, useState } from "react";
import { QueryDocumentSnapshot, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/db/firebase";



export default function Page() {

  const [vehicles, setVehicles] = useState<Vehiculo[]>([])

  useEffect(() => {
    fetchVehicles()
      .then((data: Vehiculo[] | undefined) => {
        setVehicles(data ?? [])
        console.log(data)
      })

  },[])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "vehiculos"), (querySnapshot) => {
      const vehicleData: Vehiculo[] = [];
  
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data() as Vehiculo;
        vehicleData.push(data);
      });
  
      setVehicles(vehicleData);
    });
  
    return () => unsubscribe();
  }, []);
  

    
  return (
    <section className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl">Vehiculos</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar vehiculo"/>
        <AddVehicle />
      </div>
      <TableVehicle vehicleData={vehicles}/>
    </section>
    )
}
