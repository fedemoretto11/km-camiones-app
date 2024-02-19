import { Registro } from '@/app/lib/definitions'
import { Timestamp } from 'firebase/firestore';

export default function TableRegisters({ registersData } : { registersData: Registro[] }) {


return (
  <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 pt-0">
        <table className="min-w-full text-gray-900 table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-6 py-5 font-medium">
                Chofer
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Ayudante
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Reparto
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Vehiculo
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Patente
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Fecha
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Kilometros
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Consumo
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                Observaciones
              </th>
              <th scope="col" className="px-6 py-5 font-medium">
                <span className="sr-only">Editar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              registersData?.map((register) => {

                const fechaTimestamp: any = register.fecha;
                const fecha = new Date(fechaTimestamp.seconds * 1000)

                return (
                  (
                    <tr
                      key={register.kmViaje}
                      className='w-full border-b py-3 text-sm last-of-type:border-none bg-white [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                    >
                      <td className='whitespace-nowrap py-3 pl-6 pr-6'>{register.chofer.nombre} {register.chofer.apellido}</td>
                      <td className='whitespace-nowrap px-7 py-3'>{register.ayudante ? `${register.ayudante.nombre} ${register.ayudante.apellido}`: "-"}</td>
                      <td className='whitespace-nowrap px-7 py-3'>{register.vehiculo.reparto}</td>
                      <td className='whitespace-nowrap px-7 py-3'>{register.vehiculo.marca} {register.vehiculo.modelo}</td>
                      <td className='whitespace-nowrap px-7 py-3'>{register.vehiculo.patente}</td>
                      <td className='whitespace-nowrap px-7 py-3'>{fecha.toLocaleDateString('es-AR')}</td>
                      <td className='text-center whitespace-nowrap px-3 py-3'>{register.kmViaje.toLocaleString('es-AR')}</td>
                      <td className='text-center whitespace-nowrap px-3 py-3'>{register.consumo.toLocaleString('es-AR',{
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,})} l/100 km</td>
                      <td className='text-center whitespace-nowrap px-3 py-3'>{register.observaciones ? register.observaciones : "-"}</td>
                      <td className='whitespace-nowrap px-7 py-3'>
                        <div className='flex justify-end gap-3'>
                          {/* <EditVehicle patente={register.patente}/> */}
                          {/* <DeleteVehicle patente={register.patente}/> */}
                        </div>
                      </td>
                    </tr>
                  )
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

  
}