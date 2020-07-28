import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthProvider,
    public splashScreen: SplashScreen) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  myLogOut() {
    console.log("Loging out")
    this.authService.logout();
    this.reload();
  }
  reload(){
    //this.splashScreen.show();
    window.location.reload();
  }

}
