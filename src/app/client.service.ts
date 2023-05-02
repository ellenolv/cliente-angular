import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient){ }//INJEÇÃO DE DEPENDENCIA - http
  //private vai garantir que o http vai ser usado somente dentro dessa classe

  //Consumindo um end
  getClients():Observable<Client[]>{ //se fosse para devolver apenas um cliente: Observable<Client
    let url = "http://localhost:3000/clients"; //não é a abordagem profissional, mas serve para meios didáticos
    return this.http.get<Client[]>(url);
  } //.get se você quer ver um endpoint (metodo http)

}
