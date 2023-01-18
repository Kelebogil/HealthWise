import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
// import { LoginPage } from '../login/login.page';
import { RegistrationPage } from '../pages/registration/registration.page';
import { LoginPage } from '../pages/login/login.page'

// import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'registration',
    component:  RegistrationPage,
  }

  // {
  //   path: 'forgot-password',
  //   component:  ForgotPasswordPage,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
