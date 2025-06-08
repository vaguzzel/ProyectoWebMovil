import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // Importar BehaviorSubject
import { tap } from 'rxjs/operators'; // Importar tap para efectos secundarios en el Observable

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Asegúrate de que esta URL coincida con tu endpoint de login en el backend
  private API_URL = 'http://localhost:5000/api/auth'; // Tu URL base de la API, ya está aquí.

  // BehaviorSubjects para emitir cambios en el estado de autenticación y datos del usuario
  // Se inicializan con los valores que podrían estar ya en localStorage al cargar la app
  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  private _userName = new BehaviorSubject<string | null>(localStorage.getItem('userName'));
  private _userEmail = new BehaviorSubject<string | null>(localStorage.getItem('userEmail'));
  private _userRole = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  private _userId = new BehaviorSubject<number | null>(this.getUserIdFromStorage());


  // Observables públicos para que otros componentes puedan suscribirse a los cambios
  isAuthenticated$ = this._isAuthenticated.asObservable();
  userName$ = this._userName.asObservable();
  userEmail$ = this._userEmail.asObservable();
  userRole$ = this._userRole.asObservable();
  userId$ = this._userId.asObservable();

  // Inyectamos HttpClient para poder hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  // Función privada para verificar si ya hay un token en localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private getUserIdFromStorage(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null; // El '+' convierte el string a número
  }

  /**
   * Envía los datos del nuevo usuario al backend.
   * El backend debería esperar un objeto con: nombre, email y contraseña.
   * @param datosUsuario Objeto con los datos del formulario de registro.
   * @returns Un Observable con la respuesta del servidor (ej: el usuario creado).
   */
  registrarUsuario(datosUsuario: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, datosUsuario);
  }

  loginUsuario(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials).pipe(
      tap((res: any) => {
        // Almacenar token y datos del usuario en localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.nombre); // 'nombre' es la propiedad que obtuvimos de tu consola
        localStorage.setItem('userEmail', res.user.email);
        localStorage.setItem('userRole', res.user.rol);

        // Actualizar los BehaviorSubjects para notificar a los suscriptores
        this._isAuthenticated.next(true);
        this._userName.next(res.user.nombre);
        this._userEmail.next(res.user.email);
        this._userRole.next(res.user.rol);
      })
    );
  }

  /**
   * Cierra la sesión del usuario.
   * Elimina los datos de sesión de localStorage y actualiza los BehaviorSubjects.
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');

    // Actualizar los BehaviorSubjects a su estado inicial (no autenticado, sin datos de usuario)
    this._isAuthenticated.next(false);
    this._userName.next(null);
    this._userEmail.next(null);
    this._userRole.next(null);
    this._userId.next(null);
  }

   /**
   * Actualiza los datos del perfil del usuario (nombre y email).
   * @param profileData Objeto con el nombre y/o email a actualizar.
   * @returns Un Observable con la respuesta del servidor.
   */
  updateProfile(profileData: { nombre: string; email: string }): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API_URL}/profile`, profileData, { headers }).pipe(
      tap(() => {
        // Si la actualización es exitosa, actualizamos los datos en localStorage y en el servicio
        localStorage.setItem('userName', profileData.nombre);
        localStorage.setItem('userEmail', profileData.email);
        this._userName.next(profileData.nombre);
        this._userEmail.next(profileData.email);
      })
    );
  }

  /**
   * Envía la solicitud para cambiar la contraseña del usuario.
   * @param passwordData Objeto con la contraseña actual y la nueva.
   * @returns Un Observable con la respuesta del servidor.
   */
  changePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put(`${this.API_URL}/change-password`, passwordData, { headers });
  }

  /**
   * Retorna el nombre de usuario actualmente almacenado.
   * @returns El nombre de usuario o null si no hay sesión.
   */
  getUserName(): string | null {
    return this._userName.getValue();
  }

  /**
   * Retorna el email de usuario actualmente almacenado.
   * @returns El email de usuario o null si no hay sesión.
   */
  getUserEmail(): string | null {
    return this._userEmail.getValue();
  }

  /**
   * Retorna el rol de usuario actualmente almacenado.
   * @returns El rol de usuario o null si no hay sesión.
   */
  getUserRole(): string | null {
    return this._userRole.getValue();
  }

  /**
   * Retorna el estado actual de autenticación.
   * @returns true si el usuario está autenticado, false en caso contrario.
   */
  isLoggedIn(): boolean {
    return this._isAuthenticated.getValue();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    return this._userId.getValue();
  }
}