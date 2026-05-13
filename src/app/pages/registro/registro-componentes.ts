import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/usuario-service';

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
  usuarios: Usuario[] = [];
  usuarioEditando: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(7)]],
      fotoPerfil: ['']
    });

    this.cargarUsuarios();
  }

  get f() { return this.registroForm.controls; }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.error('❌ Error al cargar usuarios:', err);
        this.errorMsg = 'No se pudieron cargar los usuarios.';
      }
    });
  }

  limpiarFormulario(): void {
    this.registroForm.reset({
      id: 0,
      nombre: '',
      email: '',
      telefono: '',
      fotoPerfil: ''
    });
    this.usuarioEditando = null;
    this.errorMsg = '';
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMsg = '';

    const usuario: Usuario = this.registroForm.value;

    const request$ = this.usuarioEditando
      ? this.usuarioService.editarUsuario(usuario)
      : this.usuarioService.crearUsuario(usuario);

    request$.subscribe({
      next: () => {
        this.cargando = false;
        this.cargarUsuarios();
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('❌ Error en el registro:', err);
        this.cargando = false;
        this.errorMsg = 'No se pudo guardar el usuario.';
      }
    });
  }

  editarUsuario(usuario: Usuario): void {
    this.registroForm.patchValue(usuario);
    this.usuarioEditando = usuario;
    this.errorMsg = '';
  }

  eliminarUsuario(id: number): void {
    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => {
        this.cargarUsuarios();
        if (this.registroForm.value.id === id) {
          this.limpiarFormulario();
        }
      },
      error: (err) => {
        console.error('❌ Error al eliminar usuario:', err);
        this.errorMsg = 'No se pudo eliminar el usuario.';
      }
    });
  }

  irALogin(): void {
    this.router.navigate(['/login']);
  }
}