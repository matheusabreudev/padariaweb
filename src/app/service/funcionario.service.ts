import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FuncionarioEntity } from '../model/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<FuncionarioEntity[]> | HttpErrorResponse{
    return this.http.get<FuncionarioEntity[]>(`${this.host}/padaria/funcionarios`);
  }

  addFuncionario(formData: FormData): Observable<FuncionarioEntity> | HttpErrorResponse{
    return this.http.post<FuncionarioEntity>(`${this.host}/padaria/salvar`, formData);
  }

  attFuncionario(formData: FormData): Observable<FuncionarioEntity> | HttpErrorResponse{
    return this.http.post<FuncionarioEntity>(`${this.host}/padaria/attFuncionario`, formData);
  }

  deleteUser(userId: number): Observable<any | HttpErrorResponse>{
    return this.http.delete<any>(`${this.host}/padaria/deletar/funcionario/${userId}`);
  }

  addFuncionariosToLocalCache(funcionarios: FuncionarioEntity[]): void{
    localStorage.setItem('funcionarios',JSON.stringify(funcionarios));
  }

  getFuncionariosToLocalCache(): FuncionarioEntity[]{
    if(localStorage.getItem('funcionarios')){
      return JSON.parse(localStorage.getItem('funcionarios'));
    }
    return null;
    
  }

  createFuncionarioFormData(loggedInUsername: string, usuario: FuncionarioEntity): FormData{
      const formData = new FormData();
      formData.append('currentUsername',loggedInUsername);
      formData.append('usuario',usuario.usuario);
      formData.append('senha',usuario.senha);
      formData.append('email',usuario.email);
      formData.append('roles',JSON.stringify(usuario.roles));
      return formData;
  }


}


