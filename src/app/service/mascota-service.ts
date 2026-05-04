import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private http=inject(HttpClient);

  private url="http://localhost:7579/mascotas";
  async obtenerMascotas() {
    return await lastValueFrom(this.http.get<any>(this.url));
  }

}

//endpoints van en service