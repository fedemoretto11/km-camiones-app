import { CollectionReference, collection } from "firebase/firestore"
import { db } from "../db/firebase"

export const VEHICLE_COLLECTION_REF: CollectionReference = collection(db, "vehiculos")
export const EMPLOYEE_COLLECTION_REF: CollectionReference = collection(db, "empleados")
export const REGISTERS_COLLECTION_REF: CollectionReference = collection(db, "registros")

export const MONTHS: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export const YEARS: string[] = ["2024"]