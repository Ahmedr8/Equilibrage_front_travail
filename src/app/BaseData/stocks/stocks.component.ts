import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Stock } from '../models/Stock.model';
import { StockService } from '../services/stock.services';
import { DataTableDirective } from 'angular-datatables';
declare var $ : any

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  Stocks?: Stock[];
  ce:any='';
  cb:any='';
  cd:any='';
  table:any;
  datatableElement !: DataTableDirective;
  dtOptions: DataTables.Settings = {};


  constructor(private StockService: StockService) { }

  ngOnInit(): void {
    this.retrieveStocks();
    setTimeout(() => {
      this.table=$('#datatable').DataTable();
    }, 500);
  }


  retrieveStocks(): void {
    this.StockService.getStocks()
      .subscribe({
        next: (data) => {
          this.Stocks = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    
  }
  Filtrer(): void{
    const data = {
      code_barre: this.cb,
      code_etab: this.ce,
      code_depot: this.cd
    };
    this.StockService.getStocksMultipleParams(data)
    .subscribe({
      next: (data) => {
        this.Stocks = data;
        console.log(this.Stocks);
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

    this.StockService.uploadFile(fileInput.files[0]).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        // Handle success, e.g., show a success message
        this.retrieveStocks();
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
