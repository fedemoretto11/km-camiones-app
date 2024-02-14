import { DeleteEmployee, EditEmployee } from '../buttons'
import { Empleado } from '@/app/lib/definitions'

export default function Table({ employeeData } : { employeeData: Empleado[] }) {


return (
  <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 pt-0">
        <table className="min-w-full text-gray-900 table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-6 py-5 font-medium">
                DNI
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Nombre
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Apellido
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                En camioneros
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                <span className="sr-only">Editar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              employeeData?.map((employee) => (
                <tr
                  key={employee.dni}
                  className='w-full border-b py-3 text-sm last-of-type:border-none bg-white [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='whitespace-nowrap py-3 pl-6 pr-6'>{employee.dni}</td>
                  <td className='whitespace-nowrap px-7 py-3'>{employee.nombre}</td>
                  <td className='whitespace-nowrap px-7 py-3'>{employee.apellido}</td>
                  <td className='text-center whitespace-nowrap px-3 py-3'>{employee.isCamionero ? 'SI' : 'NO'}</td>
                  <td className='whitespace-nowrap px-7 py-3'>
                    <div className='flex justify-end gap-3'>
                      <EditEmployee dni={employee.dni}/>
                      <DeleteEmployee dni={employee.dni}/>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

  
}