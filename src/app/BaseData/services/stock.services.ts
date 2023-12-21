// src/app/services/Stock.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/Stock.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl =environment.api

  constructor(private http: HttpClient) {}

  getStocks(page_number:string): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl+'stocks/page='+page_number);
  }

  getStocksMultipleParams(f:any,page_number:string): Observable<Stock[]> {
    let queryParams = f;
    return this.http.get<Stock[]>(this.apiUrl+'stocks/filtred/page='+page_number,{params:queryParams});
}

  getStockById(id: string): Observable<Stock> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Stock>(url);
  }

  createStock(Stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrl, Stock);
  }

  updateStock(Stock: Stock): Observable<Stock> {
    const url = `${this.apiUrl}stocks/${Stock.id_stock}`;
    return this.http.put<Stock>(url, Stock);
  }

  deleteStock(id: string): Observable<any> {
    const url = `${this.apiUrl}stocks/${id}`;
    return this.http.delete(url);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl+'stocks/page=1', formData);
  }
}
