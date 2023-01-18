import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationaPage } from './registrationa.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationaPageRoutingModule {}
