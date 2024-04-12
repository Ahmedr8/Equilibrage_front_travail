import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Depot } from '../models/Depot.model';
import { DepotService } from '../services/depot.services';
import { DataTableDirective } from 'angular-datatables';
declare var $ : any
@Component({
  selector: 'app-Depot',
  templateUrl: './Depot.component.html',
  styleUrls: ['./Depot.component.css','../BaseData.component.css']
})
export class DepotComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('closeModal') closebutton!: ElementRef;
  Depots: Depot[]=[];
  filter_clicked:boolean=false;
  cd:any='';
  ce:any='';
  type:any='';
  ce_filter:any='';
  type_filter:any='';
  cd_filter:any='';
  table:any;
  datatableElement !: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  page_number: number=1;
  end_of_data:boolean=false;
  no_previous:boolean=true;
  loading:boolean=false;
  totalColumns:number=5;
  id_to_delete: string='';
  dataLoading:boolean=true

  constructor(private DepotService: DepotService) { }

  ngOnInit(): void {
    this.retrieveDepots();
    this.exposeAngularFunctionGlobally();
  }

  next_page():void{
    if(this.Depots.length>=10){
    this.end_of_data=false
    this.page_number=this.page_number+1
    this.no_previous=false;
    this.Filtrer();
    if (this.Depots.length=0)
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


  retrieveDepots(): void {
    this.DepotService.getDepots(this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.Depots = data;
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
    this.table=$('#datatable').DataTable({ data : this.Depots,
      columns: [
        { data: 'code_depot', title: 'Code' },
        { data: 'code_etab', title: 'Code Etablissement' },
        { data: 'type', title: 'Type' },
        { data: 'libelle', title: 'Libellé' },
        {
          title: 'Actions',
          orderable: false,
          render: function (data: any, type: any, row: { code_depot: any; }, meta: any) {
            return `
              <script> myAngularApp = window.myAngularApp;
              function deleteButtonClick(data) {
                console.log('JavaScript function called!');
                if (myAngularApp) {
                  // Call the Angular function
                  myAngularApp.id_depot_to_delete(data);
                } else {
                  console.error('Angular application not found.');
                }
                
            }
              </script><div class="d-flex flex-inline" style="display: flex;
              justify-content: center;
              align-items: center;">
              <button class="btn btn-danger btn-sm rounded-2 m-1" data-id="${row.code_depot}" data-bs-toggle="modal" data-bs-target="#delete" onclick="deleteButtonClick('${row.code_depot}')">Delete</button>
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
      code_depot: this.cd,
      code_etab: this.ce,
      type: this.type,
    };
    this.DepotService.getDepotsMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.Depots = data;
        console.log(data)
      },
      error: (e) => console.error(e)
      , complete: ()=> {
        this.refreshList()
        if ((this.ce!='')|| (this.cd!='')||(this.type!='')){
          this.filter_clicked=true
          this.ce_filter=this.ce
          this.cd_filter=this.cd
          this.type_filter=this.type
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
      code_depot: this.cd,
      code_etab: this.ce,
      type: this.type,
    };
    this.DepotService.getDepotsMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.Depots = data;
        console.log(data)
      },
      error: (e) => console.error(e)
      , complete: ()=> {
        this.refreshList()
        if ((this.ce!='')|| (this.cd!='')||(this.type!='')){
          this.filter_clicked=true
          this.ce_filter=this.ce
          this.cd_filter=this.cd
          this.type_filter=this.type
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
    this.DepotService.uploadFile(fileInput.files[0]).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
       
      },
      (error) => {
        console.error('File upload failed:', error);
        
      },()=> {
        this.retrieveDepots()
        this.closebutton.nativeElement.click();
        this.loading=false;
      }
    );

    // Clear the file input
    fileInput.value = '';

    
  }

  editButtonClick(depot: Depot):void {
    this.DepotService.updateDepot(depot)
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
    this.DepotService.deleteDepot(this.id_to_delete)
    .subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (e) => {console.error(e)
      },
     complete : () => {
        this.retrieveDepots()
    }
    
  });
  
  }

  id_depot_to_delete(id: string):void{
    this.id_to_delete=id
    console.log(this.id_to_delete)
  }

  exposeAngularFunctionGlobally(): void {
    // Expose the Angular application globally
    (window as any).myAngularApp = this;
  }

  del_filter(filter:any){
    if (filter==this.cd){
      this.cd=''
    }else if (filter==this.ce){
      this.ce=''
    }else  if (filter==this.type){
      this.type=''
    }
    this.page_number=1
    this.end_of_data=false;
    this.no_previous=true;
    this.Filtrer()
  }
}
