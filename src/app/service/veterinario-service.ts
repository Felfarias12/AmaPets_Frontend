import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Veterinario } from '../models/veterinario.model';
@Injectable({
  providedIn: 'root',
})
export class VeterinarioService {

  private http
   = inject(HttpClient);

  obtenerVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(environment.apiUrlVeterinarios);
  }

  crearVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(environment.apiUrlVeterinarios, veterinario);
  }

  editarVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${environment.apiUrlVeterinarios}/${veterinario.id}`, veterinario);
  }

  eliminarVeterinario(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrlVeterinarios}/${id}`);
  }
}
