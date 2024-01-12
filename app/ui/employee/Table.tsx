import rawData from '@/app/db/empelados-prueba.json'
import { DeleteEmployee, EditEmployee } from './buttons'

export default function Table() {


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
              <th scope="col" className="px-2 py-5 font-medium">
                En camioneros
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                <span className="sr-only">Editar</span>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {
              rawData?.map((employee) => (
                <tr
                  key={employee.dni}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='whitespace-nowrap py-3 pl-6 pr-6'>{employee.dni}</td>
                  <td className='whitespace-nowrap px-7 py-3'>{employee.nombre}</td>
                  <td className='whitespace-nowrap px-7 py-3'>{employee.apellido}</td>
                  <td className='whitespace-nowrap px-3 py-3'>{employee.isCamionero ? 'SI' : 'NO'}</td>
                  <td className='whitespace-nowrap px-7 py-3'>
                    <div className='flex justify-end gap-3'>
                      <EditEmployee dni='38437001'/>
                      <DeleteEmployee dni='38437001'/>
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