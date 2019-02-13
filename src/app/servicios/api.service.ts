import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:1337/'
 
  constructor(private httpClient: HttpClient) { }

  get(url, parametros) {

    const headers = new HttpHeaders({
      'authorization': localStorage.getItem('access-token')
    })
  

    var params  = new HttpParams()

    for (const key in parametros) {
    params = params.append(key, parametros[key])
    }

    return this.httpClient.get(this.baseUrl+url,{params: params, headers: headers})
  }

  post(url, body){
    const headers = new HttpHeaders({
      'authorization': localStorage.getItem('access-token')
    })

    if(url=='login'){
      return this.httpClient.post(this.baseUrl+url, body);
    }else{
      return this.httpClient.post(this.baseUrl+url, body, {headers: headers});
    }
   
  }

  delete(url){
    return this.httpClient.delete(this.baseUrl+url);
  }

  patch(url, body){

    const headers = new HttpHeaders({
      'authorization': localStorage.getItem('access-token')
    })
    return this.httpClient.patch(this.baseUrl+url, body, {headers: headers});
  }
}
