import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

 baseUrl = environment.apiUrl;
 addUserUrl = '/addUser';
 exportDetailsUrl = '/export';
  constructor(private http:HttpClient) { }

  addUserDetails(data:any){
    return this.http.post(this.baseUrl+this.addUserUrl,data);
  }

  exportUserDetails(){
    return this.http.get(this.baseUrl+this.exportDetailsUrl,{responseType:'blob'}) }
}
