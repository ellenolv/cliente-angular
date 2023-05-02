import { ClientService } from './../client.service';

import { Client } from './../client';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{//  LEMBRAR DE COLOCAR IMPLEMENTS ONIT

  clients: Client[] = [];

  constructor( private clientService: ClientService){ }//INJEÇÃO DE DEPENDENCIA -
  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(){ //observable -> subscribe
    this.clientService.getClients().subscribe(
      {
        next: data => this.clients = data,
        error: () => console.log("Erro ao chamar o endpoint")
      }
    )
    }
}


