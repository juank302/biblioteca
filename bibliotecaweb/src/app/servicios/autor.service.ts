import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  
  constructor(protected http: HttpClient) { } 
  CrearAutor(data){   
    let authToken: string =localStorage.getItem("jwt");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${authToken}`
      })
    };
    return this.http.post<any>(environment.urlServicio +"Autores",data,httpOptions);
  }
ObtenerTodos(){
  let authToken: string =localStorage.getItem("jwt");
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${authToken}`
    })
  };
  return this.http.get<any>(environment.urlServicio +"Autores",httpOptions);
}

Eliminar(id){
  let authToken: string =localStorage.getItem("jwt");
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${authToken}`
    })
  };
  return this.http.delete<any>(environment.urlServicio +"Autores/"+id,httpOptions);
}
Editar(data){
  let authToken: string =localStorage.getItem("jwt");
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${authToken}`
    })
  };
  return this.http.put<any>(environment.urlServicio +"Autores",data,httpOptions);
}

}
