import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 👇 Reemplaza esta URL con la dirección de tu API de backend
  private API_URL = 'http://localhost:3000/api/usuarios'; // Ejemplo de endpoint de registro

  // Inyectamos HttpClient para poder hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  /**
   * Envía los datos del nuevo usuario al backend.
   * El backend debería esperar un objeto con: nombre, email y contraseña.
   * @param datosUsuario Objeto con los datos del formulario de registro.
   * @returns Un Observable con la respuesta del servidor (ej: el usuario creado).
   */
  registrarUsuario(datosUsuario: any): Observable<any> {
    // Usamos http.post para crear un nuevo recurso (un nuevo usuario)
    // El primer argumento es la URL del endpoint
    // El segundo argumento es el cuerpo (body) de la petición con los datos
    return this.http.post(this.API_URL, datosUsuario);
  }
}