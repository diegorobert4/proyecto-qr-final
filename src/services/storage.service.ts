
// Incorporación momentanea de logal storage para simular una base datos ya actualizada,
// prontamente conectar a la api una base de datos modificable..


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

  // Eliminar un objeto de Local Storage
  deleteObject(key: string): void {
    localStorage.removeItem(key);
    console.log('Objeto eliminado de Local Storage');
  }
}
