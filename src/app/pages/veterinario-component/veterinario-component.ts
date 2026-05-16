import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CitaHoy {
  id: number;
  hora: string;
  nombreMascota: string;
  especie: 'perro' | 'gato' | 'conejo' | 'ave' | 'otro';
  emoji: string;
  duenio: string;
  servicio: string;
  estado: 'pendiente' | 'en-curso' | 'completada' | 'cancelada';
  colorClase: 'teal' | 'coral' | 'amber' | 'purple';
}

interface PacienteReciente {
  id: number;
  nombre: string;
  especie: 'perro' | 'gato' | 'conejo' | 'ave' | 'otro';
  emoji: string;
  raza: string;
  edad: number;
  peso: number;
  duenio: string;
  ultimaVisita: string;
  colorClase: 'teal' | 'coral' | 'amber' | 'purple';
}

interface FichaForm {
  motivo: string;
  diagnostico: string;
  tratamiento: string;
  peso: number | null;
  temperatura: string;
  notas: string;
}

@Component({
  selector: 'app-veterinario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './veterinario-component.html',
  styleUrl: './veterinario-component.scss',
})
export class VeterinarioComponent {

  // Estado de la vista
  tabActiva = signal<'citas' | 'pacientes' | 'fichas'>('citas');
  mostrarModalFicha = signal(false);
  pacienteSeleccionado = signal<PacienteReciente | null>(null);
  busqueda = signal('');
  fichaEnviada = signal(false);

  // Datos del veterinario en sesión
  veterinario = {
    nombre: 'Dra. Carmen Rojas',
    rol: 'Médica Veterinaria · Cardiología',
    emoji: '👩‍⚕️',
    colorClase: 'teal' as const,
  };

  // Estadísticas del día
  estadisticas = [
    { valor: '8',  etiqueta: 'Citas hoy',         icono: '📅', color: 'teal'   },
    { valor: '5',  etiqueta: 'Completadas',         icono: '✅', color: 'green'  },
    { valor: '2',  etiqueta: 'En espera',           icono: '⏳', color: 'amber'  },
    { valor: '24', etiqueta: 'Pacientes este mes',  icono: '🐾', color: 'coral'  },
  ];

  // Citas del día
  citasHoy: CitaHoy[] = [
    { id:1, hora:'09:00', nombreMascota:'Luna',    especie:'gato',   emoji:'🐱', duenio:'María González',  servicio:'Revisión General',  estado:'completada', colorClase:'teal'   },
    { id:2, hora:'09:30', nombreMascota:'Rocky',   especie:'perro',  emoji:'🐶', duenio:'Juan Pérez',      servicio:'Vacunación',         estado:'completada', colorClase:'coral'  },
    { id:3, hora:'10:15', nombreMascota:'Coco',    especie:'conejo', emoji:'🐰', duenio:'Ana Soto',        servicio:'Control de peso',    estado:'en-curso',   colorClase:'amber'  },
    { id:4, hora:'11:00', nombreMascota:'Milo',    especie:'perro',  emoji:'🐶', duenio:'Pedro Fuentes',   servicio:'Ecografía',          estado:'pendiente',  colorClase:'teal'   },
    { id:5, hora:'11:45', nombreMascota:'Kiwi',    especie:'ave',    emoji:'🦜', duenio:'Laura Morales',   servicio:'Revisión General',   estado:'pendiente',  colorClase:'purple' },
    { id:6, hora:'15:00', nombreMascota:'Simba',   especie:'gato',   emoji:'🐱', duenio:'Carlos Díaz',     servicio:'Desparasitación',    estado:'pendiente',  colorClase:'amber'  },
    { id:7, hora:'16:00', nombreMascota:'Bolt',    especie:'perro',  emoji:'🐶', duenio:'Valentina Cruz',  servicio:'Cirugía menor',      estado:'pendiente',  colorClase:'coral'  },
    { id:8, hora:'17:00', nombreMascota:'Perla',   especie:'gato',   emoji:'🐱', duenio:'Sofía Ramírez',   servicio:'Control cardíaco',   estado:'pendiente',  colorClase:'teal'   },
  ];

