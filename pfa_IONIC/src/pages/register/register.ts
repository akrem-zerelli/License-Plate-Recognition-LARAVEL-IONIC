import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  name: string = ''
  email: string = '';
  password: string = '';
  errorMsg: string;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  errorFunc(message) {
    let alert = this.alertCtrl.create({
      title: 'Warring!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  myRegister() {
    if (this.email.trim() && this.name.trim() && this.password.trim()) {
     

      if (this.password.trim() === '') {
        this.errorFunc('Please put your password')
      } else {
        let details = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        this.authService.createAccount(details).then((result) => {
          console.log(result);
          this.navCtrl.setRoot(LoginPage);
        }, (err) => {
          console.log(err);
          this.errorFunc('Wrong credentials! try again');
          console.log("credentials: " + JSON.stringify(details));
        });
      }
    } else {
      this.errorFunc('Please put a valid password!');
    }
    console.log(this.name.trim() + " " + this.email.trim() + " " + this.password.trim());
  }
  myLogin(){
    this.navCtrl.push(LoginPage);
  }
}
