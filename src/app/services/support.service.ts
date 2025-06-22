import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  // ¡PEGA LA URL DE TU FUNCIÓN AQUÍ!
  // Según tu captura, es: https://sendticket-dmoixc4jfxq-uc.a.run.app
  private apiUrl = 'https://us-central1-proyectolook4beauty.cloudfunctions.net/sendTicket';

  constructor(private http: HttpClient) { }

  sendTicket(data: any): Observable<any> {
    // Asegúrate de que los datos enviados coincidan con lo que espera tu función de Firebase
    // Si tu función espera {name, email, message} como en tab8.page.ts, esto está bien.
    return this.http.post(this.apiUrl, data);
  }
}