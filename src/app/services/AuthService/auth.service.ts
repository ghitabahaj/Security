import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { AppStateService } from '../appState/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private appState: AppStateService) {
  
    this.token = localStorage.getItem('token');
  }

  async login(username: string, password: string) {
    try {
      const loginResponse = await firstValueFrom(this.http.post<any>("http://localhost:8080/login", {
        username: username,
        password: password
      }));

      const token = loginResponse.token;

      localStorage.setItem('token', token);

      this.token = token;

      const decodedJwt: any = jwtDecode(token);

      this.appState.setAuthState({
        isAuthenticated: true,
        username: decodedJwt.sub,
        roles: decodedJwt.roles,
        token: token
      });

      return true; 
    } catch (error) {
      console.error(error);
      return Promise.reject("Login failed. Please check your credentials."); 
    }
  }

  logout() {
  
    localStorage.removeItem('token');


    this.token = null;

  
    this.appState.setAuthState({
      isAuthenticated: false,
      username: undefined,
      roles: undefined,
      token: undefined
    });
  }

  isAuthenticated(): boolean {
   
    return !!this.token;
  }
}
