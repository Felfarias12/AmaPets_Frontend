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
 return this.http.put<bodyAgregaRegistro>(`${environment.apiUrlRegistros}/${registro.Id_usuario}`, registro);
}

eliminarRegistro(id: number): Observable<void> {
 return this.http.delete<void>(`${environment.apiUrlRegistros}/${id}`);
}
}

// Interfaz
export interface bodyAgregaRegistro {
 Id_usuario: number;
 nombre: string;
 correo: string;
 contrasena: string;
 edad: number;
}