import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-etab-multi-selector',
  templateUrl: './etab-multi-selector.component.html',
  styleUrls: ['./etab-multi-selector.component.css']
})
export class EtabMultiSelectorComponent {
  @Input() etabs: any[] = [];
  @Input() initialEmetteurs: any[] = [];
  @Input() initialRecepteurs: any[] = [];
  @Input() critere: string = 'vider';
  @Output() emetteursChange = new EventEmitter<any[]>();
  @Output() recepteursChange = new EventEmitter<any[]>();
  @Output() qteChange = new EventEmitter<number>();

  selectedEmetteurs: any[] = [];
  selectedRecepteurs: any[] = [];
qte:number = 0 ;
  ngOnInit() {
    this.selectedEmetteurs = this.initialEmetteurs || [];
    this.selectedRecepteurs = this.initialRecepteurs || [];
  }

  onEmetteursChange(event: any) {
    // Remove any already selected as recepteur
    this.selectedEmetteurs = event.value.filter((e : any) => !this.selectedRecepteurs.some(r => r.code_etab === e.code_etab));
    this.emetteursChange.emit(this.selectedEmetteurs);
  }
isEmetteurSelected(etab: any): boolean {
  return this.selectedEmetteurs.some((e: any) => e.code_etab === etab.code_etab);
}
   toggleEmetteur(etab: any) {
    if (this.isEmetteurSelected(etab)) {
      this.selectedEmetteurs = this.selectedEmetteurs.filter(e => e.code_etab !== etab.code_etab);
    } else if (!this.isRecepteurSelected(etab)) {
      this.selectedEmetteurs = [...this.selectedEmetteurs, etab];
    }
    this.emetteursChange.emit(this.selectedEmetteurs);
  }
  areAllEmetteursSelected(): boolean {
    const selectable = this.etabs.filter(etab => !this.isRecepteurSelected(etab));
    return selectable.length > 0 && selectable.every(etab => this.isEmetteurSelected(etab));
  }
  toggleAllEmetteurs(event: any) {
    if (event.target.checked) {
      this.selectedEmetteurs = this.etabs.filter(etab => !this.isRecepteurSelected(etab));
    } else {
      this.selectedEmetteurs = [];
    }
    this.emetteursChange.emit(this.selectedEmetteurs);
  }

  onRecepteursChange(event: any) {
    // Remove any already selected as emetteur
    this.selectedRecepteurs = event.value.filter((r : any) => !this.selectedEmetteurs.some(e => e.code_etab === r.code_etab));
    this.recepteursChange.emit(this.selectedRecepteurs);
  }

  onQteChange(){
this.qteChange.emit(this.qte)
}

  // Returns true if the etab is already selected as recepteur
isRecepteurSelected(etab: any): boolean {
  return this.selectedRecepteurs.some((r: any) => r.code_etab === etab.code_etab);
}

toggleRecepteur(etab: any) {
    if (this.isRecepteurSelected(etab)) {
      this.selectedRecepteurs = this.selectedRecepteurs.filter(r => r.code_etab !== etab.code_etab);
    } else if (!this.isEmetteurSelected(etab)) {
      this.selectedRecepteurs = [...this.selectedRecepteurs, etab];
    }
    this.recepteursChange.emit(this.selectedRecepteurs);
  }
  areAllRecepteursSelected(): boolean {
    const selectable = this.etabs.filter(etab => !this.isEmetteurSelected(etab));
    return selectable.length > 0 && selectable.every(etab => this.isRecepteurSelected(etab));
  }
  toggleAllRecepteurs(event: any) {
    if (event.target.checked) {
      this.selectedRecepteurs = this.etabs.filter(etab => !this.isEmetteurSelected(etab));
    } else {
      this.selectedRecepteurs = [];
    }
    this.recepteursChange.emit(this.selectedRecepteurs);
  }

// Returns true if the etab is already selected as emetteur


}
