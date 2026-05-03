export interface Cita {
  nombreDuenio: string;
  telefono: string;
  nombreMascota: string;
  especie: 'perro' | 'gato' | 'conejo' | 'ave' | 'otro';
  servicio: string;
  fecha: string;
  hora?: string;
}

export interface Estadistica {
  valor: string;
  etiqueta: string;
}
