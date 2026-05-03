export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  fotoPerfil?: string;
}

export interface LoginForm {
  email: string;
  contrasena: string;
}
