import Search from "@/app/ui/Search";

export default function Page() {


  return (
    <section className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl">Empleados</h1>
      </div>

      <div>
        <Search placeholder="Buscar empleado"/>

      </div>
    </section>
    )
}
