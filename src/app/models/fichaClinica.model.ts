export interface FichaClinica {
  id: number;
  mascotaId: number;
  fecha: string;
  motivo: string;
  veterinario: string;
  diagnostico: string;
  tratamiento: string;
  notas?: string;
  peso: number;
  temperatura: string;
}

export interface Vacuna {
  nombre: string;
  fechaAplicacion: string;
  proximaDosis: string;
  lote: string;
  estado: 'vigente' | 'vencida';
}