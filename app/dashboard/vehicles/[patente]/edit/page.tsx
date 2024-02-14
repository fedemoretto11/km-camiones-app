'use client'

import { getVehicleById } from "@/app/lib/data";
import { Vehiculo } from "@/app/lib/definitions";
import EditFormVehicle from "@/app/ui/vehicles/EditFormVehicle";
import { useEffect, useState } from "react";


export default function Page({ params }: {params: {patente: string}}) {

  const [vehiculo, setVehiculo] = useState<Vehiculo>();

  const patente = params.patente

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVehicleById(patente);
        setVehiculo(data as Vehiculo);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [patente]);

  return (
    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-3xl"><span className="text-gray-400">Vehiculos / </span>Editar</h1>
      </div>

      <EditFormVehicle vehiculo={vehiculo}/>
    </main>
  )

}