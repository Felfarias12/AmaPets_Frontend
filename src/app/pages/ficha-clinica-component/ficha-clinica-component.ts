import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FichaClinicaService, agregarFichaClinica } from '../../service/fichaclinica-service';

@Component({
  selector: 'app-ficha-clinica-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ficha-clinica-component.html',
  styleUrls: ['./ficha-clinica-component.scss']
})
export class FichaClinicaComponent implements OnInit {

  @Input() set mascota(valor: any) {
    this._mascota = valor;
    this.cargarFichas();
  }
  get mascota(): any { return this._mascota; }

  _mascota: any = {
    id: 1, nombre: 'Luna', emoji: '🐶', especie: 'canino',
    raza: 'Golden Retriever', genero: 'Hembra',
    edad: 3, peso: 28.5, color: 'Dorado', esterilizada: true
  };

  fichaForm:       FormGroup;
  subSeccion:      string  = 'historial';
  mostrarModal:    boolean = false;
  guardando:       boolean = false;

  fichas:          agregarFichaClinica[] = [];
  fichasFiltradas: agregarFichaClinica[] = [];
  vacunas:         any[]                 = [];

  private fichasMock: agregarFichaClinica[] = [
    { id_ficha_clinica: 1, mascotaId: 1, fecha: new Date('2026-04-30').toISOString(), motivo: 'Vacuna Sextuple',   veterinario: 'Dr. Pérez', peso: 28.5, temperatura: '38.5°', diagnostico: 'Salud óptima',                  tratamiento: 'Refuerzo aplicado correctamente.', notas: 'Siguiente refuerzo en 12 meses.' },
    { id_ficha_clinica: 2, mascotaId: 1, fecha: new Date('2026-02-14').toISOString(), motivo: 'Control de rutina', veterinario: 'Dra. Soto', peso: 27.8, temperatura: '38.2°', diagnostico: 'Sin novedades',                  tratamiento: 'Ninguno requerido.',              notas: '' },
    { id_ficha_clinica: 3, mascotaId: 1, fecha: new Date('2025-11-09').toISOString(), motivo: 'Desparasitación',   veterinario: 'Dr. Pérez', peso: 27.0, temperatura: '38.4°', diagnostico: 'Parásitos internos detectados', tratamiento: 'Milbemicina oxima oral.',          notas: 'Repetir en 3 semanas.' },
    { id_ficha_clinica: 4, mascotaId: 2, fecha: new Date('2026-05-10').toISOString(), motivo: 'Chequeo Inicial',   veterinario: 'Dra. Soto', peso: 4.5,  temperatura: '38.8°', diagnostico: 'Cachorro sano',                 tratamiento: 'Suplemento vitamínico.',          notas: 'Traer el próximo mes.' }
  ];

  private vacunasMock: any[] = [
    { nombre: 'Sextuple',    estado: 'al dia', fechaAplicacion: new Date('2026-04-30'), proximaDosis: new Date('2027-04-30'), lote: 'AB123' },
    { nombre: 'Antirrábica', estado: 'al dia', fechaAplicacion: new Date('2025-09-20'), proximaDosis: new Date('2026-09-20'), lote: 'CD456' }
  ];

  constructor(private fb: FormBuilder, private fichaService: FichaClinicaService) {
    this.fichaForm = this.fb.group({
      motivo:      ['', Validators.required],
      veterinario: ['', Validators.required],
      peso:        [0,  [Validators.required, Validators.min(0)]],
      temperatura: ['', Validators.required],
      diagnostico: ['', Validators.required],
      tratamiento: ['', Validators.required],
      notas:       ['']
    });
  }

  ngOnInit() {
    this.cargarFichas();
  }

  cargarFichas() {
    const idMascota = this._mascota?.id ?? 1;

    this.fichaService.obtenerFichas().subscribe({
      next: (data) => {
        this.fichas  = data.filter(f => f.mascotaId === idMascota);
        this.vacunas = this.vacunasMock;
        this.filtrarSeccion();
      },
      error: () => {
        console.error('Error al obtener fichas del servidor — cargando datos locales');
        this.fichas  = this.fichasMock.filter(f => f.mascotaId === idMascota);
        this.vacunas = this.vacunasMock;
        this.filtrarSeccion();
      }
    });
  }

  cambiarSubSeccion(seccion: string) {
    this.subSeccion = seccion;
    this.filtrarSeccion();
  }

  filtrarSeccion() {
    switch (this.subSeccion) {
      case 'historial':
        this.fichasFiltradas = this.fichas.filter(f => !f.motivo.toLowerCase().includes('vacuna'));
        break;
      case 'vacunas':
        this.fichasFiltradas = this.fichas.filter(f => f.motivo.toLowerCase().includes('vacuna'));
        break;
      case 'medicamentos':
        this.fichasFiltradas = this.fichas.filter(f => f.tratamiento && f.tratamiento !== 'Ninguno requerido.');
        break;
    }
  }

  abrirModal() {
    this.mostrarModal = true;
    this.fichaForm.reset({ peso: this._mascota?.peso ?? 0 });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.fichaForm.reset({ peso: 0 });
  }

  guardarFicha() {
    if (this.fichaForm.invalid) return;

    const payload: agregarFichaClinica = {
      ...this.fichaForm.value,
      mascotaId:        this._mascota?.id ?? 1,
      fecha:            new Date().toISOString(),
      id_ficha_clinica: 0
    };

    this.guardando = true;

    this.fichaService.crearFicha(payload).subscribe({
      next: (res) => {
        console.log('Ficha guardada con éxito', res);
        this.cargarFichas();
        this.guardando = false;
        this.cerrarModal();
      },
      error: () => {
        console.error('Error al guardar en el servidor — guardando localmente');
        this.fichasMock.unshift({ ...payload, id_ficha_clinica: Date.now() });
        this.cargarFichas();
        this.guardando = false;
        this.cerrarModal();
      }
    });
  }

  formatFecha(fecha: any): string {
    return new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}