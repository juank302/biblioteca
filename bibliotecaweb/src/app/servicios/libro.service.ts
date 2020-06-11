import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(protected http: HttpClient) { }

  CrearLibro(data){   
    let authToken: string =localStorage.getItem("jwt");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${authToken}`
      })
    };
    return this.http.post<any>(environment.urlServicio +"Libros",data,httpOptions);
  }
ObtenerTodos(){
  let authToken: string =localStorage.getItem("jwt");
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${authToken}`
    })
  };
  return this.http.get<any>(environment.urlServicio +"Libros",httpOptions);
}

Eliminar(id){
  let authToken: string =localStorage.getItem("jwt");
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${authToken}`
    })
  };
  return this.http.delete<any>(environment.urlServicio +"Libros/"+id,httpOptions);
}
Editar(data){
  let authToken: string =localStorage.getItem("jwt");
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${authToken}`
    })
  };
  return this.http.put<any>(environment.urlServicio +"Libros",data,httpOptions);
}

  
}
