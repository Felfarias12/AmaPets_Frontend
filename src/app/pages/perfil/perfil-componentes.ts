import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Mascota, CitaHistorial } from '../../models/mascota.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil-componentes.html',
  styleUrls: ['./perfil-componentes.scss']
})
export class PerfilComponent {

  seccionActiva: 'mascotas' | 'citas' = 'mascotas';

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

  constructor(private router: Router) {}

  cambiarSeccion(seccion: 'mascotas' | 'citas'): void {
    this.seccionActiva = seccion;
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
