import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username!: string;
  displayName!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username']; // Obtener el nombre de usuario desde los parámetros de la URL
      this.displayName = this.getDisplayName(this.username); // Obtener el nombre para mostrar
    });
  }

  // Método para transformar el email en un nombre para mostrar
  private getDisplayName(email: string): string {
    const name = email.split('@')[0]; // Obtener la parte del nombre del email
    return name.charAt(0).toUpperCase() + name.slice(1).replace('.', ' '); // Capitalizar la primera letra y reemplazar el punto con un espacio
  }
}
