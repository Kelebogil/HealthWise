import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatingPage } from './updating.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatingPageRoutingModule {}
