import { Component, OnInit } from '@angular/core';
import { ParamSynchro } from '../models/paramsynchro.model';
import { ParamSynchroService } from '../services/paramsynchro.services';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-sync_data',
  templateUrl: './sync_data.component.html',
  styleUrls: ['./sync_data.component.css']
})
export class Sync_dataComponent implements OnInit {

  params: ParamSynchro[] = [];
  editingIndex: number | null = null;
  csv_path='articles'

  constructor(private paramService: ParamSynchroService) {}

  ngOnInit(): void {
    this.loadParams();
  }

  loadParams(): void {
    this.paramService.getParams().subscribe(data => {
      this.params = data;
    });
  }
  enableEdit(index: number): void {
    this.editingIndex = index;
  }

  saveChanges(index: number): void {
    const updatedParam = this.params[index];
    this.paramService.updateParam(updatedParam.workspace, updatedParam).subscribe(() => {
      this.editingIndex = null;
      alert('Les paramètres ont été sauvegardés avec succès !');
    });
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.loadParams(); // Recharge les données pour annuler les modifications
    alert('Modification annulée.');
  }


  // to copy
  // openModal(): void {
  //   const modalElement = document.getElementById('paramModal');
  //   if (modalElement) {
  //     const bootstrapModal = new bootstrap.Modal(modalElement);
  //     bootstrapModal.show();
  //   }
  // }

  // syncData(): void {
  //   // The new object that includes the additional api_spec attribute
  //   this.params[0].path=this.params[0].path+this.csv_path
  //   let requestData = {
  //     ...this.params[0], // Include all existing attributes of syncparams
  //     api_spec: 'articles' // Add the additional attribute
  //   };
  
  //   // Make the API call with the updated object
  //   this.paramService.syncData(requestData).subscribe({
  //     next: (response) => {
  //       console.log('Synchronization successful:', response);
  //       alert('Synchronisation réussie.');
  //     },
  //     error: (error) => {
  //       console.error('Synchronization failed:', error);
  //       alert('Échec de la synchronisation. Veuillez réessayer.');
  //     }
  //   });
  // }
  
}
