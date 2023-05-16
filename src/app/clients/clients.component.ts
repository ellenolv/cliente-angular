import { ClientService } from './../client.service';

import { Client } from './../client';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{
//  LEMBRAR DE COLOCAR IMPLEMENTS ONIT

  clients: Client[] = [];
  formGroupClient : FormGroup;
  isEditing:  boolean = false;

  constructor( private clientService: ClientService, private formBuilder: FormBuilder){//INJEÇÃO DE DEPENDENCIA -
    this.formGroupClient = formBuilder.group({
      id : [''],
      name : [''],
      email : ['']
    });//na hora de cadastrar de fato, não colocar a variável id
    //Form Group Client é o que
  }






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

    save(){ //se devolve um observable é necessário um subscribe
      if(this.isEditing){

        this.clientService.update(this.formGroupClient.value).subscribe(
          {
            next: () =>  {
              this.loadClients();
              this.formGroupClient.reset();
              this.isEditing = false;
            }
          }
        )

      }
      else{
        this.clientService.save(this.formGroupClient.value).subscribe(
          {
            //a resposta chega pelo next | client é data
            next : data => { //tratando o retorno do save |
              this.clients.push(data); //atualiza o array
              this.formGroupClient.reset();
            }
          }
         );
      }
    }



    remove(client: Client):void{
      this.clientService.remove(client).subscribe(
        {
          //a resposta chega pelo next, ou seja, se tudo for feito com sucesso
          next:() => this.loadClients()
        });
    }

    edit(client: Client):void{
      this.formGroupClient.setValue(client);//
      this.isEditing = true;
    }
}


