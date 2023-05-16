import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
url = "http://localhost:3000/clients"; //não é a abordagem profissional, mas serve para meios didáticos

  constructor(private http: HttpClient){ }//INJEÇÃO DE DEPENDENCIA - http
  //private vai garantir que o http vai ser usado somente dentro dessa classe

  //Consumindo um end
  getClients():Observable<Client[]>{ //se fosse para devolver apenas um cliente: Observable<Client

    return this.http.get<Client[]>(this.url);
  } //.get se você quer ver um endpoint (metodo http)

  //(recebe um cliente) e devolve outro cliente só que com id
  save(client : Client):Observable<Client>{ //se fosse para devolver apenas um cliente: Observable<Client

    return this.http.post<Client>(this.url, client);
  }
  remove(client : Client):Observable<void>{ //se fosse para devolver apenas um cliente: Observable<Client

    return this.http.delete<void>(`${this.url}/${client.id}`);
  }
  update(client : Client):Observable<Client>{ //se fosse para devolver apenas um cliente: Observable<Client

    return this.http.put<Client>(`${this.url}/${client.id}`, client);
  }
}
