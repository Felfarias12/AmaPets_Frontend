import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
 providedIn: 'root',
})
export class ConsultaService {
 private http = inject(HttpClient);
 private baseUrl = 'http://localhost:7583/consultas';


 obtenerConsultas(): Observable<bodyAgregaConsulta[]> {
  return this.http.get<bodyAgregaConsulta[]>(this.baseUrl);
 }


 crearConsulta(consulta: bodyAgregaConsulta): Observable<bodyAgregaConsulta> {
  return this.http.post<bodyAgregaConsulta>(this.baseUrl, consulta);
 }


 editarConsulta(consulta: bodyAgregaConsulta): Observable<bodyAgregaConsulta> {
  return this.http.put<bodyAgregaConsulta>(`${this.baseUrl}/${consulta.Id_consulta}`, consulta);
 }


 eliminarConsulta(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
 }
}


// Interfaz
export interface bodyAgregaConsulta {
 Id_consulta: number;
 fecha_consulta: Date;
 motivo: string;
 diagnostico: string;
 tratamiento: string;
}