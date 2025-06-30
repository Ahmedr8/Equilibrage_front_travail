// filter.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
interface FilterOption {
    value: string;
    label: string;
  }
@Injectable({
  providedIn: 'root'
})
export class FilterService {
      private apiUrl =environment.api
  constructor(private http: HttpClient) {}

  getGrandFamilleOptions(): Observable<FilterOption[]> {
    return this.http.get<FilterOption[]>(this.apiUrl+'articles/api/grand-famille-options');
  }

  getFamilleOptions(): Observable<FilterOption[]> {
    return this.http.get<FilterOption[]>(this.apiUrl+'articles/api/famille-options');
  }

  getBesoinOptions(): Observable<FilterOption[]> {
    return this.http.get<FilterOption[]>(this.apiUrl+'articles/api/besoin-options');
  }

  getCouleurOptions(): Observable<FilterOption[]> {
    return this.http.get<FilterOption[]>(this.apiUrl+'articles/api/couleur-options');
  }

    getSousFamilleOptions(): Observable<FilterOption[]> {
    return this.http.get<FilterOption[]>(this.apiUrl+'articles/api/sous-famille-options');
  }
     getMaterialsOptions(): Observable<FilterOption[]> {
    return this.http.get<FilterOption[]>(this.apiUrl+'articles/api/materials-options');
  }

     getGroupOptions(): Observable<FilterOption[]> {
    return this.http.get<FilterOption[]>(this.apiUrl+'articles/api/group-options');
  }

   getProvidersOptions(): Observable<FilterOption[]> {
    return this.http.get<FilterOption[]>(this.apiUrl+'articles/api/providers-options');
  }


}