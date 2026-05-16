import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FichaClinicaService {
  private http = inject(HttpClient);

  obtenerFichas(): Observable<agregarFichaClinica[]> {
    return this.http.get<agregarFichaClinica[]>(environment.apiUrlFichasClinicas);
  }

  obtenerFichaPorId(id: number): Observable<agregarFichaClinica> {
    return this.http.get<agregarFichaClinica>(`${environment.apiUrlFichasClinicas}/${id}`);
  }

  crearFicha(ficha: agregarFichaClinica): Observable<agregarFichaClinica> {
    return this.http.post<agregarFichaClinica>(environment.apiUrlFichasClinicas, ficha);
  }

  editarFicha(ficha: agregarFichaClinica): Observable<agregarFichaClinica> {
    return this.http.put<agregarFichaClinica>(`${environment.apiUrlFichasClinicas}/${ficha.id_ficha_clinica}`, ficha);
  }

  eliminarFicha(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrlFichasClinicas}/${id}`);
  }
}

export interface agregarFichaClinica {
  id_ficha_clinica: number;
  mascotaId: number;
  fecha: string;
  motivo: string;
  veterinario: string;
  diagnostico: string;
  tratamiento: string;
  notas?: string;
  peso: number;
  temperatura: string;
}