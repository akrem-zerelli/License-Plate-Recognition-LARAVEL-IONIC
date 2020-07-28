import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

//import { LoginPage } from '../login/login';

//import { RegisterPage } from '../register/register';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = AboutPage;
  tab4Root = ProfilePage;
  //tab5Root = RegisterPage;

  constructor() {
  }
}
