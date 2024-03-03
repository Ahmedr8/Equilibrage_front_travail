import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Article } from '../models/Article.model';
import { ArticleService } from '../services/article.services';
import { DataTableDirective } from 'angular-datatables';
declare var $ : any

@Component({
  selector: 'app-Articles',
  templateUrl: './Articles.component.html',
  styleUrls: ['./Articles.component.css','../BaseData.component.css']
})
export class ArticlesComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  articles: Article[]=[];
  cag:any='';
  cad:any='';
  cb:any='';
  cf:any='';
  m:any='';
  c:any='';
  sc:any='';
  fam4:any='';
  table:any;
  page_number:number=1;
  datatableElement !: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  end_of_data:boolean=false;
  no_previous:boolean=true;
  loading:boolean=false;
  totalColumns:number=11;
  id_to_delete: string='';


  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.retrieveArticles();
    this.exposeAngularFunctionGlobally();
  }

  next_page():void{
    if(this.articles.length>=10){
    this.end_of_data=false
    this.page_number=this.page_number+1
    this.no_previous=false;
    this.Filtrer();
    if (this.articles.length=0)
    {
      this.end_of_data=true
    }
    }else{
      this.end_of_data=true
    }
  }
  previous_page():void{
    if(this.page_number>1){
    this.page_number=this.page_number-1
    this.end_of_data=false
    this.Filtrer();
    this.no_previous=false
    }else{
      this.no_previous=true
    }
  }

  retrieveArticles(): void {
    this.articleService.getArticles(this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.articles = data;
        },
        error: (e) => {console.error(e)
        },
       complete : () => {
          this.refreshList()
      }
      
    });
  }

  refreshList(): void {
    if (this.table) {
      this.table.destroy();
    }
    this.table=$('#datatable').DataTable({ data : this.articles,
      columns: [
        { data: 'code_article_dem', title: 'Code DIM' },
        { data: 'code_barre', title: 'Code Barre' },
        { data: 'code_article_gen', title: 'Code Gen' },
        { data: 'libelle', title: 'Désignation' },
        { data: 'lib_taille', title: 'Taille' },
        { data: 'lib_couleur', title: 'Couleur' },
        { data: 'code_fournisseur', title: 'Code Fournisseur' },
        { data: 'fam1', title: 'Modèle' },
        { data: 'fam2', title: 'Catégorie' },
        { data: 'fam3', title: 'Sous Catégorie' },
        {
          title: 'Actions',
          orderable: false,
          render: function (data: any, type: any, row: { code_article_dem: any; }, meta: any) {
            return `
              <script> myAngularApp = window.myAngularApp;
              function deleteButtonClick(data) {
                console.log('JavaScript function called!');
                if (myAngularApp) {
                  // Call the Angular function
                  myAngularApp.id_article_to_delete(data);
                } else {
                  console.error('Angular application not found.');
                }
                
            }
              </script><div class="d-flex flex-inline">
              <button class="btn btn-success btn-sm rounded-2 m-1" data-id="${row.code_article_dem}" onclick="editButtonClick(${row})">Edit</button>
              <button class="btn btn-danger btn-sm rounded-2 m-1" data-id="${row.code_article_dem}" data-bs-toggle="modal" data-bs-target="#delete" onclick="deleteButtonClick('${row.code_article_dem}')">Delete</button>
              </div>
            `;
          },
        },
      ],
      paging: false,        
    });
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
    this.articleService.getArticlesMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.articles = data;
        console.log(this.articles);
      },
      error: (e) => console.error(e)
      , complete: ()=> {
        this.refreshList()
      }
    });
  }

  Filtrer_click(): void{
    this.page_number=1
    this.end_of_data=false;
    this.no_previous=true;
    const data = {
      code_barre: this.cb,
      code_article_gen: this.cag,
      code_fournisseur: this.cf,
      fam1: this.m,
      fam2: this.c,
      fam3:this.sc
    };
    this.articleService.getArticlesMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.articles = data;
        console.log(this.articles);
      },
      error: (e) => console.error(e)
      , complete: ()=> {
        this.refreshList()
      }
    });
  }

  upload():void{
    const fileInput = this.fileInput.nativeElement;
    if (fileInput.files.length === 0) {
      console.log('No file selected.');
      return;
    }
    this.loading=true;
    this.articleService.uploadFile(fileInput.files[0]).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        this.retrieveArticles();
      },
      (error) => {
        console.error('File upload failed:', error);
      },
      () => {
          this.retrieveArticles()
          this.loading=false;
      }
    );

    // Clear the file input
    fileInput.value = '';

    
  }
  editButtonClick(article: Article):void {
    this.articleService.updateArticle(article)
    .subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (e) => {console.error(e)
      },
     complete : () => {
        this.refreshList()
    }
    
  });
  }
  
  deleteButtonClick(): void {
    console.log('delete')
    this.articleService.deleteArticle(this.id_to_delete)
    .subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (e) => {console.error(e)
      },
     complete : () => {
        this.retrieveArticles()
    }
    
  });
  
  }

  id_article_to_delete(id: string):void{
    this.id_to_delete=id
    console.log(this.id_to_delete)
  }

  exposeAngularFunctionGlobally(): void {
    // Expose the Angular application globally
    (window as any).myAngularApp = this;
  }

  }
 


