import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Depot } from '../models/Depot.model';
import { DepotService } from '../services/depot.services';
import { DataTableDirective } from 'angular-datatables';
declare var $ : any
@Component({
  selector: 'app-Depot',
  templateUrl: './Depot.component.html',
  styleUrls: ['./Depot.component.css']
})
export class DepotComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  Depots?: Depot[];
  cd:any='';
  ce:any='';
  type:any='';
  table:any;
  datatableElement !: DataTableDirective;
  dtOptions: DataTables.Settings = {};


  constructor(private DepotService: DepotService) { }

  ngOnInit(): void {
    this.retrieveDepots();
    setTimeout(() => {
      this.table=$('#datatable').DataTable();
    }, 500);
  }


  retrieveDepots(): void {
    this.DepotService.getDepots()
      .subscribe({
        next: (data) => {
          this.Depots = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    
  }
  Filtrer(): void{
    const data = {
      code_depot: this.cd,
      code_etab: this.ce,
      type: this.type,
    };
    this.DepotService.getDepotsMultipleParams(data)
    .subscribe({
      next: (data) => {
        this.Depots = data;
        console.log(this.Depots);
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

    this.DepotService.uploadFile(fileInput.files[0]).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        // Handle success, e.g., show a success message
        this.retrieveDepots();
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
