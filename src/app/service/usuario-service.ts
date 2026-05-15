import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

 private http = inject(HttpClient);

 obtenerUsuarios(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(this.apiUrlUsuarios);
 }

 crearUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(this.apiUrlUsuarios, usuario);
 }

 editarUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${this.apiUrlUsuarios}/${usuario.id}`, usuario);
 }

 eliminarUsuario(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrlUsuarios}/${id}`);
 }
}
