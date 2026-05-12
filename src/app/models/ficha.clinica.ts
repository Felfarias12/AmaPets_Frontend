export interface FichaClinica {
  id_ficha_clinica?: number; 
  fecha_creacion: Date | string;
  raza: string;
  especie: string;
  id_usuario: number;
  alergias: string;      
  vacunas: string;       
  fecha_bitacora: Date | string; 
  observaciones: string; 
}

