import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
 providedIn: 'root',
})
export class RegistroService {
 private http = inject(HttpClient);
 private baseUrl = 'http://localhost:7575/usuarios';


obtenerRegistros(): Observable<bodyAgregaRegistro[]> {
 return this.http.get<bodyAgregaRegistro[]>(this.baseUrl);
}

crearRegistro(registro: bodyAgregaRegistro): Observable<bodyAgregaRegistro> {
 return this.http.post<bodyAgregaRegistro>(this.baseUrl, registro);
}

editarRegistro(registro: bodyAgregaRegistro): Observable<bodyAgregaRegistro> {
 return this.http.put<bodyAgregaRegistro>(`${this.baseUrl}/${registro.Id_usuario}`, registro);
}

eliminarRegistro(id: number): Observable<void> {
 return this.http.delete<void>(`${this.baseUrl}/${id}`);
}
}

// Interfaz
export interface bodyAgregaRegistro {
 Id_usuario: number;
 nombre: string;
 email: string;
 contrasena: string;
 edad: number;
 fecha_registro: Date;
}