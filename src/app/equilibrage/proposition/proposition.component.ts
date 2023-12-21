import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/BaseData/models/Article.model';
import { Etablissement } from 'src/app/BaseData/models/Etablissement.model';
import { ArticleService } from 'src/app/BaseData/services/article.services';
import { EtablissementService } from 'src/app/BaseData/services/etablissement.services';
import { SessionService } from 'src/app/equilibrage/services/session.services';
import { Session } from '../models/session.model';
import { DatePipe } from '@angular/common';
import { DetailDetailSessionService } from '../services/detail_session.services';
import { PropositionService } from '../services/proposition.services';
import { propAffiche } from '../models/proposition.model';
declare var $ : any
@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.css']
})
export class PropositionComponent implements OnInit {
  articles?: Article[];
  cag:any='';
  cad:any='';
  cb:any='';
  cf:any='';
  m:any='';
  c:any='';
  sc:any='';
  ce:any='';
  type:any='';
  adr:any='';
  etabs?: Etablissement[];
  props?:propAffiche[];
  lib:any;
  datei?: any =new Date();
  options: string[]=['stock_min','moy_vente'];
  crit:any;
  id_session:any;
  tablepending:any;
  tableEtabs:any;
  submitted = false;
  created=false;
  articleA=true;
  etabA=false;
  page_number:number=1;
  constructor(private articleService: ArticleService,private etabService: EtablissementService,private sessionService:SessionService,private datePipe: DatePipe,private detailDetailSessionService: DetailDetailSessionService,private propositionService:PropositionService) { }

  ngOnInit() {
    this.retrieveArticles();
    this.retrieveEtabs();
    setTimeout(() => {
        this.tablepending= $('#datatable1').DataTable({
        columnDefs: [
          {
            orderable: false,
            className: 'select-checkbox',
            targets: 0 // This targets the first column for selection
          },
          // Add more columnDefs as needed
        ],
        select: {
          style: 'os multi', // Style of the selection
          selector: 'td:first-child' // Selector for selecting cells in the first column
        },
        order: [[1, 'asc']],
        buttons: [
          'selectAll',
          'selectNone'
      ],
      dom: 'Bfrtip'
      }
        );
     this.tableEtabs= $('#datatable2').DataTable({
        columnDefs: [
          {
            orderable: false,
            className: 'select-checkbox',
            targets: 0 // This targets the first column for selection
          },
          // Add more columnDefs as needed
        ],
        select: {
          style: 'os multi', // Style of the selection
          selector: 'td:first-child' // Selector for selecting cells in the first column
        },
        order: [[1, 'asc']],
        buttons: [
          'selectAll',
          'selectNone'
      ],
      dom: 'Bfrtip'
      }
        );
    }, 500);
    
  
  }
  retrieveArticles(): void {
    this.articleService.getArticles(this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.articles = data;
        },
        error: (e) => console.error(e)
      });
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
  retrieveprops(): void {
    this.propositionService.getPropositionsById(this.id_session)
      .subscribe({
        next: (data) => {
          this.props = data;
          console.log(this.props)
        },
        error: (e) => console.error(e)
      });
  }
  Filtrer(): void{
    const data = {
      code_barre: this.cb,
      code_article_gen: this.cag,
      code_fournisseur: this.cf,
      fam1: this.m,
      fam2: this.c,
      fam3:this.sc
    };
    this.articleService.getArticlesMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.articles = data;
        console.log(this.articles);
        $('#datatable1').DataTable().clear().destroy();
        setTimeout(() => {
          this.tablepending= $('#datatable1').DataTable({
            columnDefs: [
              {
                orderable: false,
                className: 'select-checkbox',
                targets: 0 // This targets the first column for selection
              },
              // Add more columnDefs as needed
            ],
            select: {
              style: 'os multi', // Style of the selection
              selector: 'td:first-child' // Selector for selecting cells in the first column
            },
            order: [[1, 'asc']],
            buttons: [
              'selectAll',
              'selectNone'
          ],
          dom: 'Bfrtip'
          }
            );
        }, 500);
      },
      error: (e) => console.error(e)
    });
  }
  Filtrer2(): void{
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
        $('#datatable2').DataTable().clear().destroy();
        setTimeout(() => {
          this.tableEtabs= $('#datatable2').DataTable({
            columnDefs: [
              {
                orderable: false,
                className: 'select-checkbox',
                targets: 0 // This targets the first column for selection
              },
              // Add more columnDefs as needed
            ],
            select: {
              style: 'os multi', // Style of the selection
              selector: 'td:first-child' // Selector for selecting cells in the first column
            },
            order: [[1, 'asc']],
            buttons: [
              'selectAll',
              'selectNone'
          ],
          dom: 'Bfrtip'
          }
            );
        }, 500);
      },
      error: (e) => console.error(e)
    });
  }
  articleShow(v:boolean):void{
    this.articleA=v;
    this.etabA= !(v);
  }
  Ajouter():void{
    const data = {
      code_session: null,
      libelle: this.lib,
      critere: this.crit,
      date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      id_user: 2

    };
    this.sessionService.createSession(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.id_session=res.code_session;
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  createProp():void{
    
    const tab2 = this.tableEtabs.rows({selected:  true}).data();
    const id_etabs=[];       
      for (var i=0; i < tab2.length ;i++){
        id_etabs.push(tab2[i][1]);
      }  
      const tab1 = this.tablepending.rows({selected:  true}).data();
      const id_articles=[];       
         for (var i=0; i < tab1.length ;i++){
           id_articles.push(tab1[i][1]);
         }
      const datatosend={
        articles:id_articles,
        etabs: id_etabs
      }
      this.detailDetailSessionService.createDetailSession(datatosend,this.id_session)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveprops();
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
      this.created = true;
      this.articleA=false;
      this.etabA=false;
        },
        error: (e) => console.error(e)
      });

  }
  

}
