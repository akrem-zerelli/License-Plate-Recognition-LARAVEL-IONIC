
import { Injectable } from '@angular/core';

import { Storage } from "@ionic/storage";
import { apiKey } from "../../app/apiurls/serverurls.js";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

/*
  Generated class for the CrudProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CrudProvider {

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello CrudProvider Provider');
  }


  getPosts() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer" + value);
        this.http.get(apiKey + "books", {
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
  insertPosts(details) {
    return new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer" + value);
        this.http.post(apiKey + "books", JSON.stringify(details),{
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

  editPosts(id,details) {
    return new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer" + value);

        this.http.put(apiKey + 'books/'+id, JSON.stringify(details),{
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

  deletePosts(id) {
    return new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer" + value);

        this.http.delete(apiKey + 'books/'+id,{
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





}
