import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {
  username: string = '';
  isLoggingOut: boolean = false;

  constructor(private router: Router, private toastController: ToastController) {
    this.username = localStorage.getItem('username') || ''; // Obtener el nombre del almacenamiento local
  }

  ngOnInit() {
    // Evitar el uso del botón de retroceso del navegador
    this.preventBackNavigation();
  }

  private preventBackNavigation() {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  async logout() {
    this.isLoggingOut = true; // Activar el spinner
    await this.presentToast('Cerrando sesión...'); // Show toast message

    // Simular un proceso de cierre de sesión
    await this.simulateLogoutProcess();

    // Limpiar el almacenamiento local y redirigir al login
    localStorage.removeItem('username');
    this.router.navigate(['/login-docente']); // Redirigir al login
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top', // You can choose 'top', 'bottom', or 'middle'
    });
    await toast.present();
  }

  private async simulateLogoutProcess() {
    return new Promise(resolve => setTimeout(resolve, 2000)); // Simulating logout delay
  }
}
