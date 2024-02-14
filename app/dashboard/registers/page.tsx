import { AddRegister } from "@/app/ui/buttons";

export default function Page() {


  return (
    <section className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl">Registros</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Buscar vehiculo"/> */}
        <AddRegister />
      </div>
    </section>
    )
}