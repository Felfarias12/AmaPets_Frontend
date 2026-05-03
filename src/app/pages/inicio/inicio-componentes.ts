import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicio } from '../../models/servicio.model';
import { Veterinario } from '../../models/veterinario.model';
import { Cita, Estadistica } from '../../models/cita.model';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.citaForm = this.fb.group({
      nombreDuenio: ['', [Validators.required, Validators.minLength(2)]],
      telefono:     ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]],
      nombreMascota:['', Validators.required],
      especie:      ['Perro', Validators.required],
      servicio:     ['Consulta general', Validators.required],
      fecha:        ['', Validators.required]
    });
  }

  get f() { return this.citaForm.controls; }

  enviarCita(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }
    const cita: Cita = this.citaForm.value;
    console.log('Cita agendada:', cita);
    this.citaEnviada = true;
    setTimeout(() => {
      this.citaEnviada = false;
      this.citaForm.reset({ especie: 'Perro', servicio: 'Consulta general' });
    }, 4000);
  }

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