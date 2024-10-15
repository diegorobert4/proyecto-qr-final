import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MarcarAsistenciaPageRoutingModule } from './marcar-asistencia-routing.module';
import { MarcarAsistenciaPage } from './marcar-asistencia.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'; // Agregado

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcarAsistenciaPageRoutingModule
  ],
  declarations: [MarcarAsistenciaPage],
  providers: [BarcodeScanner] // Proveedor agregado
})
export class MarcarAsistenciaPageModule {}
