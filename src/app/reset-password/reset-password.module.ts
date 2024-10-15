import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Asegúrate de importar IonicModule
import { ResetPasswordPage } from './reset-password.page';
import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule, // Asegúrate de incluir esto
    ResetPasswordPageRoutingModule
  ],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}
