export type Empleado = {
  dni: string;
  nombre: string;
  apellido: string;
  isCamionero: boolean
}

export type Vehiculo = {
  patente: string;
  marca: string;
  modelo: string;
  kmTotales: number;
}

export type Registro = {
  vehiculo: Vehiculo;
  chofer: Empleado;
  ayudante: null | Empleado;
  fecha: Date;
  kmIniciales: number;
  kmFinales: number;
  kmViaje: number;
}