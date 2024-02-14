import { CollectionReference, collection } from "firebase/firestore"
import { db } from "../db/firebase"

export const VEHICLE_COLLECTION_REF: CollectionReference = collection(db, "vehiculos")
export const EMPLOYEE_COLLECTION_REF: CollectionReference = collection(db, "empleados")
export const REGISTERS_COLLECTION_REF: CollectionReference = collection(db, "registros")