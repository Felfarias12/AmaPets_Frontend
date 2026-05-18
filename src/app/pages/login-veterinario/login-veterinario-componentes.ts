import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VeterinarioService } from '../../service/veterinario-service';

@Component({
  selector: 'app-login-veterinario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-veterinario-componentes.html',
  styleUrls: ['./login-veterinario-componentes.scss']
})
export class LoginVeterinarioComponent implements OnInit {
  loginForm!: FormGroup;
  cargando = false;
  errorMsg = '';
  mostrarPassword = false;
  private readonly credencialesKey = 'veterinarioCredenciales';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private veterinarioService: VeterinarioService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMsg = '';
    const { correo, contrasena } = this.loginForm.value;

    this.veterinarioService.obtenerVeterinarios().subscribe({
      next: (veterinarios) => {
        const encontrado = veterinarios.find(
          v => v.correo === correo && this.validarContrasena(v.correo, v.contrasena, contrasena)
        );
        this.cargando = false;

        if (encontrado) {
          sessionStorage.setItem('veterinarioActual', JSON.stringify(encontrado));
          this.router.navigate(['/veterinario']);
        } else {
          this.errorMsg = 'Email o contraseña incorrectos.';
        }
      },
      error: () => {
        this.cargando = false;
        this.errorMsg = 'Error al conectar con el servidor.';
      }
    });
  }

  private validarContrasena(correo: string | undefined, contrasenaBackend: string | undefined, contrasenaIngresada: string): boolean {
    if (contrasenaBackend) {
      return contrasenaBackend === contrasenaIngresada;
    }

    const credenciales = this.leerCredencialesLocales();
    const key = correo?.trim().toLowerCase() ?? '';
    return credenciales[key] === contrasenaIngresada;
  }

  private leerCredencialesLocales(): Record<string, string> {
    try {
      return JSON.parse(localStorage.getItem(this.credencialesKey) ?? '{}') as Record<string, string>;
    } catch {
      return {};
    }
  }

  irAInicio(): void {
    this.router.navigate(['/']);
  }

  irARegistro(): void {
    this.router.navigate(['/registro-veterinario']);
  }
}
