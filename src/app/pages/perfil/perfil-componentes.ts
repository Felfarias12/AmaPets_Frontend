import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotaComponentes } from '../mascota-componentes/mascota-componentes';
import { Router } from '@angular/router';
import { FichaClinicaComponent } from '../ficha-clinica-component/ficha-clinica-component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, MascotaComponentes, FichaClinicaComponent],
  templateUrl: './perfil-componentes.html',
  styleUrls: ['./perfil-componentes.scss']
})
export class PerfilComponent implements OnInit {
  
  @ViewChild('modalMascota') modalMascota!: MascotaComponentes;

  usuario = {
    nombre: 'Felipe Alberto',
    email: 'felipe@example.com'
  };

  seccionActiva: string = 'mascotas';
  // 🔥 Importante: Esta variable controla las pestañas de la Ficha Clínica
  subSeccionFicha: string = 'historial'; 
  mascotaSeleccionada: any = null;

  mascotas = [
    { id: 1, nombre: 'Luna', raza: 'Husky', especie: 'perro', edad: 3, peso: 18, emoji: '🐺', colorClase: 'azul' },
    { id: 2, nombre: 'Simba', raza: 'Persa', especie: 'gato', edad: 5, peso: 4, emoji: '🐱', colorClase: 'naranja' }
  ];

  citas = [
    { id: 101, fecha: new Date(), hora: '10:30', servicio: 'Vacunación', mascotaNombre: 'Luna', veterinario: 'Dr. Pérez', estado: 'confirmada' },
    { id: 102, fecha: new Date(), hora: '16:00', servicio: 'Chequeo General', mascotaNombre: 'Simba', veterinario: 'Dra. Soto', estado: 'pendiente' }
  ];

  // 🔥 Renombrado de 'fichasClinicas' a 'fichas' para que coincida con el @for del HTML
  fichas = [
    {
      id: 1,
      fecha: new Date('2026-05-01'),
      motivo: 'Vacuna Sextuple',
      veterinario: 'Dr. Pérez',
      peso: 18,
      temperatura: '38.5°',
      diagnostico: 'Salud óptima',
      tratamiento: 'Refuerzo aplicado correctamente.',
      notas: 'Siguiente refuerzo en 12 meses.'
    }
  ];

  // 🔥 Añadidas para evitar errores TS2339
  vacunas = [
    { nombre: 'Sextuple', estado: 'al dia', fechaAplicacion: new Date(), proximaDosis: new Date(), lote: 'AB123' }
  ];

medicamentos: any[] = [];

  constructor(private fb: FormBuilder, 
        private router: Router, ) {

  }

  ngOnInit(): void {}

  // --- MÉTODOS ---

  abrirModalMascota() {
    this.modalMascota.abrirModal();
  }

  obtenerMascotas() {
    console.log('Recargando mascotas desde el servidor...');
    // Aquí iría la lógica de tu mascota-service.ts
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  verFicha(mascota: any) {
    this.mascotaSeleccionada = mascota;
    this.seccionActiva = 'ficha-clinica';
  }

  // 🔥 Este método faltaba y lo pide el (click) del HTML
  cambiarSubSeccion(sub: string) {
    this.subSeccionFicha = sub;
  }

  iniciales(): string {
    return this.usuario.nombre.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  citasPendientes(): number {
    return this.citas.filter(c => c.estado === 'confirmada' || c.estado === 'pendiente').length;
  }

  etiquetaEspecie(especie: string): string {
    return especie === 'perro' ? 'Canino' : 'Felino';
  }

  formatFecha(fecha: any): string {
    return new Date(fecha).toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  }

  nuevaCita() { console.log('Nueva cita...'); }
  cerrarSesion() : void { this.router.navigate(['/']); }
}