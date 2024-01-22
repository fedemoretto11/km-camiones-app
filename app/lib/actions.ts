'use server'

import { db } from '@/app/db/firebase.js'
import { CollectionReference, DocumentReference, addDoc, collection } from 'firebase/firestore'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
    // const collectionRef: CollectionReference = collection(db, "km-camiones-app")
    // const docRef: DocumentReference = await addDoc(collectionRef, vehiculo)
  } catch (error) {
    
  }
  revalidatePath('/dashboard/vehicles')
  redirect('/dashboard/vehicles')
}


export async function createRegister(formData: FormData) {
  const rawData = {
    
  }
}
