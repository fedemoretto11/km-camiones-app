import { Empleado, Vehiculo } from "@/app/lib/definitions";
import { CalculatorIcon, CalendarDaysIcon, TruckIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { ChangeEvent } from "react";

type VehiculoSelectionProps = {
  vehicles: Vehiculo[];
  setVehicleSelected: (vehicle: Vehiculo | undefined) => void;
};



export function VehiculoInput({ vehicles, setVehicleSelected }: VehiculoSelectionProps) {
  return (
    <div className="mb-4">
      {/* <label htmlFor="reparto" className="block mb-2 text-sm font-medium">Reparto</label> */}
      <div className="relative">
        <select
          id="reparto"
          name="reparto"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const selectedVehicle = vehicles.find(vehicle => vehicle.patente === event.target.value);
            setVehicleSelected(selectedVehicle);
          }}
        >
          <option value="" disabled>
            Reparto
          </option>
          {
            vehicles?.map((vehiculo) => (
              <option
                key={vehiculo.patente}
                value={vehiculo.patente}
              >
                Reparto {vehiculo.reparto} || {vehiculo.marca} {vehiculo.modelo} || {vehiculo.patente} 
              </option>
            ))
          }
        </select>
        <TruckIcon 
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
        />
      </div>
      
      
    </div>
  )
}

export function ChoferInput({employees, name}: { employees: Empleado[], name: string }) {
  return (
    <div className="mb-4">
      {/* <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {name == 'chofer' ? "Chofer" : "Acompañante"}
      </label> */}
      <div className="relative">
      <select
        id={name}
        name={name}
        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue=""
      >
        <option value="" disabled>
          {name == 'chofer' ? "Chofer" : "Acompañante"}
        </option>
        {
          employees?.map((empleado) => (
            <option
              value={empleado.dni}
              key={empleado.dni}
            >
              {empleado.nombre}  {empleado.apellido}
            </option>
          ))
        }
      </select>
        <UserCircleIcon
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>  
  )
}

export function FechaInput() {
  return (
    <div className="mb-4">
      {/* <label htmlFor="fecha" className="block mb-2 text-sm font-medium">Fecha</label> */}
      <div className="relative">
        <input
          id="fecha"
          name="fecha"
          type="date"
          placeholder="Ingrese la fecha" 
          className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
        />
        <CalendarDaysIcon
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  )
}

export function KmFinales({ setKmTicket } : {setKmTicket: (value: number | undefined) => void}){
  return (
    <div className="mb-4">
      {/* <label htmlFor="kmFinales" className="block mb-2 text-sm font-medium">KM Ticket</label> */}
      <div className="relative">
        <input
          id="kmFinales"
          name="kmFinales"
          type="number"
          placeholder="Ingrese los kilometros" 
          className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setKmTicket(Number(event.target.value));
          }}
        />
        <CalculatorIcon
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  )
}

export function Litros({setLitros}: {setLitros: (value: number | undefined) => void}) {
  return (
    <div className="mb-4">
      {/* <label htmlFor="litros" className="block mb-2 text-sm font-medium">Litros Cargados</label> */}
      <div className="relative">
        <input
          id="litros"
          name="litros"
          type="text"
          placeholder="Ingrese los litros cargados" 
          className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLitros(parseFloat(event.target.value));
          }}
          
        />
        <CalculatorIcon
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  )
}

export function ResumenOutput({ valor, name, label }: {valor: number | undefined, name: string, label: string}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <label htmlFor={name} className="block mb-2 text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type="number"
          placeholder="Seleccione un vehiculo para ver los KM" 
          className="peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          value={valor}
          readOnly
        />
        <CalculatorIcon
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  )
}
