
import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";
import { apiKey } from "../../app/apiurls/serverurls.js";
import { Http, Headers } from "@angular/http";
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public token: any;
  constructor(public storage: Storage, public http: Http) {
    console.log("Hello AuthProvider Provider");
  }

  createAccount(details) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      this.http
        .post(apiKey + "user/register", JSON.stringify(details), {
          headers: headers
        })
        .subscribe(
          res => {
            let data = res.json();
            //this.token=data.token;
            //this.storage.set('token',data.token);
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
     
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT");
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      this.http
        .post(apiKey + "user/login", JSON.stringify(credentials), {
          headers: headers
        })
        .subscribe(
          res => {
            let data = res.json();
            this.token = data.token;
            this.storage.set("token", data.token);
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  checkAuthentification(){
    return this.testAuth().then((res)=>{
      if(res==='Authorized'){
        return new Promise((resolve,reject)=>{
          this.storage.get('token').then((value)=>{
            this.token=value;
            resolve(this.token);
          })
        })
      }
    }).catch((err)=>{
      console.log(err)
      return 'Unauthorized'
    });
    
  }
  testAuth(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer" + value);
        this.http.get(apiKey + "user/testAuth", {
          headers: headers
        }).map(res => res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            reject(err);
          });
      });
    });
  }
  logout(){
    this.storage.set('token','');
  }
}
