// src/app/services/Famille.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Famille } from '../models/Famille.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilleService {
  private apiUrl =environment.api

  constructor(private http: HttpClient) {}

  getFamilles(): Observable<Famille[]> {
    return this.http.get<Famille[]>(this.apiUrl+'articles/familles');
  }

  getFamillesMultipleParams(f:any): Observable<Famille[]> {
    let queryParams = f;
    return this.http.get<Famille[]>(this.apiUrl+'articles/familles/filtred',{params:queryParams});
}

  getFamilleById(id: string): Observable<Famille> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Famille>(url);
  }

  createFamille(Famille: Famille): Observable<Famille> {
    return this.http.post<Famille>(this.apiUrl, Famille);
  }

  updateFamille(Famille: Famille): Observable<Famille> {
    const url = `${this.apiUrl}/${Famille.code_f}`;
    return this.http.put<Famille>(url, Famille);
  }

  deleteFamille(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl+'articles/familles', formData);
  }
}
