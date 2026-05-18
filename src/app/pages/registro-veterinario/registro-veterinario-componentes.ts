import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VeterinarioService } from '../../service/veterinario-service';

@Component({
  selector: 'app-registro-veterinario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-veterinario-componentes.html',
  styleUrls: ['./registro-veterinario-componentes.scss']
})
export class RegistroVeterinarioComponent implements OnInit {
  registroForm!: FormGroup;
  cargando = false;
  errorMsg = '';
  mostrarPassword = false;
  veterinarioCreado = false;
  modoEdicion = false;
  veterinarioEditandoId: number | null = null;
  veterinarios: any[] = [];

  private readonly credencialesKey = 'veterinarioCredenciales';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private veterinarioService: VeterinarioService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarVeterinarios();
  }

  initForm(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      edad: [null, [Validators.required, Validators.min(1)]],
      genero: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  get f() {
    return this.registroForm.controls;
  }

  trackVeterinario(_index: number, vet: any): string | number {
    return vet.id_veterinario ?? vet.id ?? vet.correo ?? _index;
  }

  obtenerIdVeterinario(vet: any): number | undefined {
    return vet.id_veterinario ?? vet.id;
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMsg = '';
    if (this.modoEdicion && this.veterinarioEditandoId !== null) {
      this.actualizarVeterinario();
      return;
    }

    this.enviarRegistro();
  }

  enviarRegistro(): void {
    const datos = this.registroForm.value;

    const nuevoVeterinario: any = {
      nombre: datos.nombre,
      edad: Number(datos.edad),
      genero: datos.genero,
      correo: datos.correo,
      contrasena: datos.contrasena,
    };

    this.veterinarioService.crearVeterinario(nuevoVeterinario).subscribe({
      next: (resp) => {
        console.log('✅ Veterinario registrado:', resp);
        this.guardarCredencialesLocalmente(datos.correo, datos.contrasena);
        this.veterinarioCreado = true;
        this.cargando = false;
        this.registroForm.reset();
        this.cargarVeterinarios();
      },
      error: (err) => {
        this.cargando = false;
        this.errorMsg = 'Error al registrar. Intenta nuevamente.';
        console.error('❌ Error:', err);
      }
    });
  }

  private guardarCredencialesLocalmente(correo: string, contrasena: string): void {
    const key = correo.trim().toLowerCase();
    const credenciales = this.leerCredencialesLocales();
    credenciales[key] = contrasena;
    localStorage.setItem(this.credencialesKey, JSON.stringify(credenciales));
  }

  private leerCredencialesLocales(): Record<string, string> {
    try {
      return JSON.parse(localStorage.getItem(this.credencialesKey) ?? '{}') as Record<string, string>;
    } catch {
      return {};
    }
  }

  cargarVeterinarios(): void {
    this.veterinarioService.obtenerVeterinarios().subscribe({
      next: (resp) => {
        this.veterinarios = resp;
      },
      error: (err) => console.error('❌ Error al cargar:', err)
    });
  }

  iniciarEdicion(vet: any): void {
    this.modoEdicion = true;
    this.veterinarioEditandoId = vet.id_veterinario ?? null;

    this.registroForm.patchValue({
      nombre: vet.nombre ?? '',
      edad: vet.edad ?? null,
      genero: vet.genero ?? '',
      correo: vet.correo ?? '',
      contrasena: ''
    });

    document.getElementById('nombre')?.scrollIntoView({ behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.veterinarioEditandoId = null;
    this.registroForm.reset();
  }

  actualizarVeterinario(): void {
    const id = this.veterinarioEditandoId;
    if (id === null) {
      this.cargando = false;
      return;
    }

    const datos = this.registroForm.value;
    const veterinarioActualizado: any = {
      id_veterinario: id,
      nombre: datos.nombre,
      edad: Number(datos.edad),
      genero: datos.genero,
      correo: datos.correo,
      contrasena: datos.contrasena || undefined
    };

    this.veterinarioService.editarVeterinario(veterinarioActualizado).subscribe({
      next: () => {
        this.guardarCredencialesLocalmente(datos.correo, datos.contrasena || '');
        this.cargando = false;
        this.modoEdicion = false;
        this.veterinarioEditandoId = null;
        this.registroForm.reset();
        this.cargarVeterinarios();
      },
      error: (err) => {
        this.cargando = false;
        this.errorMsg = 'Error al actualizar. Intenta nuevamente.';
        console.error('❌ Error al actualizar:', err);
      }
    });
  }

  eliminarVeterinario(id: number): void {
    if (!id) return;

    if (!confirm('¿Eliminar este veterinario?')) return;

    this.veterinarioService.eliminarVeterinario(id).subscribe({
      next: () => {
        this.cargarVeterinarios();
      },
      error: (err) => console.error('❌ Error al eliminar:', err)
    });
  }

  irAInicio(): void {
    this.router.navigate(['/']);
  }

  irALogin(): void {
    this.router.navigate(['/login-veterinario']);
  }
}
