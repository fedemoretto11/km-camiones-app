import EditFormVehicle from "@/app/ui/vehicles/EditFormVehicle";
import rawData from '@/app/db/vehiculos-prueba.json'

const vehiculo = rawData[0]

export default function Page() {

  return (
    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-3xl"><span className="text-gray-400">Vehiculos / </span>Editar</h1>
      </div>

      <EditFormVehicle vehiculo={vehiculo}/>
    </main>
  )

}