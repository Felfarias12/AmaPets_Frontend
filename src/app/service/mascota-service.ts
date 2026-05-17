import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private http = inject(HttpClient);

  obtenerMascotas(): Observable<AgregarMascota[]> {
    return this.http.get<AgregarMascota[]>(environment.apiUrlMascotas);
  }

  crearMascota(mascota: AgregarMascota): Observable<AgregarMascota> {
    return this.http.post<AgregarMascota>(environment.apiUrlMascotas, mascota);
  }

  editarMascota(mascota: AgregarMascota): Observable<AgregarMascota> {
    return this.http.put<AgregarMascota>(`${environment.apiUrlMascotas}/${mascota.id_mascota!}`, mascota);
  }

  eliminarMascota(id: number): Observable<string> {
    return this.http.delete(`${environment.apiUrlMascotas}/${id}`, { responseType: 'text' });
  }
}

export interface AgregarMascota {  // ← export agregado
  id_mascota?: number;             // ← ? para que sea opcional al crear
  nombre: string;
  edad: number;
  genero: string;
  especie: 'perro' | 'gato' | 'conejo' | 'ave' | 'otro';
  raza: string;
  peso: number;
  vacunado: boolean;
  emoji?: string;
  colorClase?: string;
}