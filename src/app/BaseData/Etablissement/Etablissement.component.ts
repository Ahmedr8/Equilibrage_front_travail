import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Etablissement } from '../models/Etablissement.model';
import { EtablissementService } from '../services/etablissement.services';
import { data } from 'jquery';

@Component({
  selector: 'app-Etablissement',
  templateUrl: './Etablissement.component.html',
  styleUrls: ['./Etablissement.component.css']
})
export class EtablissementComponent implements OnInit {
  etabs?: Etablissement[];
  ce:any='';
  type:any='';
  adr:any='';
  prio:any;
  editMode=false;
  constructor(private etabService: EtablissementService) { }
  @ViewChild('fileInput') fileInput!: ElementRef;
  ngOnInit() {
    this.retrieveEtabs();
    setTimeout(() => {
      $('#datatable').DataTable();
    }, 500);

  }
  retrieveEtabs(): void {
    this.etabService.getEtablissements()
      .subscribe({
        next: (data) => {
          this.etabs = data;
        },
        error: (e) => console.error(e)
      });
    }
    Filtrer(): void{
      const data = {
        code_etab: this.ce,
        adresse1: this.adr,
        type: this.type,
        
      };
      this.etabService.getArticlesMultipleParams(data)
      .subscribe({
        next: (data) => {
          this.etabs = data;
          console.log(this.etabs);
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
  
      this.etabService.uploadFile(fileInput.files[0]).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          // Handle success, e.g., show a success message
          this.retrieveEtabs();
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

    modif(etab:Etablissement):any{
      const data=etab;
      this.etabService.updateEtablissement(data)
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
}
