import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  private urlBase: string = '';
  private urlGetUsers: string = '';
  private urlNewUser: string = '';
  private urlModifyUser: string = '';
  private urlDropUser: string = '';

  constructor(
    private http: HttpClient
  ) 
  {
    this.urlBase = 'http://' + window.location.hostname + ':' + environment.portBase + '/api/Usuario/';
    this.urlGetUsers = this.urlBase + 'getall';
    this.urlNewUser = this.urlBase + 'adduser';
    this.urlModifyUser = this.urlBase + 'updateuser';
    this.urlDropUser = this.urlBase + 'dropuser/';
  }

  getUsers(){
   return this.http.get(this.urlGetUsers);
  }

  newUser(usuario){
    return this.http.post(this.urlNewUser, usuario);
  }

  modifyUser(usuario){
    return this.http.put(this.urlModifyUser,usuario);
  }

  eliminar(id){
    return this.http.delete(this.urlDropUser+id.toString());
  }
}
