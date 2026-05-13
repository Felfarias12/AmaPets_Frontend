export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  contrasena: string;
  edad: number;
}

export interface LoginForm {
  email: string;
  contrasena: string;
}