  // Pacientes recientes
  pacientes: PacienteReciente[] = [
    { id:1, nombre:'Luna',   especie:'gato',   emoji:'🐱', raza:'Persa',            edad:4,  peso:3.8,  duenio:'María González',  ultimaVisita:'Hoy',          colorClase:'teal'   },
    { id:2, nombre:'Rocky',  especie:'perro',  emoji:'🐶', raza:'Golden Retriever', edad:6,  peso:28.5, duenio:'Juan Pérez',      ultimaVisita:'Hoy',          colorClase:'coral'  },
    { id:3, nombre:'Coco',   especie:'conejo', emoji:'🐰', raza:'Holandés enano',   edad:2,  peso:1.2,  duenio:'Ana Soto',        ultimaVisita:'Hoy',          colorClase:'amber'  },
    { id:4, nombre:'Milo',   especie:'perro',  emoji:'🐶', raza:'Labrador',         edad:3,  peso:22.0, duenio:'Pedro Fuentes',   ultimaVisita:'Hace 2 días',  colorClase:'teal'   },
    { id:5, nombre:'Kiwi',   especie:'ave',    emoji:'🦜', raza:'Cacatúa',          edad:5,  peso:0.4,  duenio:'Laura Morales',   ultimaVisita:'Hace 1 semana',colorClase:'purple' },
    { id:6, nombre:'Simba',  especie:'gato',   emoji:'🐱', raza:'Maine Coon',       edad:7,  peso:7.1,  duenio:'Carlos Díaz',     ultimaVisita:'Hace 2 sem.',  colorClase:'amber'  },
    { id:7, nombre:'Bolt',   especie:'perro',  emoji:'🐶', raza:'Dálmata',          edad:2,  peso:18.3, duenio:'Valentina Cruz',  ultimaVisita:'Hace 1 mes',   colorClase:'coral'  },
    { id:8, nombre:'Perla',  especie:'gato',   emoji:'🐱', raza:'Siamés',           edad:9,  peso:3.5,  duenio:'Sofía Ramírez',   ultimaVisita:'Hace 3 sem.',  colorClase:'teal'   },
  ];

  // Fichas clínicas recientes
  fichasRecientes = [
    { id:1, mascota:'Luna',   fecha:'16 May 2025', motivo:'Control rutinario',    diagnostico:'Saludable',          veterinario:'Dra. Carmen Rojas', emoji:'🐱' },
    { id:2, mascota:'Rocky',  fecha:'16 May 2025', motivo:'Vacunación anual',     diagnostico:'Sin anomalías',      veterinario:'Dra. Carmen Rojas', emoji:'🐶' },
    { id:3, mascota:'Bolt',   fecha:'14 May 2025', motivo:'Cojera miembro post.', diagnostico:'Esguince leve',      veterinario:'Dra. Carmen Rojas', emoji:'🐶' },
    { id:4, mascota:'Simba',  fecha:'10 May 2025', motivo:'Revisión dental',      diagnostico:'Sarro moderado',     veterinario:'Dra. Carmen Rojas', emoji:'🐱' },
    { id:5, mascota:'Perla',  fecha:'05 May 2025', motivo:'Control cardíaco',     diagnostico:'Soplo grado II',     veterinario:'Dra. Carmen Rojas', emoji:'🐱' },
  ];

  // Formulario nueva ficha
  fichaForm: FichaForm = {
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    peso: null,
    temperatura: '',
    notas: '',
  };

  // Computed: pacientes filtrados por búsqueda
  pacientesFiltrados = computed(() => {
    const q = this.busqueda().toLowerCase();
    if (!q) return this.pacientes;
    return this.pacientes.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.duenio.toLowerCase().includes(q) ||
      p.raza.toLowerCase().includes(q)
    );
  });

  // Computed: próxima cita pendiente
  proximaCita = computed(() =>
    this.citasHoy.find(c => c.estado === 'pendiente') ?? null
  );

  setTab(tab: 'citas' | 'pacientes' | 'fichas') {
    this.tabActiva.set(tab);
  }

  abrirModalFicha(paciente: PacienteReciente) {
    this.pacienteSeleccionado.set(paciente);
    this.fichaForm = { motivo:'', diagnostico:'', tratamiento:'', peso: null, temperatura:'', notas:'' };
    this.fichaEnviada.set(false);
    this.mostrarModalFicha.set(true);
  }

  cerrarModal() {
    this.mostrarModalFicha.set(false);
    this.pacienteSeleccionado.set(null);
  }

  guardarFicha() {
    if (!this.fichaForm.motivo || !this.fichaForm.diagnostico || !this.fichaForm.tratamiento) return;
    // Aquí iría la llamada al servicio backend
    console.log('Ficha guardada:', { paciente: this.pacienteSeleccionado(), ...this.fichaForm });
    this.fichaEnviada.set(true);
  }

  marcarEnCurso(cita: CitaHoy) {
    cita.estado = 'en-curso';
  }

  marcarCompletada(cita: CitaHoy) {
    cita.estado = 'completada';
  }

  estadoLabel(estado: string): string {
    const map: Record<string, string> = {
      'pendiente': 'Pendiente',
      'en-curso': 'En curso',
      'completada': 'Completada',
      'cancelada': 'Cancelada',
    };
    return map[estado] ?? estado;
  }

  setBusqueda(valor: string) {
    this.busqueda.set(valor);
  }
}