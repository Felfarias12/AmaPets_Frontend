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
  constructor(private fb: FormBuilder, private router: Router, private registroService: RegistroService) {}

ngOnInit(): void {
  this.registroForm = this.fb.group({
    nombre:     ['', [Validators.required, Validators.minLength(3)]],
    edad:       ['', [Validators.required, Validators.min(1), Validators.max(120)]], // Añadir esto
    correo:      ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]]
  });
}

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

onSubmit(): void {
  // 1. Validamos el formulario actual (el que tiene los datos del usuario)
  if (this.registroForm.invalid) {
    this.registroForm.markAllAsTouched();
    return;
  }

  this.cargando = true;
  this.errorMsg = '';

  // 2. Llamamos directamente al método que envía los datos al backend
  this.enviarRegistro();




    // 🔵 FORMULARIO EDICION
    this.registroForm = this.fb.group({
      Id_usuario:     [0],
      nombre:         ['', [Validators.required, Validators.minLength(2)]],
      correo:          ['', [Validators.required, Validators.email]],
      contrasena:     ['', [Validators.required, Validators.minLength(6)]],
      fecha_registro: ['', Validators.required]
    });
 
    // 🔥 CARGAR USUARIOS
    this.cargarUsuarios();
  }
 
  // =========================
  // 🔵 GET USUARIOS
  // =========================
  cargarUsuarios(): void {
    this.registroService.obtenerRegistros().subscribe({
      next: (resp: bodyAgregaRegistro[]) => {
        console.log('✅ Usuarios desde backend:', resp);
        this.registros = resp;
      },
      error: (err) => {
        console.error('❌ Error al conectar:', err);
      }
    });
  }
 
  get f() {
    return this.registroForm.controls;
  }
 
  // =========================
  // 🟢 CREAR USUARIO
  // =========================
 enviarRegistro(): void {
  // Creamos el objeto asegurándonos de que los nombres coincidan con Java
  const nuevoUsuario = {
    Id_usuario: this.registroForm.value.Id_usuario, // El backend debería asignar esto automáticamente
    nombre: this.registroForm.value.nombre,
    correo: this.registroForm.value.email,
    contrasena: this.registroForm.value.contrasena,
    edad: this.registroForm.value.edad
  };

  this.registroService.crearRegistro(nuevoUsuario).subscribe({
    next: (resp) => {
      console.log('✅ Usuario registrado:', resp);
      this.usuarioCreado = true;
      this.cargando = false;
      this.registroForm.reset(); // Ahora sí reseteamos, una vez que el servidor respondió OK
    },
    error: (err) => {
      this.cargando = false;
      this.errorMsg = 'Error al guardar el usuario en el servidor.';
      console.error('❌ Error 500 o CORS:', err);
    }
  });

}
 
  // =========================
  // 🟠 CARGAR DATOS A FORM
  // =========================
  iniciarEdicion(usuario: bodyAgregaRegistro): void {
    this.registroForm.patchValue({
      Id_usuario:     usuario.Id_usuario,
      nombre:         usuario.nombre,
      correo:          usuario.correo,
      contrasena:     usuario.contrasena,
      fecha_registro: ''
    });
    document.getElementById('usuarios')?.scrollIntoView({ behavior: 'smooth' });
  }
 
  // =========================
  // 🔴 DELETE
  // =========================
  eliminarUsuario(id: number): void {
    if (!confirm('¿Eliminar este usuario?')) return;
    this.registroService.eliminarRegistro(id).subscribe({
      next: () => {
        console.log('✅ Eliminado:', id);
        this.cargarUsuarios();
      },
      error: (err: unknown) => {
        console.error('❌ Error al eliminar:', err);
      }
    });
  
    // Simulación de registro — reemplazar con llamada al servicio real
    setTimeout(() => {
      this.cargando = false;
      // Simulamos registro exitoso con cualquier dato válido
      this.router.navigate(['/perfil']);
    }, 1500);
    }
  irAInicio(): void {
    this.router.navigate(['/']);
  }
    
  irALogin(): void {
    this.router.navigate(['/login']);
  }
}