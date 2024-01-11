import Search from "@/app/ui/Search";
import AddEmployee from "@/app/ui/buttons";
import Table from "@/app/ui/employee/Table";

export default function Page() {


  return (
    <section className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl">Empleados</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar empleado"/>
        <AddEmployee />
      </div>
      <Table />
    </section>
    )
}
