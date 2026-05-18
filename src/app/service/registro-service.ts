import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
 providedIn: 'root',
})
export class RegistroService {
 private http = inject(HttpClient);


obtenerRegistros(): Observable<bodyAgregaRegistro[]> {
 return this.http.get<bodyAgregaRegistro[]>(environment.apiUrlRegistros);
}

crearRegistro(registro: bodyAgregaRegistro): Observable<bodyAgregaRegistro> {
 return this.http.post<bodyAgregaRegistro>(environment.apiUrlRegistros, registro);
}

editarRegistro(registro: bodyAgregaRegistro): Observable<bodyAgregaRegistro> {
 return this.http.put<bodyAgregaRegistro>(`${environment.apiUrlRegistros}/${registro.id_usuario!}`, registro);
}

eliminarRegistro(id: number): Observable<string> {
  return this.http.delete(`${environment.apiUrlRegistros}/${id}`, { responseType: 'text' });
}
}

// Interfaz
export interface bodyAgregaRegistro {
 id_usuario?: number;
 nombre: string;
 correo: string;
 contrasena: string;
 edad: number;
}