import rawData from '@/app/db/vehiculos-prueba.json'
import { DeleteVehicle, EditVehicle } from '../buttons'

export default function TableVehicle() {


return (
  <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 pt-0">
        <table className="min-w-full text-gray-900 table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-6 py-5 font-medium">
                Patente
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Marca
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Modelo
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Kilometros
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                <span className="sr-only">Editar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              rawData?.map((vehicle) => (
                <tr
                  key={vehicle.patente}
                  className='w-full border-b py-3 text-sm last-of-type:border-none bg-white [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='whitespace-nowrap py-3 pl-6 pr-6'>{vehicle.patente}</td>
                  <td className='whitespace-nowrap px-7 py-3'>{vehicle.marca}</td>
                  <td className='whitespace-nowrap px-7 py-3'>{vehicle.modelo}</td>
                  <td className='text-center whitespace-nowrap px-3 py-3'>{vehicle.kmTotales}</td>
                  <td className='whitespace-nowrap px-7 py-3'>
                    <div className='flex justify-end gap-3'>
                      <EditVehicle patente='AB194DL'/>
                      <DeleteVehicle patente='38437001'/>
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