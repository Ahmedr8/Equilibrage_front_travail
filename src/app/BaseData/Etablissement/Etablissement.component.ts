import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Etablissement } from '../models/Etablissement.model';
import { EtablissementService } from '../services/etablissement.services';
import { data } from 'jquery';

@Component({
  selector: 'app-Etablissement',
  templateUrl: './Etablissement.component.html',
  styleUrls: ['./Etablissement.component.css','../BaseData.component.css']
})
export class EtablissementComponent implements OnInit {
  etabs: Etablissement[]=[];
  filter_clicked:boolean=false;
  ce:any='';
  type:any='';
  adr:any='';
  ce_filter:any='';
  type_filter:any='';
  adr_filter:any='';
  prio:any;
  editMode=false;
  end_of_data:boolean=false;
  no_previous:boolean=true;
  loading:boolean=false;
  totalColumns:number=7;
  id_to_delete: string='';
  page_number:number=1;
  modif_data: Etablissement=this.etabs[0];
  dataLoading:boolean=true
  constructor(private etabService: EtablissementService) { }
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('closeModal') closebutton!: ElementRef;
  ngOnInit() {
    this.retrieveEtabs();
    this.exposeAngularFunctionGlobally();

  }
  exposeAngularFunctionGlobally(): void {
    // Expose the Angular application globally
    (window as any).myAngularApp = this;
  }
  next_page():void{
    if(this.etabs.length>=10){
    this.end_of_data=false
    this.page_number=this.page_number+1
    this.no_previous=false;
    this.Filtrer();
    if (this.etabs.length=0)
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

  retrieveEtabs(): void {
    this.etabService.getEtablissements(this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.etabs = data;
        },
        error: (e) => console.error(e)
        ,complete : () => {
          this.dataLoading=false
          this.refreshList()
          
        }
      });
    }

    refreshList(): void {
      if (this.etabs) {
        $('#datatable').DataTable().clear().destroy();
      }
      $(document).ready(() => {
        $('#datatable').DataTable({columnDefs: [
          { orderable: false, targets: 6 }
        ],
        paging: false,  
      });
      });
    }

    Filtrer(): void{
      const data = {
        code_etab: this.ce,
        adresse1: this.adr,
        type: this.type,
        
      };
      this.etabService.getEtabssMultipleParams(data,this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.etabs = data;
          console.log(this.etabs);
        },
        error: (e) => console.error(e)
        ,complete : () => {
          this.refreshList()
          if ((this.ce!='')|| (this.adr!='')||(this.type!='')){
            this.filter_clicked=true
            this.ce_filter=this.ce
            this.adr_filter=this.adr
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
        code_etab: this.ce,
        adresse1: this.adr,
        type: this.type,
        
      };
      this.etabService.getEtabssMultipleParams(data,this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.etabs = data;
          console.log(this.etabs);
        },
        error: (e) => console.error(e)
        ,complete : () => {
          this.refreshList()
          if ((this.ce!='')|| (this.adr!='')||(this.type!='')){
            this.filter_clicked=true
            this.ce_filter=this.ce
            this.adr_filter=this.adr
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
      this.etabService.uploadFile(fileInput.files[0]).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
         
        },
        (error) => {
          console.error('File upload failed:', error);
          // Handle error, e.g., show an error message
        }
        , () => {
          this.retrieveEtabs()
          this.closebutton.nativeElement.click();
          this.loading=false;
        }
      );
  
      // Clear the file input
      fileInput.value = '';
  
      
    }
    data_to_modif(etab:Etablissement):void{
      this.modif_data=etab
    }
    modif():void{
      this.etabService.updateEtablissement(this.modif_data)
      .subscribe({
        next: (res) => {
           console.log(res);
        },
        error: (e) => console.error(e)
      });

    }
    toggleEditMode() {
      this.editMode = !this.editMode;
    }
    deleteButtonClick(){
      console.log('delete')
      this.etabService.deleteEtablissement(this.id_to_delete)
      .subscribe({
        next: (data) => {
          console.log(data)
        },
        error: (e) => {console.error(e)
        },
       complete : () => {
          this.retrieveEtabs()
      }
      
    });
    }
    id_article_to_delete(id: string):void{
      this.id_to_delete=id
      console.log(this.id_to_delete)
    }

    del_filter(filter:any){
      if (filter==this.ce){
        this.ce=''
      }else if (filter==this.type){
        this.type=''
      }else  if (filter==this.adr){
        this.adr=''
      }
      this.page_number=1
      this.end_of_data=false;
      this.no_previous=true;
      this.Filtrer()
    }
}
