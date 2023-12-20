// src/app/services/DetailSession.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataToSend, DetailSession } from '../models/detail_session.model';


@Injectable({
  providedIn: 'root'
})
export class DetailDetailSessionService {
  private apiUrl =environment.api

  constructor(private http: HttpClient) {}



  getDetailSessions(): Observable<DetailSession[]> {
    return this.http.get<DetailSession[]>(this.apiUrl+'DetailSessions/');
  }

  getDetailSessionsById(id: string): Observable<DetailSession[]> {
    const url = `${this.apiUrl}sessions/${id}`;
    return this.http.get<DetailSession[]>(url);
  }

  createDetailSession(data: DataToSend,id:string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'sessions/details/'+id, data);
  }

  updateDetailSession(DetailSession: DetailSession): Observable<DetailSession> {
    const url = `${this.apiUrl}/${DetailSession.id_detaille}`;
    return this.http.put<DetailSession>(url, DetailSession);
  }

  deleteDetailSession(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
