import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.services';
import { Session } from '../models/session.model';
import { DetailDetailSessionService } from '../services/detail_session.services';
import { DetailSession } from '../models/detail_session.model';
import { PropositionService } from '../services/proposition.services';
import { propAffiche } from '../models/proposition.model';
import { NgZone } from '@angular/core';

declare var $ : any
@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css','../equilibrage.component.css']
})
export class SessionsComponent implements OnInit {
  sessions: Session[]=[];
  sessionDetails:DetailSession[]=[];
  etabs:any[]=[];
  articles:any[]=[];  
  props?:propAffiche[];
  date:any='';
  cs:any='';
  crit:any="";
  table_sessions:any;
  table_props:any;
  end_of_data:boolean=false;
  no_previous:boolean=true;
  totalColumns:number=6;
  id_to_delete: string='';
  page_number:number=1;
  stock_min_value: number = 0;
  filter_clicked:boolean=false;
  date_filter:any='';
  cs_filter:any='';
  crit_filter:any="";
  constructor(private sessionService : SessionService,private detailDetailSessionService:DetailDetailSessionService,private propositionService:PropositionService,private zone: NgZone) { }

  ngOnInit() {
    const aux=localStorage.getItem('stock_min')
    if (aux !=null) {
      this.stock_min_value=+aux
    }
    else
    {this.stock_min_value=1}

    this.retrieveSessions();
    this.exposeAngularFunctionGlobally();
  }
  exposeAngularFunctionGlobally(): void {
    // Expose the Angular application globally
    (window as any).myAngularApp = this;
  }
  next_page():void{
    if(this.sessions.length>=10){
    this.end_of_data=false
    this.page_number=this.page_number+1
    this.no_previous=false;
    this.Filtrer();
    if (this.sessions.length=0)
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

  retrieveSessions(): void {
    this.sessionService.getSessions(this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.sessions = data;
          console.log(data)
        },
        error: (e) => console.error(e)
        ,
       complete : () => {
          this.refresh_sessionsList()
      }
      });
  }

  refresh_sessionsList(): void {
    if (this.table_sessions) {
      this.table_sessions.destroy();
    }
    this.table_sessions=$('#datatable').DataTable({ data : this.sessions,
      columns: [
        { data: 'code_session', title: 'Code sessoin' },
        { data: 'libelle', title: 'Libellé' },
        { data: 'date', title: 'Date' },
        { data: 'id_user', title: 'Id Utilisateur' },
        { data: 'critere', title: 'Critère' },
        {
          title: 'Actions',
          orderable: false,
          render: function (data: any, type: any, row: { code_session: any; }, meta: any) {
            return `
              <script> myAngularApp = window.myAngularApp;
              function deleteButtonClick(data) {
                console.log('JavaScript function called!');
                if (myAngularApp) {
                  // Call the Angular function
                  myAngularApp.id_session_to_delete(data);
                } else {
                  console.error('Angular application not found.');
                }
                
            }
            function details_ButtonClick(data) {
              console.log('JavaScript details function called!');
              if (myAngularApp) {
                // Call the Angular function
                myAngularApp.sessionDetail(data);
              } else {
                console.error('Angular application not found.');
              }
              
          }
              </script><div class="d-flex flex-inline">
              <button class="btn btn-success btn-sm rounded-2 m-1" data-id="${row.code_session}" data-bs-toggle="modal" data-bs-target="#details" onclick="details_ButtonClick(${row.code_session})">details</button>
              <button class="btn btn-danger btn-sm rounded-2 m-1" data-id="${row.code_session}" data-bs-toggle="modal" data-bs-target="#delete" onclick="deleteButtonClick('${row.code_session}')">Delete</button>
              </div>
            `;
          },
        },
      ],
      paging: false,        
    });
  }
  refreshList_prop(): void {
    if (this.table_props) {
      this.table_props.destroy();
    }
    this.table_props=$('#datatable3').DataTable({ data : this.props,
      columns: [
        { data: 'ordre_trf', title: 'ordre de transfert' },
        { data: 'code_article_gen', title: 'code article generique' },
        { data: 'code_article_dem', title: 'code article dimensionee' },
        { data: 'code_barre', title: 'code barre' },
        { data: 'emet', title: 'etablissement emmeteur' },
        { data: 'code_depot_emet', title: 'depot emmeteur' },
        { data: 'qte_trf', title: 'quantite a transferer' },
        { data: 'recep', title: 'reçepteur' },
        { data: 'lib_taille', title: ' taille' },
        { data: 'lib_couleur', title: ' couleur' },
        { data: 'code_session', title: 'code session' },
        { data: 'date', title: 'date' },
        { data: 'nom', title: 'nom createur' },
        { data: 'statut', title: 'statut proposition' }
      ],
      select: {
        style: 'multi', // Style of the selection
      },
      buttons: [
        'selectAll',
        'selectNone',
        'excel',
        'colvis',
        'print'
    ],
    dom: 'Bfrtip',
        
    });
  }

