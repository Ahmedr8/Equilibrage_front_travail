import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Stock } from '../models/Stock.model';
import { StockService } from '../services/stock.services';
import { DataTableDirective } from 'angular-datatables';
declare var $ : any

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css','../BaseData.component.css']
})
export class StocksComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('closeModal') closebutton!: ElementRef;
  Stocks: Stock[]=[];
  filter_clicked:boolean=false;
  ce:any='';
  cb:any='';
  cd:any='';
  m:any='';
  c:any='';
  sc:any='';
  cd_filter:any='';
  cb_filter:any='';
  ce_filter:any='';
  m_filter:any='';
  c_filter:any='';
  sc_filter:any='';
  table:any;
  datatableElement !: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  end_of_data:boolean=false;
  no_previous:boolean=true;
  loading:boolean=false;
  totalColumns:number=8;
  id_to_delete: string='';
  page_number:number=1;
  dataLoading:boolean=true

  constructor(private StockService: StockService) { }

  ngOnInit(): void {
    this.retrieveStocks();
    this.exposeAngularFunctionGlobally();
  }

  exposeAngularFunctionGlobally(): void {
    // Expose the Angular application globally
    (window as any).myAngularApp = this;
  }

  next_page():void{
    if(this.Stocks.length>=10){
    this.end_of_data=false
    this.page_number=this.page_number+1
    this.no_previous=false;
    this.Filtrer();
    if (this.Stocks.length=0)
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

  retrieveStocks(): void {
    this.StockService.getStocks(this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.Stocks = data;
          console.log(data)
        },
        error: (e) => console.error(e)
        ,
       complete : () => {
        this.dataLoading=false
          this.refreshList()
      }
      });
  }

  refreshList(): void {
    if (this.table) {
      this.table.destroy();
    }
    this.table=$('#datatable').DataTable({ data : this.Stocks,
      columns: [
        { data: 'code_article_dem', title: 'Code DIM' },
        { data: 'code_barre', title: 'Code Barre' },
        { data: 'code_etab', title: 'Code Etablissement' },
        { data: 'code_depot', title: 'Code Dépot' },
        { data: 'stock_min', title: 'Stock Min' },
        { data: 'stock_physique', title: 'Stock Physique' },
        { data: 'ventes', title: 'quantite vendu' },
        {
          title: 'Actions',
          orderable: false,
          render: function (data: any, type: any, row: { id_stock: any; }, meta: any) {
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
              <button class="btn btn-danger btn-sm rounded-2 m-1" data-id="${row.id_stock}" data-bs-toggle="modal" data-bs-target="#delete" onclick="deleteButtonClick('${row.id_stock}')">Delete</button>
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
      code_etab: this.ce,
      code_depot: this.cd,
      fam1: this.m,
      fam2: this.c,
      fam3: this.sc
    };
    this.StockService.getStocksMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.Stocks = data;
        console.log(this.Stocks);
      },
      error: (e) => console.error(e)
      , complete: ()=> {
        this.refreshList()
        if ((this.cd!='')|| (this.cb!='')||(this.ce!='')||(this.m!='')|| (this.c!='')||(this.sc!='')){
          this.filter_clicked=true
          this.sc_filter=this.sc
          this.m_filter=this.m
          this.c_filter=this.c
          this.cb_filter=this.cb
          this.cd_filter=this.cd
          this.ce_filter=this.ce
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
      code_etab: this.ce,
      code_depot: this.cd,
      fam1: this.m,
      fam2: this.c,
      fam3: this.sc
    };
    this.StockService.getStocksMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.Stocks = data;
        console.log(this.Stocks);
      },
      error: (e) => console.error(e)
      , complete: ()=> {
        this.refreshList()
        if ((this.cd!='')|| (this.cb!='')||(this.ce!='')||(this.m!='')|| (this.c!='')||(this.sc!='')){
          this.filter_clicked=true
          this.sc_filter=this.sc
          this.m_filter=this.m
          this.c_filter=this.c
          this.cb_filter=this.cb
          this.cd_filter=this.cd
          this.ce_filter=this.ce
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
    this.StockService.uploadFile(fileInput.files[0]).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        // Handle success, e.g., show a success message
       
      },
      (error) => {
        console.error('File upload failed:', error);
        // Handle error, e.g., show an error message
      },
      () => {
          this.retrieveStocks()
          fileInput.value = '';
          this.closebutton.nativeElement.click();
          this.loading=false;
      }
    );



    
  }

  editButtonClick(stock: Stock):void {
    this.StockService.updateStock(stock)
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
    this.StockService.deleteStock(this.id_to_delete)
    .subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (e) => {console.error(e)
      },
     complete : () => {
        this.retrieveStocks()
    }
    
  });
  
  }

  id_article_to_delete(id: string):void{
    this.id_to_delete=id
    console.log(this.id_to_delete)
  }

  del_filter(filter:any){
    if (filter==this.sc){
      this.sc=''
    }else if (filter==this.ce){
      this.ce=''
    }else  if (filter==this.cd){
      this.cd=''
    }
    else if (filter==this.m){
      this.m=''
    }else if (filter==this.c){
      this.c=''
    }else if(filter==this.cb){
      this.cb=''
    }
    this.page_number=1
    this.end_of_data=false;
    this.no_previous=true;
    this.Filtrer()
  }
}
