import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {

  private http = inject(HttpClient);
  private url = 'http://localhost:7583/consultas';

  // ✅ AHORA SÍ: Observable
  obtenerConsultas() {
    return this.http.get<any>(this.url);
  }

  crearConsulta(nuevaConsulta: any) {
    return this.http.post<any>(this.url, nuevaConsulta);
  }
}

export interface bodyAgregaConsulta {
  Id_consulta: number;
  fecha_consulta: Date;
  motivo: string;
  diagnostico: string;
  tratamiento: string;
}