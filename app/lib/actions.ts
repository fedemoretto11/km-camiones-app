'use server'

import { DocumentReference, Timestamp, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getEmployeeByDni, getRegisterById, getVehicleById } from './data'
import { EMPLOYEE_COLLECTION_REF, REGISTERS_COLLECTION_REF, VEHICLE_COLLECTION_REF } from './const'



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
  ticket: z.coerce.string(),
  vehiculo: vehicleSchema,
  chofer: employeeSchema,
  ayudante: employeeSchema.nullable(),
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
    console.error("Error updating vehicle:", error);
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
    ticket: formData.get("ticketNumber"),
    vehiculo: await getVehicleById(formData.get("reparto")),
    chofer: await getEmployeeByDni(formData.get("chofer")),
    ayudante: await getEmployeeByDni(formData.get("codriver")),
    fecha: formData.get("fecha"),
    kmIniciales: formData.get("kmIniciales"),
    kmFinales: formData.get("kmFinales"),
    kmViaje: formData.get("kmRecorridos"),
    litrosCargados: formData.get("litros"),
    consumo: formData.get("consumo"),
    observaciones: formData.get("observaciones")
  })

  const registerExists = await getRegisterById(registro.ticket)

  if (registerExists) return 1

  if (registro.ayudante && registro.chofer.dni === registro.ayudante.dni) {
    console.log("No se puede elegir el mismo empleado de chofer y acompañante")
    return 1
  }

  try {
    if (registro.vehiculo) {
      const vehicleDocRef: DocumentReference = doc(VEHICLE_COLLECTION_REF, registro.vehiculo.patente)
      const registerRef: DocumentReference = doc(REGISTERS_COLLECTION_REF, registro.ticket)
      

      await updateDoc(vehicleDocRef, {
        kmTotales: registro.kmFinales
      })
      await setDoc(registerRef, registro)
      return 0
    }
  } 
  catch (error) {
    console.error("Error creating vehicle:", error);
    return 1
  }
  finally {
    console.log("Registro creado exitosamente", registro)
    revalidatePath('/dashboard/registers')
    redirect('/dashboard/registers')
  }
}

export async function editRegister(formData: FormData) {

  const registro = registerSchema.parse({
    ticket: formData.get("ticketNumber"),
    vehiculo: await getVehicleById(formData.get("reparto")),
    chofer: await getEmployeeByDni(formData.get("chofer")),
    ayudante: await getEmployeeByDni(formData.get("codriver")),
    fecha: formData.get("fecha"),
    kmIniciales: formData.get("kmIniciales"),
    kmFinales: formData.get("kmFinales"),
    kmViaje: formData.get("kmRecorridos"),
    litrosCargados: formData.get("litros"),
    consumo: formData.get("consumo"),
    observaciones: formData.get("observaciones")
  })

  
  try {
    const registerRef: DocumentReference = doc(REGISTERS_COLLECTION_REF, registro.ticket)
    await updateDoc(registerRef, registro)
  } catch (error) {
    console.error("Error updating register:", error);
    return 1
  }
  finally {
    console.log("Registro actualizado exitosamente", registro)
    revalidatePath('/dashboard/registers')
    redirect('/dashboard/registers')
  }
}