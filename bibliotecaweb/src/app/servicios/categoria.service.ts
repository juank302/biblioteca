import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(protected http: HttpClient) { }
  ObtenerTodos(){
    let authToken: string =localStorage.getItem("jwt");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${authToken}`
      })
    };
    return this.http.get<any>(environment.urlServicio +"Categorias",httpOptions);
  }
  CrearCategoria(data){   
    let authToken: string =localStorage.getItem("jwt");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${authToken}`
      })
    };
    return this.http.post<any>(environment.urlServicio +"Categorias",data,httpOptions);
  }
  
Eliminar(id){
  let authToken: string =localStorage.getItem("jwt");
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${authToken}`
    })
  };
  return this.http.delete<any>(environment.urlServicio +"Categorias/"+id,httpOptions);
}
Editar(data){
  let authToken: string =localStorage.getItem("jwt");
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${authToken}`
    })
  };
  return this.http.put<any>(environment.urlServicio +"Categorias",data,httpOptions);
}

  

}
