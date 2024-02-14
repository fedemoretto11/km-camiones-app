import AddFormRegisters from "@/app/ui/registers/AddFormRegisters";



export default function Page() {

  return (
    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-3xl"><span className="text-gray-400">Registros / </span>Agregar</h1>
      </div>
      <AddFormRegisters />
    </main>
  )

}