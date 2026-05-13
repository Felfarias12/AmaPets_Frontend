
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
 providedIn: 'root',
})
export class ConsultaService {
 private http = inject(HttpClient);


 obtenerConsultas(): Observable<bodyAgregaConsulta[]> {
  return this.http.get<bodyAgregaConsulta[]>(environment.apiUrlConsultas);
 }


 crearConsulta(consulta: bodyAgregaConsulta): Observable<bodyAgregaConsulta> {
  return this.http.post<bodyAgregaConsulta>(environment.apiUrlConsultas, consulta);
 }


 editarConsulta(consulta: bodyAgregaConsulta): Observable<bodyAgregaConsulta> {
  return this.http.put<bodyAgregaConsulta>(`${environment.apiUrlConsultas}/${consulta.Id_consulta}`, consulta);
 }


 eliminarConsulta(id: number): Observable<void> {
  return this.http.delete<void>(`${environment.apiUrlConsultas}/${id}`);
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