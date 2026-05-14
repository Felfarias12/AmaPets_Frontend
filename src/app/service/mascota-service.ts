import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Mascota } from '../models/mascota.model';


@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private http=inject(HttpClient);

  obtnerMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(environment.apiUrlMascotas);
  }

  crearMascota(mascota: Mascota): Observable<Mascota>{
    return this.http.post<Mascota>(environment.apiUrlMascotas, mascota);
  }

  editarMascota(mascota: Mascota): Observable<Mascota>{
    return this.http.put<Mascota>(`${environment.apiUrlMascotas}/${mascota.id}`, mascota);
  } 

  eliminarMascota(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.apiUrlMascotas}/${id}`);
  }

}