import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-componentes.html',
  styleUrls: ['./login-componentes.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  cargando = false;
  errorMsg = '';
  mostrarPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:      ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

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

    // Simulación de login — reemplazar con llamada al servicio real
    setTimeout(() => {
      this.cargando = false;
      // Simulamos login exitoso con cualquier email/contraseña
      this.router.navigate(['/perfil']);
    }, 1200);
  }

  irAInicio(): void {
    this.router.navigate(['/']);
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}
