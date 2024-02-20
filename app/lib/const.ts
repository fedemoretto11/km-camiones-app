import { CollectionReference, collection } from "firebase/firestore"
import { db } from "../db/firebase"
import { 
  HomeIcon, 
  UserIcon, 
  TruckIcon, 
  ArchiveBoxIcon 
} from "@heroicons/react/16/solid"

export const LINKS = [
  {
    name: 'Inicio',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Empleados',
    href: '/dashboard/employees',
    icon: UserIcon
  },
  {
    name: 'Vehiculos',
    href: '/dashboard/vehicles',
    icon: TruckIcon
  },
  {
    name: 'Registros',
    href: '/dashboard/registers',
    icon: ArchiveBoxIcon
  },
  
]

export const VEHICLE_COLLECTION_REF: CollectionReference = collection(db, "vehiculos")
export const EMPLOYEE_COLLECTION_REF: CollectionReference = collection(db, "empleados")
export const REGISTERS_COLLECTION_REF: CollectionReference = collection(db, "registros")

export const MONTHS: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export const YEARS: string[] = ["2024"]

export const UNEDITABLE_INPUT = 'bg-slate-200 border focus:border-transparent focus:outline-none hover:cursor-default caret-transparent'