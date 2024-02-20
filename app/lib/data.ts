'use server'

import { DocumentReference, QueryDocumentSnapshot, Timestamp, and, doc, getDoc, getDocs, limit, or, orderBy, query, where } from "firebase/firestore"
import { Empleado, Registro, Vehiculo } from "./definitions"
import { EMPLOYEE_COLLECTION_REF, REGISTERS_COLLECTION_REF, VEHICLE_COLLECTION_REF } from "./const"




export async function fetchVehicles(): Promise<Vehiculo[] | undefined> {
  try {

    const querySnapshot = await getDocs(VEHICLE_COLLECTION_REF)
    const vehicleData: Vehiculo[] = [];

    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      const data = doc.data() as Vehiculo;
      vehicleData.push(data)
    })

    return vehicleData

  } catch (error) {
    console.error("Error al cargar datos", error)
  }

}

export async function fetchEmployees(): Promise<Empleado[] | undefined> {
  try {

    const querySnapshot = await getDocs(EMPLOYEE_COLLECTION_REF)
    const employeeData: Empleado[] = [];

    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      const data = doc.data() as Empleado;
      employeeData.push(data)
    })

    return employeeData

  } catch (error) {
    console.error("Error al cargar datos", error)
  }

}

export async function fetchRegistersByQuery(empleado: Empleado, month: string, year: string) {

  const mes = parseInt(month)
  const anio = parseInt(year)
  
  const fechaDesde: Date = new Date();
  fechaDesde.setDate(1);
  fechaDesde.setMonth(mes);
  fechaDesde.setFullYear(anio)
  fechaDesde.setHours(0, 0, 0, 0);

  const fechaHasta: Date = new Date();
  fechaHasta.setDate(1)
  fechaHasta.setMonth(mes == 11 ? 0 : mes + 1)
  fechaHasta.setFullYear(mes == 11 ? anio + 1 : anio)
  fechaHasta.setHours(0, 0, 0, 0)

  const fechaDesdeTimestamp = Timestamp.fromDate(fechaDesde);
  const fechaHastaeTimestamp = Timestamp.fromDate(fechaHasta);



  try {
    const q = query(
      REGISTERS_COLLECTION_REF, 
      and(
        where("fecha",">=", fechaDesdeTimestamp),
        where("fecha","<", fechaHastaeTimestamp),
        or(
          where("chofer", "==", empleado),
          where("ayudante", "==", empleado)
        )
      )
    ) 
    const reg: Registro[] = []

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Registro
      reg.push(data)
    })
    return reg

    
  } catch (error) {
    console.log("Error al cargar datos", error)
  }
}

export async function fetchRegisters() {
  try {
    
    const regData: Registro[] = [];

    const q = query(REGISTERS_COLLECTION_REF, orderBy("fecha"), limit(10));

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      const data = doc.data() as Registro;
      regData.push(data)
    })

    return regData

  } catch (error) {
    console.log("Error al cargar datos", error)
  }
}

export async function getVehicleById(patente: string | FormDataEntryValue | null) {
  try {

    if (patente === null) {
      return null
    }

    const patenteString: string = patente.toString();
    
    const docRef: DocumentReference = doc(VEHICLE_COLLECTION_REF, patenteString)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    }


  } catch (error) {
    console.error("Error al cargar datos", error)
  }
}

export async function getEmployeeByDni(dni: string | FormDataEntryValue | null) {
  try {

    if (dni === null) return null

    const dniString: string = dni.toString()

    const docRef: DocumentReference = doc(EMPLOYEE_COLLECTION_REF, dniString)
    const docSnap  = await getDoc(docRef)

    if (docSnap.exists()) return docSnap.data()

    
  } catch (error) {
    console.log("Error al cargar datos", error)
  }
}

export async function getRegisterById(id: string | FormDataEntryValue | null) {
  try {

    if (id === null) return null

    const idString: string = id.toString()

    const docRef: DocumentReference = doc(REGISTERS_COLLECTION_REF, idString)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) return docSnap.data()
    
  } catch (error) {
    console.log("Error al cargar datos", error)
  }
}

