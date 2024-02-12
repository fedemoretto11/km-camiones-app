'use server'

import { db } from '@/app/db/firebase.ts'
import { CollectionReference, DocumentReference, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import test from '../db/dbTest'

const vehicleSchema = z.object({
  patente: z.string().toUpperCase(),
  reparto: z.string().toUpperCase(),
  marca: z.string().toUpperCase(),
  modelo: z.string().toUpperCase(),
  km: z.coerce.number()
})



export async function createEmployee(formData: FormData) {
  const rawData = {

  }
}





export async function createVehicle(formData: FormData) {

  const vehiculo = vehicleSchema.parse({
    patente: formData.get('patente'),
    reparto: formData.get('reparto'),
    marca: formData.get('marca'),
    modelo: formData.get('modelo'),
    km: formData.get('km')
  })

  console.log(vehiculo)
  
  
  try {
    const collectionRef: CollectionReference = collection(db, "vehiculos")
    const vehicleDocRef: DocumentReference = doc(collectionRef, vehiculo.patente)
    await setDoc(vehicleDocRef, vehiculo)
    console.log("Vehicle created successfully:", vehiculo);
  } catch (error) {
    console.error("Error creating vehicle:", error);
  }
  revalidatePath('/dashboard/vehicles')
  redirect('/dashboard/vehicles')
}


export async function createRegister(formData: FormData) {
  const rawData = {
    
  }
}
