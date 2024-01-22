import { 
  collection, 
  addDoc, 
  CollectionReference, 
  DocumentReference 
} from "firebase/firestore"; 
import { db } from '@/app/db/firebase.js'
import { Empleado } from "../lib/definitions";

export default async function test() {
  try {
    const collectionRef: CollectionReference = collection(db, "km-camiones-app");
    const empleado: Empleado = {
      dni: "38437001",
      nombre: "Federico",
      apellido: "Moretto",
      isCamionero: false
    }

    const docRef: DocumentReference = await addDoc(collectionRef, empleado);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}