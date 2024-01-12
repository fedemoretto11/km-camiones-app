import EditForm from "@/app/ui/employee/EditForm";
import rawData from '@/app/db/empelados-prueba.json'

export default function Page() {

  const empleado = rawData[0]

  return ( 

    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-3xl"><span className="text-gray-400">Empleados / </span>Editar</h1>
      </div>

      <EditForm  employee={empleado}/>
    </main>



  )
}