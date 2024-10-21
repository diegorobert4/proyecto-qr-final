import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'; // Importa el BarcodeScanner

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ZXingScannerModule, // Asegúrate de que esto esté aquí
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner, // Añade BarcodeScanner aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