  Filtrer(): void{
    const data = {
      date: this.date,
      code_session: this.cs,
      critere: this.crit
    };
    this.sessionService.getsessiosMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.sessions = data;
        console.log(this.sessions);
        
      },
      error: (e) => console.error(e)
      ,
       complete : () => {
          this.refresh_sessionsList()
          if ((this.cs!='')|| (this.date!='')||(this.crit!='')){
            this.filter_clicked=true
            this.cs_filter=this.cs
            this.date_filter=this.date
            this.crit_filter=this.crit
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
      date: this.date,
      code_session: this.cs,
      critere: this.crit
    };
    this.sessionService.getsessiosMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.sessions = data;
        console.log(this.sessions);
        
      },
      error: (e) => console.error(e)
      ,
       complete : () => {
          
          this.refresh_sessionsList()
          if ((this.cs!='')|| (this.date!='')||(this.crit!='')){
            this.filter_clicked=true
            this.cs_filter=this.cs
            this.date_filter=this.date
            this.crit_filter=this.crit
          }else
          {this.filter_clicked=false}
      }
    });
  }

  del_filter(filter:any){
    if (filter==this.cs){
      this.cs=''
    }else if (filter==this.date){
      this.date=''
    }else{
      this.crit=''
    }
    this.Filtrer()
  }

  sessionDetail(id: string): void {
    console.log("details")
    this.articles=[...this.articles,"aaa"];
      this.propositionService.getPropositionsById(id)
      .subscribe({
        next: (propos) => {
          this.props = propos;
          console.log(this.props)
        },
        error: (e) => console.error(e)
        ,
        complete: ()=> {
          this.refreshList_prop()
        }
      });
      this.detailDetailSessionService.getDetailSessionsById(id)
      .subscribe({
        next: (data) => {
          this.sessionDetails = data;
        },
        error: (e) => console.error(e)
        ,
        complete: ()=> {
          this.articles=[];
          this.etabs=[];
          this.refresh_details();
          console.log(this.articles.length);
          console.log(this.etabs.length);
        }
      });
  }

  deleteButtonClick(): void {
    console.log('delete')
    this.sessionService.deleteSession(this.id_to_delete)
    .subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (e) => {console.error(e)
      },
     complete : () => {
        this.retrieveSessions()
    }
    
  });
  
  }

  id_session_to_delete(id: string):void{
    this.id_to_delete=id
    console.log(this.id_to_delete)
  }

refresh_details():void{
  this.zone.run(() => {
  for (let detail of this.sessionDetails) {

    if (!this.articles.includes(detail.code_article_dem)) {
      this.articles = [...this.articles, detail.code_article_dem];
    }

    if (!this.etabs.includes(detail.code_etab)) {
      this.etabs.push(detail.code_etab);
    }
  }
});
}

saveToLocalStorage():void{
  if ( this.stock_min_value === null) {
    this.stock_min_value=1
    alert('le stock minimum a été réinitialisé à 1');

  }
  localStorage.setItem("stock_min", this.stock_min_value.toString());
}

  

}
