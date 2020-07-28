import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { SplashScreen } from '@ionic-native/splash-screen';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMsg: string;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public splashScreen: SplashScreen,
    public authService: AuthProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  errorFunc(message) {
    let alert = this.alertCtrl.create({
      title: 'Warring!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  myLogIn() {
    if (this.email.trim()!=='') {
      console.log(this.email.trim() + " " + this.password.trim());
      if (this.password.trim() === '') {
        this.errorFunc('Please put your password')
      } else {
        let credentials = {
          email: this.email,
          password: this.password
        };
        this.authService.login(credentials).then((result) => {
          console.log(result);
          this.navCtrl.setRoot(TabsPage);
        }, (err) => {
          console.log(err);
          this.errorFunc('Wrong credentials! try again');
          console.log("credentials: " + JSON.stringify(credentials));
        });
      }
    } else {
      this.errorFunc('Please put a valid password!');
    }
    console.log(this.email.trim() + " " + this.password.trim());
  }
  myRegister(){
    this.navCtrl.push(RegisterPage);
  }
  reload(){
    //this.splashScreen.show();
    window.location.reload();
  }
}
