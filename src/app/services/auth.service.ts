import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/registro`, data);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }
  estaAutenticado(): boolean {
    const token = this.obtenerToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 4000; // timestamp en ms
      return Date.now() < exp;
    } catch (e) {
      return false;
    }
  }
  
}
