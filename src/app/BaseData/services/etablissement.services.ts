// src/app/services/Etablissement.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Etablissement } from '../models/Etablissement.model';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {
  private apiUrl =environment.api

  constructor(private http: HttpClient) {}

  getEtablissements(page_number:string): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(this.apiUrl+'etablissements/page='+page_number);
  }

  getAllEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(this.apiUrl+'etablissements/all');
  }

  getEtablissementById(id: string): Observable<Etablissement> {
    const url = `${this.apiUrl}etablissements/${id}`;
    return this.http.get<Etablissement>(url);
  }

  createEtablissement(Etablissement: Etablissement): Observable<Etablissement> {
    return this.http.post<Etablissement>(this.apiUrl, Etablissement);
  }

  updateEtablissement(Etablissement: Etablissement): Observable<Etablissement> {
    const url = `${this.apiUrl}etablissements/${Etablissement.code_etab}`;
    return this.http.put<Etablissement>(url, Etablissement);
  }

  deleteEtablissement(id: string): Observable<any> {
    const url = `${this.apiUrl}etablissements/${id}`;
    return this.http.delete(url);
  }
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl+'etablissements/page=1', formData);
  }
  getEtabssMultipleParams(f:any,page_number:string): Observable<Etablissement[]> {
    let queryParams = f;
    return this.http.get<Etablissement[]>(this.apiUrl+'etablissements/filtred/page='+page_number,{params:queryParams});
}
}
