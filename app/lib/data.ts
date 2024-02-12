'use server'

import { CollectionReference, DocumentReference, QueryDocumentSnapshot, collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../db/firebase"
import { Vehiculo } from "./definitions"




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