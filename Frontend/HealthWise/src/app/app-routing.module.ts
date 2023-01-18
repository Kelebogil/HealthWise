import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
{
  path: 'bookings',
    loadChildren: () => import('./pages/bookings/bookings.module').then( m => m.BookingsPageModule)
},
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'user-view',
    loadChildren: () => import('./pages/user-view/user-view.module').then( m => m.UserViewPageModule)

  },
  {
    path: 'admin-login',
    loadChildren: () => import('./pages/admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./pages/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./pages/appointments/appointments.module').then( m => m.AppointmentsPageModule)
  },
  {
    path: 'appointment-details',
    loadChildren: () => import('./pages/appointment-details/appointment-details.module').then( m => m.AppointmentDetailsPageModule)
  },
  {
    path: 'admin-profile',
    loadChildren: () => import('./pages/admin-profile/admin-profile.module').then( m => m.AdminProfilePageModule)
  },
  {
    path: 'registrationa',
    loadChildren: () => import('./pages/registrationa/registrationa.module').then( m => m.RegistrationaPageModule)
  },
  {
    path: 'list-users',
    loadChildren: () => import('./pages/list-users/list-users.module').then( m => m.ListUsersPageModule)
  },
  {
    path: 'users-details',
    loadChildren: () => import('./pages/users-details/users-details.module').then( m => m.UsersDetailsPageModule)
  },
  {
    path: 'updating',
    loadChildren: () => import('./pages/updating/updating.module').then( m => m.UpdatingPageModule)
  },
  {
    path: 'list-users',
    loadChildren: () => import('./pages/list-users/list-users.module').then( m => m.ListUsersPageModule)
  },
  {
    path: 'users-details',
    loadChildren: () => import('./pages/users-details/users-details.module').then( m => m.UsersDetailsPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

