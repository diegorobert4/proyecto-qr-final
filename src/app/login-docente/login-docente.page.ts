import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-docente',
  templateUrl: 'login-docente.page.html',
  styleUrls: ['login-docente.page.scss'],
})
export class LoginDocentePage {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  showPassword = false;

  // Datos del usuario
  private readonly userEmail = 'ronald.villalobos@docente.duoc';
  private readonly userPassword = 'Ronald1';
  private readonly userName = 'Ronald Villalobos';

  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    try {
      // Verificación de credenciales
      if (username === this.userEmail && password === this.userPassword) {
        // Guardar el nombre de usuario en localStorage
        localStorage.setItem('username', this.userName);

        // Redirige a la página principal del docente
        this.router.navigate(['/home-docente']);
      } else {
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    } catch (error) {
      this.errorMessage = 'Error en el inicio de sesión. Por favor, inténtalo de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
