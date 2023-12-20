import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.services';
import { Session } from '../models/session.model';
import { DetailDetailSessionService } from '../services/detail_session.services';
import { DetailSession } from '../models/detail_session.model';
import { PropositionService } from '../services/proposition.services';
import { propAffiche } from '../models/proposition.model';
declare var $ : any
@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  sessions: Session[]=[];
  sessionDetails?:DetailSession[];
  etabs:any[]=[];
  articles:any[]=[];  
  props?:propAffiche[];
  date:any='';
  cs:any='';
  crit:any='';
  constructor(private sessionService : SessionService,private detailDetailSessionService:DetailDetailSessionService,private propositionService:PropositionService) { }

  ngOnInit() {
    this.retrieveSessions();
    setTimeout(() => {
      $('#datatable').DataTable({
        columnDefs: [
          { orderable: false, targets: 5 },
          { orderable: false, targets: 6 }
        ],
      });
    }, 500)
  }

  retrieveSessions(): void {
    this.sessionService.getSessions()
      .subscribe({
        next: (data) => {
          this.sessions = data;
        },
        error: (e) => console.error(e)
      });
  }

  Filtrer(): void{
    const data = {
      date: this.date,
      code_session: this.cs,
      critere: this.crit
    };
    this.sessionService.getsessiosMultipleParams(data)
    .subscribe({
      next: (data) => {
        this.sessions = data;
        console.log(this.sessions);
        $('#datatable').DataTable().clear().destroy();
        setTimeout(() => {
          $('#datatable').DataTable({
            columnDefs: [
              { orderable: false, targets: 5 },
              { orderable: false, targets: 6 }
            ],
          });
        }, 500);
      },
      error: (e) => console.error(e)
    });
  }

  sessionDetail(id: number | null): void {
    const idd = id !== null ? id.toString() : '';
    this.detailDetailSessionService.getDetailSessionsById(idd)
      .subscribe({
        next: (data) => {
          this.sessionDetails = data;
  
          // Initialize articles and etabs as empty arrays
          this.articles = [];
          this.etabs = [];
  
          for (let detail of this.sessionDetails) {

            if (!this.articles.includes(detail.code_article_dem)) {
              this.articles.push(detail.code_article_dem);
            }
  
            if (!this.etabs.includes(detail.code_etab)) {
              this.etabs.push(detail.code_etab);
            }
          }
  
          console.log(this.articles);
          console.log(this.etabs);
        },
        error: (e) => console.error(e)
      });
      this.propositionService.getPropositionsById(idd)
      .subscribe({
        next: (propos) => {
          this.props = propos;
          console.log(this.props)
          $('#datatable3').DataTable().clear().destroy();
          setTimeout(() => {
            $('#datatable3').DataTable(
              {
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
              
              }
            );
          }, 500);
        },
        error: (e) => console.error(e)
      });
  }

  sessionDel(ses:Session):void{
    const idd = ses.code_session !== null ? ses.code_session.toString() : '';
    this.sessionService.deleteSession(idd).subscribe({
      next: (res) => {
        console.log(res)
        $('#datatable').DataTable().clear().destroy();
        let table=this.sessions
        const index = table.indexOf(ses, 0);
        if (index > -1) {
        table.splice(index, 1);
        }
        this.sessions=table;
        this.retrieveSessions();
        setTimeout(() => {
          $('#datatable').DataTable({
            columnDefs: [
              { orderable: false, targets: 5 },
              { orderable: false, targets: 6 }
            ],
          });
        }, 500)
      },
      error: (e) => console.error(e)
    });

  }
  

}
