import Search from "@/app/ui/Search";
import Table from "@/app/ui/employee/Table";

import rawData from '@/app/db/vehiculos-prueba.json'
import { AddVehicle } from "@/app/ui/buttons";
import TableVehicle from "@/app/ui/vehicles/TableVehicle";

const HEADERS = ["DNI", "Nombre", "Apellido", "En camioneros"]


export default function Page() {


  return (
    <section className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl">Vehiculos</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar vehiculo"/>
        <AddVehicle />
      </div>
      <TableVehicle />
    </section>
    )
}
