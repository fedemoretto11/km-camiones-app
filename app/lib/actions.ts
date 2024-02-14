'use server'

import { db } from '@/app/db/firebase.ts'
import { CollectionReference, DocumentReference, collection, doc, setDoc, updateDoc } from 'firebase/firestore'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getVehicleById } from './data'

const vehicleSchema = z.object({
  patente: z.string().transform((val) => val.replace(/\s+/g, '').toUpperCase()),
  reparto: z.string().toUpperCase(),
  marca: z.string().toUpperCase(),
  modelo: z.string().toUpperCase(),
  kmTotales: z.coerce.number()
})





export async function createEmployee(formData: FormData) {
  const rawData = {

  }
}





export async function createVehicle( formData: FormData) {

  const vehiculo = vehicleSchema.parse({
    patente: formData.get('patente'),
    reparto: formData.get('reparto'),
    marca: formData.get('marca'),
    modelo: formData.get('modelo'),
    kmTotales: formData.get('kmTotales')
  })

  const vehiculoExists = await getVehicleById(vehiculo.patente)
  console.log(vehiculoExists)

  if (vehiculoExists) {
    return 1
  }

  try {
    const collectionRef: CollectionReference = collection(db, "vehiculos")
    const vehicleDocRef: DocumentReference = doc(collectionRef, vehiculo.patente)
    await setDoc(vehicleDocRef, vehiculo)
  } catch (error) {
    console.error("Error creating vehicle:", error);
  }
  revalidatePath('/dashboard/vehicles')
  redirect('/dashboard/vehicles')

}
export async function editVehicle( formData: FormData) {

  const vehiculo = vehicleSchema.parse({
    patente: formData.get('patente'),
    reparto: formData.get('reparto'),
    marca: formData.get('marca'),
    modelo: formData.get('modelo'),
    kmTotales: formData.get('kmTotales')
  })

  try {
    const collectionRef: CollectionReference = collection(db, "vehiculos")
    const vehicleDocRef: DocumentReference = doc(collectionRef, vehiculo.patente)
    await updateDoc(vehicleDocRef, vehiculo)
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
