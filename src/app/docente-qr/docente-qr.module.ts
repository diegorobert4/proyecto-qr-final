import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteQrPageRoutingModule } from './docente-qr-routing.module';

import { DocenteQrPage } from './docente-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteQrPageRoutingModule
  ],
  declarations: [DocenteQrPage]
})
export class DocenteQrPageModule {}
