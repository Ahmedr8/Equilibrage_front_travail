// src/app/services/Session.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl =environment.api

  constructor(private http: HttpClient) {}

  getSessions(page_number:string): Observable<Session[]> {
    return this.http.get<Session[]>(this.apiUrl+'sessions/page='+page_number);
  }

  getSessionById(id: string): Observable<Session> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Session>(url);
  }

  createSession(Session: Session): Observable<Session> {
    return this.http.post<Session>(this.apiUrl+'sessions/page=1', Session);
  }

  updateSession(Session: Session): Observable<Session> {
    const url = `${this.apiUrl}sessions/${Session.code_session}`;
    return this.http.put<Session>(url, Session);
  }

  deleteSession(id: string): Observable<any> {
    const url = `${this.apiUrl}sessions/${id}`;
    return this.http.delete(url);
  }

  getsessiosMultipleParams(f:any,page_number:string): Observable<Session[]> {
    let queryParams = f;
    return this.http.get<Session[]>(this.apiUrl+'sessions/filtred/page='+page_number,{params:queryParams});
}
}
