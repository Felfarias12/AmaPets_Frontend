import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicio } from '../../models/servicio.model';
import { Veterinario } from '../../models/veterinario.model';
import { Cita, Estadistica } from '../../models/cita.model';
import { Router } from '@angular/router';

// ✅ IMPORTAR SERVICIO
import { ConsultaService } from '../../service/consulta-service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inicio-componentes.html',
  styleUrls: ['./inicio-componentes.scss']
})
export class InicioComponent implements OnInit {

  citaForm!: FormGroup;
  citaEnviada = false;
  menuAbierto = false;

  // 🔥 LISTA DE CONSULTAS (BACKEND)
  consultas: any[] = [];

  estadisticas: Estadistica[] = [
    { valor: '+2.400', etiqueta: 'Pacientes felices' },
    { valor: '15 años', etiqueta: 'De experiencia' },
    { valor: '98%', etiqueta: 'Satisfacción' }
  ];

  servicios: Servicio[] = [
    {
      id: 1,
      icono: '🩺',
      nombre: 'Consulta general',
      descripcion: 'Revisión completa y diagnóstico preventivo para mantener a tu mascota saludable.',
      colorClase: 'teal'
    },
    {
      id: 2,
      icono: '💉',
      nombre: 'Vacunación',
      descripcion: 'Calendario de vacunas personalizado para perros, gatos y pequeños animales.',
      colorClase: 'coral'
    },
    {
      id: 3,
      icono: '🦷',
      nombre: 'Odontología',
      descripcion: 'Limpieza dental y tratamientos para una boca sana y un aliento fresco.',
      colorClase: 'amber'
    },
    {
      id: 4,
      icono: '✂️',
      nombre: 'Peluquería',
      descripcion: 'Baño, corte y estética para que tu mascota luzca y se sienta espectacular.',
      colorClase: 'purple'
    }
  ];

  veterinarios: Veterinario[] = [
    {
      id: 1,
      nombre: 'Dra. Camila Rojas',
      rol: 'Directora médica',
      especialidades: ['Medicina interna', 'Gatos', 'Urgencias'],
      emoji: '👩‍⚕️',
      colorClase: 'teal'
    },
    {
      id: 2,
      nombre: 'Dr. Andrés Méndez',
      rol: 'Cirujano veterinario',
      especialidades: ['Cirugía', 'Ortopedia', 'Perros'],
      emoji: '👨‍⚕️',
      colorClase: 'coral'
    },
    {
      id: 3,
      nombre: 'Dra. Valentina Cruz',
      rol: 'Especialista en exóticos',
      especialidades: ['Aves', 'Reptiles', 'Roedores'],
      emoji: '👩‍⚕️',
      colorClase: 'amber'
    }
  ];

  especies = ['Perro', 'Gato', 'Conejo', 'Ave', 'Otro'];
  serviciosOpciones = ['Consulta general', 'Vacunación', 'Odontología', 'Peluquería', 'Urgencias'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private consultaService: ConsultaService
  ) {}

  ngOnInit(): void {

    // FORM
    this.citaForm = this.fb.group({
      nombreDuenio: ['', [Validators.required, Validators.minLength(2)]],
      telefono:     ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]],
      nombreMascota:['', Validators.required],
      especie:      ['Perro', Validators.required],
      servicio:     ['Consulta general', Validators.required],
      fecha:        ['', Validators.required]
    });

    // 🔥 GET CONSULTAS
    this.cargarConsultas();
  }

  // =========================
  // 🔵 GET
  // =========================
  cargarConsultas() {
    this.consultaService.obtenerConsultas().subscribe({
      next: (resp: any) => {
        console.log('✅ Datos desde backend:', resp);
        this.consultas = resp;
      },
      error: (err: any) => {
        console.error('❌ Error al conectar:', err);
      }
    });
  }

  get f() { return this.citaForm.controls; }

  // =========================
  // 🟢 POST
  // =========================
  enviarCita(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }

    const cita: Cita = this.citaForm.value;

    const nuevaConsulta = {
      Id_consulta: 0,
      fecha_consulta: new Date(cita.fecha),
      motivo: cita.servicio,
      diagnostico: 'Pendiente',
      tratamiento: 'Pendiente'
    };

    this.consultaService.crearConsulta(nuevaConsulta).subscribe({
      next: (resp: any) => {
        console.log('✅ Guardado en backend:', resp);

        // 🔄 refrescar lista
        this.cargarConsultas();
      },
      error: (err: any) => {
        console.error('❌ Error al guardar:', err);
      }
    });

    this.citaEnviada = true;

    setTimeout(() => {
      this.citaEnviada = false;
      this.citaForm.reset({ especie: 'Perro', servicio: 'Consulta general' });
    }, 4000);
  }

  // =========================
  // UI
  // =========================
  scrollA(seccion: string): void {
    document.getElementById(seccion)?.scrollIntoView({ behavior: 'smooth' });
    this.menuAbierto = false;
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  irALogin(): void {
    this.router.navigate(['/login']);
  }
}