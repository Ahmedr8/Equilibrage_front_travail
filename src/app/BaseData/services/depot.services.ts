// src/app/services/Depot.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depot } from '../models/Depot.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private apiUrl =environment.api

  constructor(private http: HttpClient) {}

  getDepots(): Observable<Depot[]> {
    return this.http.get<Depot[]>(this.apiUrl+'depots/');
  }

  getDepotsMultipleParams(f:any): Observable<Depot[]> {
    let queryParams = f;
    return this.http.get<Depot[]>(this.apiUrl+'depots/filtred',{params:queryParams});
}

  getDepotById(id: string): Observable<Depot> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Depot>(url);
  }

  createDepot(Depot: Depot): Observable<Depot> {
    return this.http.post<Depot>(this.apiUrl, Depot);
  }

  updateDepot(Depot: Depot): Observable<Depot> {
    const url = `${this.apiUrl}/${Depot.code_depot}`;
    return this.http.put<Depot>(url, Depot);
  }

  deleteDepot(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl+'depots/', formData);
  }
}
