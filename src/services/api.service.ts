import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://192.168.56.1/api';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`);
  }

  getItem(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/${id}`);
  }

  createItem(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/items`, data);
  }

  updateItem(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${id}`, data);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${id}`);
  }
}
