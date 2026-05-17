export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  contrasena: string;
  edad: number;
}

export interface LoginForm {
  correo: string;
  contrasena: string;
}
