import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar esto
import { IonicModule } from '@ionic/angular';

import { LoginDocentePageRoutingModule } from './login-docente-routing.module';
import { LoginDocentePage } from './login-docente.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, // Aquí también
    IonicModule,
    LoginDocentePageRoutingModule
  ],
  declarations: [LoginDocentePage]
})
export class LoginDocentePageModule {}
