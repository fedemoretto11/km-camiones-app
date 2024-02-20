export type Empleado = {
  dni: string;
  nombre: string;
  apellido: string;
  isCamionero: boolean
}

export type Vehiculo = {
  patente: string;
  reparto: string;
  marca: string;
  modelo: string;
  kmTotales: number;
}

export type Registro = {
  ticket: string;
  vehiculo: Vehiculo;
  chofer: Empleado;
  ayudante: null | Empleado;
  fecha: Date;
  kmIniciales: number;
  kmFinales: number;
  kmViaje: number;
  litrosCargados: number;
  consumo: number;
  observaciones: null | string
}