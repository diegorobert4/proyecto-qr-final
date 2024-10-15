import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { LoginAlumnoPageRoutingModule } from './login-alumno-routing.module';
import { LoginAlumnoPage } from './login-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de añadir ReactiveFormsModule aquí
    IonicModule,
    LoginAlumnoPageRoutingModule
  ],
  declarations: [LoginAlumnoPage]
})
export class LoginAlumnoPageModule {}
