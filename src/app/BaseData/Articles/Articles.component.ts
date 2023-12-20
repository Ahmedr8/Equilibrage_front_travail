import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Article } from '../models/Article.model';
import { ArticleService } from '../services/article.services';
import { DataTableDirective } from 'angular-datatables';
declare var $ : any

@Component({
  selector: 'app-Articles',
  templateUrl: './Articles.component.html',
  styleUrls: ['./Articles.component.css']
})
export class ArticlesComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  articles?: Article[];
  cag:any='';
  cad:any='';
  cb:any='';
  cf:any='';
  m:any='';
  c:any='';
  sc:any='';
  table:any;
  datatableElement !: DataTableDirective;
  dtOptions: DataTables.Settings = {};


  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.retrieveArticles();
    setTimeout(() => {
      this.table=$('#datatable').DataTable();
    }, 500);
  }


  retrieveArticles(): void {
    this.articleService.getArticles()
      .subscribe({
        next: (data) => {
          this.articles = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    
  }
  Filtrer(): void{
    const data = {
      code_barre: this.cb,
      code_article_gen: this.cag,
      code_fournisseur: this.cf,
      fam1: this.m,
      fam2: this.c,
      fam3:this.sc
    };
    this.articleService.getArticlesMultipleParams(data)
    .subscribe({
      next: (data) => {
        this.articles = data;
        console.log(this.articles);
        $('#datatable').DataTable().clear().destroy();
        setTimeout(() => {
          $('#datatable').DataTable();
        }, 500);
      },
      error: (e) => console.error(e)
    });
  }

  upload():void{
    const fileInput = this.fileInput.nativeElement;
    if (fileInput.files.length === 0) {
      console.log('No file selected.');
      return;
    }

    this.articleService.uploadFile(fileInput.files[0]).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        // Handle success, e.g., show a success message
        this.retrieveArticles();
     $('#datatable').DataTable().clear().destroy();
        setTimeout(() => {
          $('#datatable').DataTable();
        }, 500);
      },
      (error) => {
        console.error('File upload failed:', error);
        // Handle error, e.g., show an error message
      }
    );

    // Clear the file input
    fileInput.value = '';

    
  }


  }
 


