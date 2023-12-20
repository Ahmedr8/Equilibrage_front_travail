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

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl+'articles/');
  }

  getArticlesMultipleParams(f:any): Observable<Article[]> {
    let queryParams = f;
    return this.http.get<Article[]>(this.apiUrl+'articles/filtred',{params:queryParams});
}

  getArticleById(id: string): Observable<Article> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Article>(url);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  updateArticle(article: Article): Observable<Article> {
    const url = `${this.apiUrl}/${article.code_article_dem}`;
    return this.http.put<Article>(url, article);
  }

  deleteArticle(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl+'articles/', formData);
  }
}
