'use server'

import { DocumentReference, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getEmployeeByDni, getVehicleById } from './data'
import { EMPLOYEE_COLLECTION_REF, REGISTERS_COLLECTION_REF, VEHICLE_COLLECTION_REF } from './const'
import { Vehiculo } from './definitions'





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

const registerSchema = z.object({
  vehiculo: z.string(),
  chofer: z.string(),
  ayudante: z.string().nullable(),
  fecha: z.coerce.date(),
  kmIniciales: z.coerce.number(),
  kmFinales: z.coerce.number(),
  kmViaje: z.coerce.number(),
  litrosCargados: z.coerce.number(),
  consumo: z.coerce.number(),
  observaciones: z.string().nullable()
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
    const vehicleDocRef: DocumentReference = doc(VEHICLE_COLLECTION_REF, vehiculo.patente)
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
    const vehicleDocRef: DocumentReference = doc(VEHICLE_COLLECTION_REF, vehiculo.patente)
    await updateDoc(vehicleDocRef, vehiculo)
  } catch (error) {
    console.error("Error creating vehicle:", error);
  }
  revalidatePath('/dashboard/vehicles')
  redirect('/dashboard/vehicles')
  
}

export async function deleteVehicle(patente: string) {
  try {
    const vehicleDocRef: DocumentReference = doc(VEHICLE_COLLECTION_REF, patente)
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
    const employeeReference: DocumentReference = doc(EMPLOYEE_COLLECTION_REF, employee.dni)
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
    const employeeReference: DocumentReference = doc(EMPLOYEE_COLLECTION_REF, employee.dni)
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
    const vehicleDocRef: DocumentReference = doc(EMPLOYEE_COLLECTION_REF, dni)
    await deleteDoc(vehicleDocRef)
    revalidatePath('/dashboard/employees')
    redirect('/dashboard/employees')
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return 1
  }
}


export async function createRegister(formData: FormData) {



  const registro = registerSchema.parse({
    vehiculo: formData.get("reparto"),
    chofer: formData.get("chofer"),
    ayudante: formData.get("codriver"),
    fecha: formData.get("fecha"),
    kmIniciales: formData.get("kmIniciales"),
    kmFinales: formData.get("kmFinales"),
    kmViaje: formData.get("kmRecorridos"),
    litrosCargados: formData.get("litros"),
    consumo: formData.get("consumo"),
    observaciones: formData.get("observaciones")
  })

  // console.log(registro)
  const vehicle = await getVehicleById(registro.vehiculo)
  

  try {
    if (vehicle) {
      const vehicleDocRef: DocumentReference = doc(VEHICLE_COLLECTION_REF, vehicle.patente)
      const registerRef: DocumentReference = doc(REGISTERS_COLLECTION_REF)
      await updateDoc(vehicleDocRef, {
        kmTotales: registro.kmFinales
      })
      await setDoc(registerRef, registro)
    }
  } 
  catch (error) {
    console.error("Error creating vehicle:", error);
  }
  finally {
    console.log("Registro creado exitosamente", registro)
    revalidatePath('/dashboard/registers')
    redirect('/dashboard/registers')
  }
}