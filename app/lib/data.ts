'use server'

import { DocumentReference, QueryDocumentSnapshot, doc, getDoc, getDocs } from "firebase/firestore"
import { Empleado, Vehiculo } from "./definitions"
import { EMPLOYEE_COLLECTION_REF, VEHICLE_COLLECTION_REF } from "./const"




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