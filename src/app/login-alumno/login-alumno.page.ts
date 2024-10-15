import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Alumno {
  email: string;
  nombre: string;
  estado: string;
}

@Component({
  selector: 'app-login-alumno',
  templateUrl: './login-alumno.page.html',
  styleUrls: ['./login-alumno.page.scss'],
})
export class LoginAlumnoPage {
  loginForm: FormGroup;
  loading: boolean = false;
  passwordVisible: boolean = false; // Estado para mostrar/ocultar la contraseña
  passwordInputType: string = 'password'; // Tipo del input de la contraseña
  passwordIcon: string = 'eye-off'; // Icono inicial

  // Datos de los usuarios
  private readonly alumnos: Alumno[] = [
    { email: 'martin.almonacid@duocuc.cl', nombre: 'Martín Almonacid', estado: 'Presente' },
    { email: 'diego.mesias@duocuc.cl', nombre: 'Diego Mesías', estado: 'Presente' },
    { email: 'diego.robert@duocuc.cl', nombre: 'Diego Robert', estado: 'Presente' },
  ];

  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return; // No hace nada si el formulario es inválido
    }

    this.loading = true;
    const { username, password } = this.loginForm.value;

    // Validar las credenciales
    const usuarioValido = this.alumnos.find(alumno => 
      alumno.email === username && password === 'Perro234$1'
    );

    // Simula una espera de red
    setTimeout(() => {
      this.loading = false;

      if (usuarioValido) {
        localStorage.setItem('username', usuarioValido.nombre); // Almacenar nombre de usuario
        localStorage.setItem('correo', usuarioValido.email); // Almacenar correo
        this.router.navigate(['/home'], { queryParams: { username: usuarioValido.nombre } }); // Navegar a la página de inicio
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos'; // Mensaje de error
      }
    }, 2000); // Ajusta el tiempo según sea necesario
  }

  navigateToResetPassword() {
    this.router.navigate(['/reset-password']); // Redirige a reset-password.html
  }


  // Asignación para la visibilidad de la contraseña 
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordInputType = this.passwordVisible ? 'text' : 'password';
    this.passwordIcon = this.passwordVisible ? 'eye' : 'eye-off';
  }
}
