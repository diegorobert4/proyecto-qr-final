import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

interface NavigationState {
  scannedCode: string; // Define la estructura esperada
}

@Component({
  selector: 'app-marcar-asistencia',
  templateUrl: './marcar-asistencia.page.html',
  styleUrls: ['./marcar-asistencia.page.scss'],
})
export class MarcarAsistenciaPage implements OnInit {
  asignatura: string | null = null;
  fecha: string = '';
  nombreUsuario: string = 'Martín Almonacid'; // Puedes obtenerlo del almacenamiento local o del contexto de usuario
  correoUsuario: string = 'martin.almonacid@duocuc.cl'; // Puedes obtenerlo del almacenamiento local o del contexto de usuario

  constructor(
    private storageService: StorageService,
    private router: Router,
    private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {
    // Obtener el código escaneado desde el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as NavigationState; // Haz un cast al tipo NavigationState
      this.asignatura = state.scannedCode; // Accede a la propiedad correctamente
    }

    // Establecer la fecha actual
    this.fecha = this.obtenerFechaActual();
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  async marcarAsistencia() {
    if (!this.asignatura) {
      alert('No se ha escaneado ninguna asignatura.');
      return;
    }

    const asistenciaId = Date.now();
    const asistenciaData = {
      id: asistenciaId,
      asignatura: this.asignatura,
      fecha: this.fecha,
      usuario: {
        nombre: this.nombreUsuario,
        correo: this.correoUsuario,
      },
    };

    try {
      await this.storageService.createObject(`asistencia-${asistenciaId}`, asistenciaData);
      alert(`Asistencia marcada para ${this.asignatura} en la fecha: ${this.fecha}`);
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
      alert('Hubo un error al marcar la asistencia. Por favor, inténtalo de nuevo.');
    }
  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false, // iOS y Android
      showFlipCameraButton: true, // iOS y Android
      showTorchButton: true, // iOS y Android
      torchOn: false, // Android
      // saveHistory: true, // Esta propiedad no es válida y se ha eliminado
      prompt: 'Coloca un código QR dentro del área de escaneo', // Android
      resultDisplayDuration: 500, // Android
      formats: 'QR_CODE', // todos los formatos
      orientation: 'portrait', // Android solo
    };
  
    this.barcodeScanner.scan(options).then(barcodeData => {
      this.asignatura = barcodeData.text; // Guarda el código escaneado
      alert(`Código escaneado: ${barcodeData.text}`);
    }).catch(err => {
      console.log('Error: ', err);
      alert('Error al escanear el código.');
    });
  }
  
}
