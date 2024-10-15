import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm: FormGroup;
  showMessage: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    // Inicializa el formulario en el constructor
    this.resetPasswordForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit() {}

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.errorMessage = 'Nombre de usuario requerido';
      this.showMessage = false;
      return;
    }

    const username = this.resetPasswordForm.get('username')?.value;
    this.errorMessage = '';
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
      this.router.navigate(['/login']);
    }, 3000);
  }
}
