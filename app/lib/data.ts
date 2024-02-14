'use server'

import { CollectionReference, DocumentReference, QueryDocumentSnapshot, collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../db/firebase"
import { Empleado, Vehiculo } from "./definitions"




export async function fetchVehicles(): Promise<Vehiculo[] | undefined> {
  try {
    const collectionRef: CollectionReference = collection(db, "vehiculos")

    const querySnapshot = await getDocs(collectionRef)
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
    const collectionRef: CollectionReference = collection(db, "empleados")

    const querySnapshot = await getDocs(collectionRef)
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
    const collectionRef: CollectionReference = collection(db, "vehiculos")
    
    const docRef: DocumentReference = doc(collectionRef, patente)
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

    const collectionRef: CollectionReference = collection(db, "empleados")

    const docRef: DocumentReference = doc(collectionRef, dni)
    const docSnap  = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    }
    
  } catch (error) {
    
  }
}