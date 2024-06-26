// src/app/services/article.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/Article.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl =environment.api

  constructor(private http: HttpClient) {}

  getArticles(page_number:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl+'articles/page='+page_number);
  }

  getArticlesGen(page_number:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl+'articles/generique/page='+page_number);
  }

  getArticlesMultipleParams(f:any,page_number:string): Observable<Article[]> {
    let queryParams = f;
    return this.http.get<Article[]>(this.apiUrl+'articles/filtred/page='+page_number,{params:queryParams});
}

getArticlesGenMultipleParams(f:any,page_number:string): Observable<Article[]> {
  let queryParams = f;
  return this.http.get<Article[]>(this.apiUrl+'articles/generique/filtred/page='+page_number,{params:queryParams});
}

  getArticleById(id: string): Observable<Article> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Article>(url);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  updateArticle(article: Article): Observable<Article> {
    const url = `${this.apiUrl}articles/${article.code_barre}`;
    return this.http.put<Article>(url, article);
  }

  deleteArticle(id: string): Observable<any> {
    const url = `${this.apiUrl}articles/${id}`;
    return this.http.delete(url);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl+'articles/page=1', formData)
  }
}
