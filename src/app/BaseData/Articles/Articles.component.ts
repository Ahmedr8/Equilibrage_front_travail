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
  @ViewChild('closeModal') closebutton!: ElementRef;
  articles: Article[]=[];
  cag:any='';
  cad:any='';
  cb:any='';
  cf:any='';
  m:any='';
  c:any='';
  sc:any='';
  fam4:any='';
  fp:any='';
  date_injection:any='';
  cag_filter:any='';
  cb_filter:any='';
  cf_filter:any='';
  m_filter:any='';
  c_filter:any='';
  sc_filter:any='';
  fam4_filter:any='';
  fp_filter:any='';
  date_injection_filter:any='';
  filter_clicked:boolean=false;
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
        { data: 'fam1', title: 'Collection' },
        { data: 'fam2', title: 'Famille' },
        { data: 'fam3', title: 'Sous Famille' },
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
      fam3:this.sc,
      date_injection:this.date_injection,
      fournisseur_principale:this.fp
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
        if ((this.cag!='')|| (this.cb!='')||(this.cf!='')||(this.m!='')|| (this.c!='')||(this.sc!='') || (this.fp!='')||(this.date_injection!='')){
          this.filter_clicked=true
          this.sc_filter=this.sc
          this.m_filter=this.m
          this.c_filter=this.c
          this.cb_filter=this.cb
          this.cag_filter=this.cag
          this.cf_filter=this.cf
          this.fp_filter=this.fp
          this.date_injection_filter=this.date_injection
        }else
        {this.filter_clicked=false}
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
      fam3:this.sc,
      date_injection:this.date_injection,
      fournisseur_principale:this.fp
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
        if ((this.cag!='')|| (this.cb!='')||(this.cf!='')||(this.m!='')|| (this.c!='')||(this.sc!='') || (this.fp!='')||(this.date_injection!='')){
          this.filter_clicked=true
          this.sc_filter=this.sc
          this.m_filter=this.m
          this.c_filter=this.c
          this.cb_filter=this.cb
          this.cag_filter=this.cag
          this.cf_filter=this.cf
          this.fp_filter=this.fp
          this.date_injection_filter=this.date_injection
        }else
        {this.filter_clicked=false}
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
          this.closebutton.nativeElement.click();
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

  del_filter(filter:any){
    if (filter==this.sc){
      this.sc=''
    }else if (filter==this.cf){
      this.cf=''
    }else  if (filter==this.cag){
      this.cag=''
    }
    else if (filter==this.m){
      this.m=''
    }else if (filter==this.c){
      this.c=''
    }else if(filter==this.cb){
      this.cb=''
    }else if(filter==this.fp){
      this.fp=''
    }else if(filter==this.date_injection){
      this.date_injection=''
    }
    this.page_number=1
    this.end_of_data=false;
    this.no_previous=true;
    this.Filtrer()
  }

  }
 


