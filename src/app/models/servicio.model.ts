export interface Servicio {
  id: number;
  icono: string;
  nombre: string;
  descripcion: string;
  precio?: number;
  colorClase: 'teal' | 'coral' | 'amber' | 'purple';
}
