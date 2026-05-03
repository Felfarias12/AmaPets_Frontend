export interface Mascota {
  id: number;
  nombre: string;
  especie: 'perro' | 'gato' | 'conejo' | 'ave' | 'otro';
  raza: string;
  edad: number;
  peso: number;
  emoji: string;
  colorClase: 'teal' | 'coral' | 'amber' | 'purple';
}

export interface CitaHistorial {
  id: number;
  mascotaNombre: string;
  servicio: string;
  fecha: string;
  hora: string;
  veterinario: string;
  estado: 'confirmada' | 'pendiente' | 'completada' | 'cancelada';
}
