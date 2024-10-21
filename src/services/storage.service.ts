import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  // Crear o guardar un objeto en Local Storage
  createObject(key: string, data: any): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    console.log('Objeto guardado en Local Storage');
  }

  // Obtener un objeto por su clave de Local Storage
  getObjectById(key: string): any {
    const jsonData = localStorage.getItem(key);
    if (jsonData) {
      return JSON.parse(jsonData);
    }
    console.error('Objeto no encontrado');
    return null;
  }

  // Actualizar un objeto en Local Storage
  updateObject(key: string, updatedData: any): void {
    const jsonData = JSON.stringify(updatedData);
    localStorage.setItem(key, jsonData);
    console.log('Objeto actualizado en Local Storage');
  }

  // Cambiar la imagen de un objeto en Local Storage
  changeImage(key: string, newImage: string): void {
    const currentData = this.getObjectById(key);
    if (currentData) {
      currentData.image = newImage; // Suponiendo que el campo de la imagen se llama 'image'
      this.updateObject(key, currentData);
      console.log('Imagen actualizada en Local Storage');
    } else {
      console.error('No se pudo actualizar la imagen: objeto no encontrado');
    }
  }

  // Eliminar un objeto de Local Storage
  deleteObject(key: string): void {
    localStorage.removeItem(key);
    console.log('Objeto eliminado de Local Storage');
  }
}
