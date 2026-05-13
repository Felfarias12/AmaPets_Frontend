import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { Mascota, CitaHistorial } from '../../models/mascota.model';
import { FichaClinica, Vacuna } from '../../models/fichaClinica.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, DatePipe, UpperCasePipe],
  templateUrl: './perfil-componentes.html',
  styleUrls: ['./perfil-componentes.scss']
})
export class PerfilComponent {

  seccionActiva: 'mascotas' | 'citas' | 'ficha-clinica' = 'mascotas';
  subSeccionFicha: 'historial' | 'vacunas' | 'medicamentos' = 'historial';

  usuario: Usuario = {
    id: 1,
    nombre: 'Juan García',
    email: 'juan@email.com',
    telefono: '+56 9 1234 5678',
    contrasena: '********',
    edad: 30
  };

  mascotas: Mascota[] = [
    {
      id: 1,
      nombre: 'Luna',
      especie: 'perro',
      raza: 'Golden Retriever',
      edad: 3,
      peso: 28,
      emoji: '🐶',
      colorClase: 'teal'
    },
    {
      id: 2,
      nombre: 'Michi',
      especie: 'gato',
      raza: 'Siamés',
      edad: 5,
      peso: 4,
      emoji: '🐱',
      colorClase: 'coral'
    },
    {
      id: 3,
      nombre: 'Coco',
      especie: 'conejo',
      raza: 'Holland Lop',
      edad: 1,
      peso: 2,
      emoji: '🐰',
      colorClase: 'amber'
    }
  ];

  citas: CitaHistorial[] = [
    {
      id: 1,
      mascotaNombre: 'Luna',
      servicio: 'Consulta general',
      fecha: '2026-05-10',
      hora: '10:00',
      veterinario: 'Dra. Camila Rojas',
      estado: 'confirmada'
    },
    {
      id: 2,
      mascotaNombre: 'Michi',
      servicio: 'Vacunación',
      fecha: '2026-04-22',
      hora: '15:30',
      veterinario: 'Dr. Andrés Méndez',
      estado: 'completada'
    },
    {
      id: 3,
      mascotaNombre: 'Luna',
      servicio: 'Odontología',
      fecha: '2026-03-15',
      hora: '09:00',
      veterinario: 'Dra. Camila Rojas',
      estado: 'completada'
    },
    {
      id: 4,
      mascotaNombre: 'Coco',
      servicio: 'Consulta general',
      fecha: '2026-05-20',
      hora: '11:00',
      veterinario: 'Dra. Valentina Cruz',
      estado: 'pendiente'
    }
  ];

  fichas: FichaClinica[] = [
    {
      id: 1, mascotaId: 1, fecha: '2025-04-10', motivo: 'Control anual',
      veterinario: 'Dr. Andrés Pérez', diagnostico: 'Paciente en buen estado general',
      tratamiento: 'Desparasitación interna y externa', peso: 28.5, temperatura: '38.4°C',
      notas: 'Se recomienda dieta balanceada y ejercicio diario'
    }
  ];

  vacunas: Vacuna[] = [
    { nombre: 'Polivalente', fechaAplicacion: '2025-03-15', proximaDosis: '2026-03-15', lote: 'VAX-2025-031', estado: 'vigente' },
    { nombre: 'Bordetella', fechaAplicacion: '2024-09-10', proximaDosis: '2025-09-10', lote: 'BOR-2024-092', estado: 'vencida' }
  ];

  medicamentos = [
  {
    nombre: 'Nexgard (Antipulgas)',
    fechaInicio: '2026-01-01',
    dosis: '1 comprimido',
    frecuencia: 'Mensual',
    duracion: 'Permanente',
    estado: 'activo'
  },
  {
    nombre: 'Metronidazol 250mg',
    fechaInicio: '2025-12-05',
    dosis: '1 comprimido',
    frecuencia: 'Cada 12 horas',
    duracion: '5 días',
    estado: 'finalizado'
  }
];

  constructor(private router: Router) {}

  cambiarSeccion(seccion: 'mascotas' | 'citas' | 'ficha-clinica'): void {
    this.seccionActiva = seccion;
  }

  cambiarSubSeccion(sub: 'historial' | 'vacunas' | 'medicamentos') {
    this.subSeccionFicha = sub;
  }


  nuevaCita(): void {
    this.router.navigate(['/'], { fragment: 'citas' });
  }

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }

  iniciales(): string {
    return this.usuario.nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  etiquetaEspecie(especie: string): string {
    const map: Record<string, string> = {
      perro: 'Perro', gato: 'Gato',
      conejo: 'Conejo', ave: 'Ave', otro: 'Otro'
    };
    return map[especie] ?? especie;
  }

  formatFecha(fecha: string): string {
    const [y, m, d] = fecha.split('-');
    const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    return `${d} ${meses[parseInt(m) - 1]} ${y}`;
  }

  citasPendientes(): number {
    return this.citas.filter(c => c.estado === 'confirmada' || c.estado === 'pendiente').length;
  }
}
