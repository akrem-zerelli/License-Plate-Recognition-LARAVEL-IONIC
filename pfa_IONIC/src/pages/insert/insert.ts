import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { HomePage } from '../home/home';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the InsertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-insert',
  templateUrl: 'insert.html',
})
export class InsertPage {

  myInfo = {
    name: '',
    details: ''
  }
  constructor(public navCtrl: NavController,
    public splashScreen: SplashScreen,
    public navParams: NavParams,
    public crudProvider: CrudProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertPage');
  }
  
  insertData(){
    this.crudProvider.insertPosts(this.myInfo).then((result)=>{
      this.navCtrl.push(HomePage);
      this.reload();
    },(err)=>{
      console.log(err);
    })
  }
  reload(){
    //this.splashScreen.show();
    window.location.reload();
  }
}
