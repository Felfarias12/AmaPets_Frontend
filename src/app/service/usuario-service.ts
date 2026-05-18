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
  return this.http.get<Usuario[]>(environment.apiUrlUsuarios);
 }

 crearUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(environment.apiUrlUsuarios, usuario);
 }

 editarUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${environment.apiUrlUsuarios}/${usuario.id}`, usuario);
 }

 eliminarUsuario(id: number): Observable<void> {
  return this.http.delete<void>(`${environment.apiUrlUsuarios}/${id}`);
 }
}
