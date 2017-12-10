import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = "http://192.168.0.250:8080/api/";
//let apiUrl = 'https://api.thewallscript.com/restful/';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials,type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-Requested-With', 'XMLHttpRequest');
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
  getAppointments(dremail: string,type) {
      return new Promise((resolve, reject) =>{
        const headers = new Headers({'Content-Type': 'application/json'});
        var params = {dremail: dremail};
        return this.http.post(apiUrl+type, params, {headers: headers}).
            subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });
    
     });
}
}
