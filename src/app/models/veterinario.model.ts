export interface Veterinario {
  id: number;
  nombre: string;
  rol: string;
  especialidades: string[];
  emoji: string;
  colorClase: 'teal' | 'coral' | 'amber';
  correo?: string;
  contrasena?: string;
}
