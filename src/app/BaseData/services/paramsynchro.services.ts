import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParamSynchro } from '../models/paramsynchro.model'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParamSynchroService {
  private apiUrl = environment.api// Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getParams(): Observable<ParamSynchro[]> {
    return this.http.get<ParamSynchro[]>(this.apiUrl+'api/azure/param-synchro/');
  }

  updateParam(workspace: string, updatedParam: ParamSynchro): Observable<ParamSynchro> {
    return this.http.put<ParamSynchro>(`${this.apiUrl}api/azure/param-synchro/${workspace}/`, updatedParam);
  }

  syncData(params: any): Observable<any> {
    return this.http.post<void>(`${this.apiUrl}api/azure/sync/`, params);
  }
}
