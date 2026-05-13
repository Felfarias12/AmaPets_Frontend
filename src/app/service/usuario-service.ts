import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

 private http = inject(HttpClient);
 private baseUrl = 'http://localhost:7575/usuarios'; 

 obtenerUsuarios(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(this.baseUrl);
 }

 crearUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(this.baseUrl, usuario);
 }

 editarUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${this.baseUrl}/${usuario.id}`, usuario);
 }

 eliminarUsuario(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
 }
}
