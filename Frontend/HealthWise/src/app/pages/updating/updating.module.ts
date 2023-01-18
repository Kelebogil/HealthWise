import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatingPageRoutingModule } from './updating-routing.module';

import { UpdatingPage } from './updating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatingPageRoutingModule,
    ReactiveFormsModule,
    FormControl
  ],
  declarations: [UpdatingPage]
})
export class UpdatingPageModule {}
