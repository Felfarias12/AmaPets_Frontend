import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bodyAgregaRegistro, RegistroService } from '../../service/registro-service';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-componentes.html',
  styleUrls: ['./registro-componentes.scss']
})
export class RegistroComponent implements OnInit {

  registroForm!: FormGroup;
  cargando = false;
  errorMsg = '';
  mostrarPassword = false;
  usuarioCreado = false;
  registros: bodyAgregaRegistro[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private registroService: RegistroService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarUsuarios();
  }

  initForm(): void {
    this.registroForm = this.fb.group({
      nombre:     ['', [Validators.required, Validators.minLength(3)]],
      edad:       ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      correo:     ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.cargarUsuarios();
  }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  get f() {
    return this.registroForm.controls;
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMsg = '';
    this.enviarRegistro();
  }

  enviarRegistro(): void {
    const datos = this.registroForm.value;
    
    const nuevoUsuario: bodyAgregaRegistro = {
      nombre: datos.nombre,
      correo: datos.correo,
      contrasena: datos.contrasena,
      edad: datos.edad,
      };

    this.registroService.crearRegistro(nuevoUsuario).subscribe({
      next: (resp) => {
        console.log('✅ Operación exitosa:', resp);
        this.usuarioCreado = true;
        this.cargando = false;
        this.registroForm.reset();
        this.cargarUsuarios();
      },
      error: (err) => {
        this.cargando = false;
        this.errorMsg = 'Error en el servidor. Verifica que el correo no esté duplicado.';
        console.error('❌ Error:', err);
      }
    });
  }

  cargarUsuarios(): void {
    this.registroService.obtenerRegistros().subscribe({
      next: (resp) => {
        this.registros = resp;
      },
      error: (err) => console.error('❌ Error al cargar:', err)
    });
  }

  iniciarEdicion(usuario: bodyAgregaRegistro): void {
    this.registroForm.patchValue({
      id_usuario: usuario.id_usuario, // ✅ corregido
      nombre:     usuario.nombre,
      correo:     usuario.correo,
      contrasena: usuario.contrasena,
      edad:       usuario.edad
    });
    
    document.getElementById('usuarios')?.scrollIntoView({ behavior: 'smooth' });
  }

  eliminarUsuario(id: number): void {
    if (!confirm('¿Eliminar este usuario?')) return;
    
    this.registroService.eliminarRegistro(id).subscribe({
      next: () => {
        this.cargarUsuarios();
      },
      error: (err) => console.error('❌ Error al eliminar:', err)
    });
  }

  irAInicio(): void { this.router.navigate(['/']); }
  irALogin(): void { this.router.navigate(['/login']); }
}