import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { UsuarioService } from '../../service/usuario-service';



@Component({

 selector: 'app-login',

 standalone: true,

 imports: [CommonModule, ReactiveFormsModule],

 templateUrl: './login-componentes.html',

 styleUrls: ['./login-componentes.scss']

})

export class LoginComponent implements OnInit {



 loginForm!: FormGroup;

 cargando    = false;

 errorMsg    = '';

 mostrarPassword = false;



 constructor(

  private fb:      FormBuilder,

  private router:    Router,

  private usuarioService: UsuarioService

 ) {}



 ngOnInit(): void {

  this.loginForm = this.fb.group({

   email:  ['', [Validators.required, Validators.email]],

   contrasena: ['', [Validators.required, Validators.minLength(6)]]

  });

 }



 get f() { return this.loginForm.controls; }



 togglePassword(): void { this.mostrarPassword = !this.mostrarPassword; }



 iniciarSesion(): void {

  if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }



  this.cargando = true;

  this.errorMsg = '';



  const { email, contrasena } = this.loginForm.value;



  // Busca en el backend los usuarios registrados y verifica email + contraseña

  this.usuarioService.obtenerUsuarios().subscribe({

   next: (usuarios) => {

    const encontrado = usuarios.find(

     u => u.email === email && u.contrasena === contrasena

    );

    this.cargando = false;

    if (encontrado) {

     sessionStorage.setItem('usuarioActual', JSON.stringify(encontrado));

     this.router.navigate(['/perfil']);

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



 irAInicio(): void { this.router.navigate(['/']);    }

 irARegistro(): void { this.router.navigate(['/registro']); }

}