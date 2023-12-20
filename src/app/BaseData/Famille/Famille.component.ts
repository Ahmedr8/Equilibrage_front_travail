import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Famille } from '../models/Famille.models';
import {FamilleService } from '../services/famille.services';
import { DataTableDirective } from 'angular-datatables';
declare var $ : any
@Component({
  selector: 'app-Famille',
  templateUrl: './Famille.component.html',
  styleUrls: ['./Famille.component.css']
})
export class FamilleComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  familles?: Famille[];
  cf:any='';
  lf:any='';
  type:any='';

  table:any;
  datatableElement !: DataTableDirective;
  dtOptions: DataTables.Settings = {};


  constructor(private familleService: FamilleService) { }

  ngOnInit(): void {
    this.retrievefamilles();
    setTimeout(() => {
      this.table=$('#datatable').DataTable();
    }, 500);
  }


  retrievefamilles(): void {
    this.familleService.getFamilles()
      .subscribe({
        next: (data) => {
          this.familles = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    
  }
  Filtrer(): void{
    const data = {
      code_f: this.cf,
      libellef: this.lf,
      type: this.type,
    };
    this.familleService.getFamillesMultipleParams(data)
    .subscribe({
      next: (data) => {
        this.familles = data;
        console.log(this.familles);
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

    this.familleService.uploadFile(fileInput.files[0]).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        // Handle success, e.g., show a success message
        this.retrievefamilles();
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
