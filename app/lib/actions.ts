'use server'

import { db } from '@/app/db/firebase.ts'
import { CollectionReference, DocumentReference, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getEmployeeByDni, getVehicleById } from './data'

const vehicleSchema = z.object({
  patente: z.string().transform((val) => val.replace(/\s+/g, '').toUpperCase()),
  reparto: z.string().toUpperCase(),
  marca: z.string().toUpperCase(),
  modelo: z.string().toUpperCase(),
  kmTotales: z.coerce.number()
})

const employeeSchema = z.object({
  dni: z.coerce.string(),
  nombre: z.string().toUpperCase(),
  apellido: z.string().toUpperCase(),
  isCamionero: z.coerce.boolean()
})


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

export async function deleteVehicle(patente: string) {
  try {
    const collectionRef: CollectionReference = collection(db, "vehiculos")
    const vehicleDocRef: DocumentReference = doc(collectionRef, patente)
    await deleteDoc(vehicleDocRef)
    revalidatePath('/dashboard/vehicles')
    redirect('/dashboard/vehicles')
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return 1
  }
}


export async function createEmployee(formData: FormData) {
  const employee = employeeSchema.parse({
    dni: formData.get('dni'),
    nombre: formData.get('name'),
    apellido: formData.get('lastname'),
    isCamionero: formData.get('union')
  })

  const employeeExists = await getEmployeeByDni(employee.dni)
  
  if (employeeExists) {
    console.log(employeeExists)
    return 1
  }

  try {
    const collectionRef: CollectionReference = collection(db, "empleados")
    const employeeReference: DocumentReference = doc(collectionRef, employee.dni)
    await setDoc(employeeReference, employee)
  } catch (error) {
    console.error("Error creating vehicle:", error);
  }
  revalidatePath('/dashboard/employees')
  redirect('/dashboard/employees')
}

export async function editEmployee (formData: FormData) {
  const employee = employeeSchema.parse({
    dni: formData.get('dni'),
    nombre: formData.get('name'),
    apellido: formData.get('lastname'),
    isCamionero: formData.get('union')
  })

  try {
    const collectionRef: CollectionReference = collection(db, "empleados")
    const employeeReference: DocumentReference = doc(collectionRef, employee.dni)
    await updateDoc(employeeReference, employee)
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return 1
  }
  revalidatePath('/dashboard/employees')
  redirect('/dashboard/employees')
}

export async function deleteEmployee(dni: string) {
  try {
    const collectionRef: CollectionReference = collection(db, "empleados")
    const vehicleDocRef: DocumentReference = doc(collectionRef, dni)
    await deleteDoc(vehicleDocRef)
    revalidatePath('/dashboard/employees')
    redirect('/dashboard/employees')
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return 1
  }
}