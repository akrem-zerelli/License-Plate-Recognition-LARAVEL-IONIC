import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CrudProvider } from '../../providers/crud/crud';
import { InsertPage } from '../insert/insert';
import { EditPage } from '../edit/edit';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mydata:any;

  constructor(public navCtrl: NavController,
    public crudProvider:CrudProvider) {
      this.crudProvider.getPosts().then((data)=>{
        console.log(data);
        this.mydata=data['data'];
      });
  }

  onEdit(id, name , details){
    this.navCtrl.push(EditPage,{
      id:id,
      name:name,
      details:details
    })
  }
  insertPage(){
    this.navCtrl.push(InsertPage);
  }
  onDelete(id){
    this.crudProvider.deletePosts(id).then((result)=>{
      console.log(result);
    },(err)=>{
      console.log(err);
    }) 
  }
  detail(item){
    console.log(item)
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  reload(){
    window.location.reload();
  }
}
