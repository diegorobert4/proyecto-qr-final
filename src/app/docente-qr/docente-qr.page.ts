import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { toDataURL } from 'qrcode';

@Component({
  selector: 'app-docente-qr',
  templateUrl: './docente-qr.page.html',
  styleUrls: ['./docente-qr.page.scss'],
})
export class DocenteQrPage {
  asignaturas = [  
    'ESTADISTICA DESCRIPTIVA_005D',
    'INGLES INTERMEDIO_018D',
    'PROGRAMACION DE APLICACIONES MOVILES_003D',
    'ARQUITECTURA_002D',
    'CALIDAD DE SOFTWARE_002D',
    'ETICA PARA EL TRABAJO_006D',
    'PROCESO DE PORTAFOLIO 4_004D'
  ];

  scannedCode: string | null = null;
  qrCodeDataUrl: string | null = null;
  countdown: number = 120; // 2 minutes in seconds
  timer: any;

  constructor() {}

  selectSubject(asignatura: string) {
    console.log('Asignatura seleccionada:', asignatura);
    const localIp = 'http://192.168.56.1'; // Usando la IP local proporcionada
    const link = `${localIp}/${asignatura.replace(/\s+/g, '-')}`; // Usa la IP local aquí
    this.generateQRCode(link);
    this.startTimer();
  }

  async generateQRCode(link: string) {
    try {
      this.qrCodeDataUrl = await toDataURL(link);
      console.log('Código QR generado:', this.qrCodeDataUrl);
    } catch (error) {
      console.error('Error al generar el código QR:', error);
    }
  }

  startTimer() {
    this.countdown = 120;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timer);
        this.qrCodeDataUrl = null;
        console.log('El tiempo ha expirado.');
      }
    }, 1000);
  }

  async scanBarcode() {
    try {
      const result = await BarcodeScanner.scan();
      this.scannedCode = (result as any).rawValue || 'No se encontró valor en el código';
      console.log('Código escaneado:', this.scannedCode);
    } catch (error) {
      console.error('Error al escanear el código:', error);
    }
  }
}
