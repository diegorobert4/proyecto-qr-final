import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MarcarAsistenciaPageRoutingModule } from './marcar-asistencia-routing.module';
import { MarcarAsistenciaPage } from './marcar-asistencia.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcarAsistenciaPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [MarcarAsistenciaPage]
})
export class MarcarAsistenciaPageModule {}
