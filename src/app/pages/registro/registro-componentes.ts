import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre:     ['', [Validators.required, Validators.minLength(3)]],
      email:      ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registroForm.controls; }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMsg = '';

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