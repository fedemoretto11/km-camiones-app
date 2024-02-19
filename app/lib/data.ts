'use server'

import { DocumentReference, QueryDocumentSnapshot, and, doc, getDoc, getDocs, or, query, where } from "firebase/firestore"
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


export async function fetchRegistersByQuery(dni: string, month: string, year: string) {

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



  try {
    const q = query(
      REGISTERS_COLLECTION_REF, 
      and(
        where("fecha",">=", fechaDesde),
        where("fecha","<", fechaHasta),
        or(
          where("chofer", "==", dni),
          where("ayudante", "==", dni)
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

export async function getVehicleById(patente: string ) {
  try {
    
    const docRef: DocumentReference = doc(VEHICLE_COLLECTION_REF, patente)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    }


  } catch (error) {
    console.error("Error al cargar datos", error)
  }
}

export async function getEmployeeByDni(dni: string) {
  try {

    const docRef: DocumentReference = doc(EMPLOYEE_COLLECTION_REF, dni)
    const docSnap  = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    }
    
  } catch (error) {
    
  }
}

