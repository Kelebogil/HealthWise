import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationaPageRoutingModule } from './registrationa-routing.module';

import { RegistrationaPage } from './registrationa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationaPageRoutingModule
  ],
  declarations: [RegistrationaPage]
})
export class RegistrationaPageModule {}
