import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'; // Asegúrate de tener esta importación

@Component({
  selector: 'app-marcar-asistencia',
  templateUrl: './marcar-asistencia.page.html',
  styleUrls: ['./marcar-asistencia.page.scss'],
})
export class MarcarAsistenciaPage implements OnInit {
  asignatura: string | null = null;
  fecha: string = '';
  horaActual: string = '';
  nombreUsuario: string = 'Martín Almonacid';
  correoUsuario: string = 'martin.almonacid@duocuc.cl';
  hasDevices: boolean = false;
  hasPermission: boolean = false;

  constructor(
    private storageService: StorageService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private barcodeScanner: BarcodeScanner // Inyecta el servicio BarcodeScanner
  ) {}

  ngOnInit() {
    this.fecha = this.obtenerFechaActual();
    this.horaActual = this.obtenerHoraActual();
    this.checkDeviceAndPermission(); // Verificar dispositivos y permisos

    // Actualiza la hora cada segundo
    setInterval(() => {
      this.horaActual = this.obtenerHoraActual();
    }, 1000);
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  obtenerHoraActual(): string {
    const ahora = new Date();
    return ahora.toLocaleTimeString(); // Retorna la hora en formato local
  }

  async checkDeviceAndPermission() {
    this.hasDevices = true; // Cambia esto según tu lógica de dispositivos
    this.hasPermission = true; // Cambia esto según tu lógica de permisos
  }

  async scan() {
    try {
      const result = await this.barcodeScanner.scan();
      this.handleScanSuccess(result.text); // Asegúrate de que `result.text` sea el valor que deseas
    } catch (error) {
      console.error('Error de escaneo:', error);
      await this.presentToast('Error al escanear el código. Por favor, intenta de nuevo.');
    }
  }

  async marcarAsistencia() {
    if (!this.asignatura) {
      await this.presentToast('No se ha escaneado ninguna asignatura.');
      return;
    }

    const asistenciaData = this.crearAsistenciaData();

    const loading = await this.loadingController.create({
      message: 'Marcando asistencia...',
    });
    await loading.present();

    try {
      await this.storageService.createObject(`asistencia-${Date.now()}`, asistenciaData);
      await this.presentToast(`Asistencia marcada para ${this.asignatura} en la fecha: ${this.fecha}`);
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
      await this.presentToast('Hubo un error al marcar la asistencia. Por favor, inténtalo de nuevo.');
    } finally {
      loading.dismiss();
    }
  }

  crearAsistenciaData() {
    return {
      id: Date.now(),
      asignatura: this.asignatura,
      fecha: this.fecha,
      hora: this.horaActual,
      usuario: {
        nombre: this.nombreUsuario,
        correo: this.correoUsuario,
      },
    };
  }

  handleScanSuccess(result: string) {
    this.asignatura = result; // Guarda el código escaneado
    this.presentToast(`Código escaneado: ${result}`);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
