import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; // Asegúrate de que esta ruta sea correcta
import { Item } from '../../services/item.interface'; // Asegúrate de que esta ruta sea correcta




@Component({
  selector: 'app-prueba-api',
  templateUrl: './prueba-api.page.html',
  styleUrls: ['./prueba-api.page.scss'],
})
export class PruebaApiPage implements OnInit {
  items: Item[] = []; // Usa el tipo Item para items

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.apiService.getItems().subscribe(
      (data: Item[]) => {
        this.items = data;
      },
      (error: any) => {
        console.error('Error fetching items', error);
      }
    );
  }
}
