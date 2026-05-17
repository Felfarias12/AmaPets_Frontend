import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MascotaComponentes } from '../mascota-componentes/mascota-componentes';
import { FichaClinicaComponent } from '../ficha-clinica-component/ficha-clinica-component';
import { Usuario } from '../../models/usuario.model';
import { Mascota } from '../../models/mascota.model';
import { UsuarioService } from '../../service/usuario-service';
import { MascotaService, AgregarMascota } from '../../service/mascota-service';

@Component({
 selector: 'app-perfil',
 standalone: true,
 imports: [CommonModule, MascotaComponentes, FichaClinicaComponent],
 templateUrl: './perfil-componentes.html',
 styleUrls: ['./perfil-componentes.scss']
})

export class PerfilComponent implements OnInit {
 @ViewChild('modalMascota') modalMascota!: MascotaComponentes;
 usuario: any = {};
 mascotas: AgregarMascota[] = [];
 seccionActiva  = 'mascotas';
 subSeccionFicha = 'historial';
 cargandoMascotas = false;
 citas: any[] = [];
 constructor(
  private router:    Router,
  private usuarioService: UsuarioService,
  private mascotaService: MascotaService
 ) {}



 ngOnInit(): void {

  this.cargarUsuarioDesdeSession();

  this.cargarMascotas();

 }



 cargarUsuarioDesdeSession(): void {

  const guardado = sessionStorage.getItem('usuarioActual');

  if (guardado) {

   this.usuario = JSON.parse(guardado);

  } else {

   this.router.navigate(['/login']);

  }

 }



 cargarMascotas(): void {

  this.cargandoMascotas = true;

  this.mascotaService.obtenerMascotas().subscribe({

  next: (data: AgregarMascota[]) => {

    this.mascotas = data;

    this.cargandoMascotas = false;

    console.log('✅ Mascotas cargadas:', data);

   },

   error: (err: any) => {

    console.error('❌ Error al cargar mascotas:', err);

    this.cargandoMascotas = false;

   }

  });

 }



 abrirModalMascota(): void { this.modalMascota.abrirModal(); }

 obtenerMascotas(): void { this.cargarMascotas(); }



 cambiarSeccion(seccion: string):  void { this.seccionActiva = seccion; }

 cambiarSubSeccion(sub: string):  void { this.subSeccionFicha = sub; }



 iniciales(): string {

  if (!this.usuario?.nombre) return '?';

  return this.usuario.nombre.split(' ').map((n: string) => n[0]).join('').toUpperCase();

 }



 citasPendientes(): number {

  return this.citas.filter(c => c.estado === 'confirmada' || c.estado === 'pendiente').length;

 }



 etiquetaEspecie(especie: string): string {

  const mapa: Record<string, string> = {

   perro: 'Canino', gato: 'Felino', conejo: 'Conejo', ave: 'Ave', otro: 'Otro'

  };

  return mapa[especie?.toLowerCase()] ?? especie;

 }



 formatFecha(fecha: any): string {

  return new Date(fecha).toLocaleDateString('es-ES', {

   day: '2-digit', month: 'short', year: 'numeric'

  });

 }



 nuevaCita(): void { console.log('Nueva cita...'); }



 cerrarSesion(): void {

  sessionStorage.removeItem('usuarioActual');

  this.router.navigate(['/']);

 }

}