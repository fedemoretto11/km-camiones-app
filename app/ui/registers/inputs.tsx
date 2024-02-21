import { MONTHS, UNEDITABLE_INPUT, YEARS } from "@/app/lib/const";
import { fetchEmployees, fetchVehicles } from "@/app/lib/data";
import { Empleado, Vehiculo } from "@/app/lib/definitions";
import { CalculatorIcon, CalendarDaysIcon, DocumentTextIcon, TicketIcon, TruckIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";

type VehiculoSelectionProps = {
  setVehicleSelected?: (vehicle: Vehiculo | undefined) => void;
  defaultSelectedValue?: Vehiculo
} & React.SelectHTMLAttributes<HTMLSelectElement>;

type EmployeeSelectionProps = {
  employees: Empleado[];
  name: string;
  setEmployeeSelected: (employee: Empleado | undefined) => void;
  employee?: Empleado;
}

const LABEL_STYLES = 'block w-28 text-sm font-medium'



export async function VehiculoInput({ defaultSelectedValue, setVehicleSelected, ...rest }: VehiculoSelectionProps) {

  const [vehicles, setVehicles] = useState<Vehiculo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVehicles = await fetchVehicles();
        setVehicles(fetchedVehicles ?? []);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mb-4 flex gap-6 items-center">
      <label htmlFor="reparto" className={LABEL_STYLES}>Reparto</label>
      <div className="relative flex-1">
        <select
          id="reparto"
          name="reparto"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={defaultSelectedValue?.patente ?? ''}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const selectedVehicle = vehicles.find(vehicle => vehicle.patente === event.target.value);
            setVehicleSelected ? setVehicleSelected(selectedVehicle) : console.log("hola");
          }}
          {...rest}
        >
          <option value="" disabled selected>
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

export async function ChoferInput({name, className, ...rest}: { name: string} & React.SelectHTMLAttributes<HTMLSelectElement>) {

  const [employees, setEmployees] = useState<Empleado[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEmployees = await fetchEmployees();
        setEmployees(fetchedEmployees || []);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="mb-4 flex gap-6 items-center">
      <label htmlFor={name} className={LABEL_STYLES}>
        {name == 'chofer' ? "Chofer" : "Acompañante"}
      </label>
      <div className="relative flex-1">
      <select
        id={name}
        name={name}
        className={clsx("peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500", className)}
        {...rest}
      >
        <option value="" disabled selected>
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

export function ChoferInputOnChange({employees, name, setEmployeeSelected}: EmployeeSelectionProps) {
  return (
    <div className="mb-4 flex-1">
      {/* <label htmlFor={name} className={LABEL_STYLES}>
        {name == 'chofer' ? "Chofer" : "Acompañante"}
      </label> */}
      <div className="relative">
      <select
        id={name}
        name={name}
        className="h-10 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue=""
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          const selectedEmployee = employees.find(employee => employee.dni === event.target.value);
          setEmployeeSelected(selectedEmployee)
        }}
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

export function FechaInput({ fecha, className, ...rest }: { fecha?: Date | undefined} & React.InputHTMLAttributes<HTMLInputElement>) {

  const maxDate: Date = new Date()
  maxDate.setHours(0, 0, 0, 0);
  maxDate.toString()
  const maxFormattedDate: string = maxDate.toISOString().split('T')[0]

  let actualDateString: string | undefined = '';
  if (fecha) {
    const fechaTimestamp: any = fecha;
    const fechaModify = new Date(fechaTimestamp.seconds * 1000)
    fechaModify.toString()
    actualDateString = fechaModify.toISOString().split('T')[0]
  }


  return (
    <div className="mb-4 flex gap-6 items-center">
      <label htmlFor="fecha" className={LABEL_STYLES}>Fecha</label>
      <div className="relative flex-1">
        <input
          id="fecha"
          name="fecha"
          type="date"
          placeholder="Ingrese la fecha" 
          className={clsx("peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500", className)}
          defaultValue={actualDateString}
          max={maxFormattedDate}
          {...rest}
        />
        <CalendarDaysIcon
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  )
}

export function KmFinales({ setKmTicket, className,  ...rest } : { setKmTicket?: (value: number | undefined) => void} & React.InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className="mb-4 flex gap-6 items-center">
      <label htmlFor="kmFinales" className={LABEL_STYLES}>KM Ticket</label>
      <div className="relative flex-1">
        <input
          id="kmFinales"
          name="kmFinales"
          type="number"
          placeholder="Ingrese los kilometros" 
          className={clsx("peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500", className)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setKmTicket ? setKmTicket(Number(event.target.value)) : '';
          }}
          {...rest}
        />
        <CalculatorIcon
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  )
}

export function Litros({setLitros, className, ...rest}: {setLitros?: (value: number | undefined) => void} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-4 flex gap-6 items-center">
      <label htmlFor="litros" className={LABEL_STYLES}>Litros Cargados</label>
      <div className="relative flex-1">
        <input
          id="litros"
          name="litros"
          type="text"
          placeholder="Ingrese los litros cargados" 
          className={clsx("peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500", className)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLitros ? setLitros(parseFloat(event.target.value)) : '';
          }}
          {...rest}
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
      <label htmlFor={name} className={LABEL_STYLES}>{label}</label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type="number"
          placeholder="Seleccione un vehiculo para ver los KM" 
          className={clsx("peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500", UNEDITABLE_INPUT)}
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

export function Observaciones({ ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="mb-4 flex gap-6 items-center">
      <label htmlFor="observaciones" className={LABEL_STYLES}>Observaciones</label>
      <div className="relative flex-1">
        <textarea
          id="observaciones"
          name="observaciones"
          placeholder="Observaciones" 
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          {...rest}
        />
        <DocumentTextIcon
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-4 text-gray-500"
        />
      </div>
    </div>
  )
}

export function SelectMonth({setMonth}: {setMonth: (month: string) => void }) {
  return (
    <div className="mb-4 flex-1">
      {/* <label htmlFor="mes" className="block mb-2 text-sm font-medium">
        {name == 'chofer' ? "Chofer" : "Acompañante"}
      </label> */}
      <div className="relative">
      <select
        id="mes"
        name="mes"
        className="h-10 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue=""
        onChange={(event) => setMonth(event.target.value)}
      >
        <option value="" disabled>
          Seleccione un mes
        </option>
        {
          MONTHS.map((mes, index) => (
            <option
              value={index}
              key={index}
            >
              {mes}
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

export function SelectYear({setYear}: {setYear: (year: string) => void }) {
  return (
    <div className="mb-4 flex-1 ">
      {/* <label htmlFor="year" className="block mb-2 text-sm font-medium">
        {name == 'chofer' ? "Chofer" : "Acompañante"}
      </label> */}
      <div className="relative">
      <select
        id="year"
        name="year"
        className="h-10 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue=""
        onChange={(event) => setYear(event.target.value)}
      >
        <option value="" disabled>
          Seleccione el año
        </option>
        {
          YEARS.map((year, index) => (
            <option
              value={year}
              key={index}
            >
              {year}
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

export function TicketNumberInput({ ticket, className, ...rest }: { ticket?: string | undefined} & React.InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className="mb-4 flex gap-6 items-center">
      <label htmlFor="ticketNumber" className={LABEL_STYLES}>N° Ticket</label>
      <div className="relative flex-1">
        <input
          id="ticketNumber"
          name="ticketNumber"
          type="text"
          placeholder="Ingrese el numero de Ticket" 
          className={clsx("peer block w-full rounded-md border broder-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500", className)}
          defaultValue={ticket}
          {...rest}
        />
        <TicketIcon
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  )
}