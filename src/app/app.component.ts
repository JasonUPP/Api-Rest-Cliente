import { Component, OnInit } from '@angular/core';
import { PeticionesService } from './../API/peticiones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Rest';
  public tabUser:boolean;
  public tabNewUser:boolean;
  public tabDel: boolean;
  public usuarios;
  Id:Number;
  Nombre: string = '';
  Apellidos: string = '';
  Edad:number;
  operacion:number;
  constructor(
    private peticion: PeticionesService
  ) {  }

  ngOnInit(): void {  
    this.tabUser = false;
    this.tabDel = true;
    this.tabNewUser = true;
    this.getUsers();
  }

  getUsers(){
    this.peticion.getUsers().subscribe(
      data => {
        this.usuarios = data;
      }
    );
  }

  editorOptions(valor){
    this.tabUser = valor;
    this.tabNewUser = !valor;
  }

  modificar(user, operacion){
    this.Id = user.Id;
    this.Nombre = user.Nombre;
    this.Apellidos = user.Apellidos;
    this.Edad = user.Edad;
    this.operacion = operacion;
    this.editorOptions(true);
  }

  btnNew(operacion){
    this.operacion = operacion;
    this.editorOptions(true);
  }

  operacionUsuario(){
    debugger;
    var json = {
      Id: this.Id,
      Nombre: this.Nombre,
      Apellidos: this.Apellidos,
      Edad: Number(this.Edad)
    }

    switch(this.operacion){
      case 0:
        this.peticion.newUser(json).subscribe(
          data => {
            this.editorOptions(false);
            this.getUsers();
          }
        );
        break;
      case 1:
        this.peticion.modifyUser(json).subscribe(
          data=>{
            this.editorOptions(false);
            this.getUsers();
          }
        )
        break;
      case 2:
        this.peticion.eliminar(json.Id).subscribe(
          data=>{
            this.editorDel(true);
            this.getUsers();
          }
        )
        break;
    }
  }

  eliminar(user, operacion){
    this.Id = user.Id;
    this.Nombre = user.Nombre;
    this.operacion = operacion;
    this.editorDel(false);
  }

  editorDel(valor){
    this.tabDel = valor;
    this.tabUser = !valor;
  }
}