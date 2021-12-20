import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FuncionarioEntity } from '../model/funcionario';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(usuario: FuncionarioEntity): Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/padaria/login`, usuario,{observe: 'response'});
  }

  register(usuario: FuncionarioEntity): Observable<FuncionarioEntity | HttpErrorResponse>{
   return this.http.post<FuncionarioEntity | HttpErrorResponse>(`${this.host}/padaria/salvar`, usuario);  
  }

  logOut():void{
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('funcionarios');
  }

  saveToken(token: string):void{
    this.token = token;
    localStorage.setItem('token', token);
  }

  addUserToLocalCash(usuario:FuncionarioEntity): void{
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

  getUserFromLocalCache(): FuncionarioEntity{
    return JSON.parse(localStorage.getItem('usuario'));
  }

  loadToken(): void{
    this.token = localStorage.getItem('token');
  }
  getToken(): string{
    return this.token;
  }

  isLoggedIn(): boolean{
    this.loadToken();
    if(this.token != null && this.token !== ''){
      if(this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if(!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }else{
      this.logOut();
      return false
    }
  }
}
