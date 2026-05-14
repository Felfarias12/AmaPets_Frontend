import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';



@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private http=inject(HttpClient);

  obtnerMascotas(): Observable<AgregarMascota[]>{
    return this.http.get<AgregarMascota[]>(environment.apiUrlMascotas);
  }

  crearMascota(mascota: AgregarMascota): Observable<AgregarMascota>{
    return this.http.post<AgregarMascota>(environment.apiUrlMascotas, mascota);
  }

  editarMascota(mascota: AgregarMascota): Observable<AgregarMascota>{
    return this.http.put<AgregarMascota>(`${environment.apiUrlMascotas}/${mascota.id_mascota}`, mascota);
  } 

  eliminarMascota(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.apiUrlMascotas}/${id}`);
  }

}

interface AgregarMascota {
  id_mascota: number; 
  nombre: string;
  edad: number;
  genero: string;      // ¡Este es el que faltaba!
  especie: 'perro' | 'gato' | 'conejo' | 'ave' | 'otro';
  peso: number;
  vacunado: boolean;   // Asegúrate de incluirlo si lo vas a mandar desde el formulario
}