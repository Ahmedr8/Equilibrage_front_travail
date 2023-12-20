// src/app/services/Proposition.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Proposition,propAffiche } from '../models/proposition.model';


@Injectable({
  providedIn: 'root'
})
export class PropositionService {
  private apiUrl =environment.api

  constructor(private http: HttpClient) {}



  getPropositions(): Observable<Proposition[]> {
    return this.http.get<Proposition[]>(this.apiUrl+'props/');
  }

  getPropositionsById(id: string): Observable<propAffiche[]> {
    const url = `${this.apiUrl}sessions/props/${id}`;
    return this.http.get<propAffiche[]>(url);
  }

  createProposition(data: Proposition): Observable<any> {
    return this.http.post<Proposition>(this.apiUrl, Proposition);
  }

  updateProposition(Proposition: Proposition): Observable<Proposition> {
    const url = `${this.apiUrl}/${Proposition.code_prop}`;
    return this.http.put<Proposition>(url, Proposition);
  }

  deleteProposition(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
