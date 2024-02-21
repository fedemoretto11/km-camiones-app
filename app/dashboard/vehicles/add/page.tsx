import AddFormVehicle from "@/app/ui/vehicles/AddFormVehicle";

export default function Page() {

  return (
    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-3xl"><span className="text-gray-400">Vehiculos / </span>Agregar</h1>
      </div>

      <AddFormVehicle />
    </main>
  )

}