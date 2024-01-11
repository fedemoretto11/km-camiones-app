import { collection, addDoc } from "firebase/firestore"; 
import db from '@/app/db/firebase.js'

export default async function test() {
  try {
    const docRef = await addDoc(collection(db, "km-camiones-app"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}