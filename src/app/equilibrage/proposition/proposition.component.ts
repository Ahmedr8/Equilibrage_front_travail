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
  styleUrls: ['./proposition.component.css','../equilibrage.component.css']
})
export class PropositionComponent implements OnInit {
  articles: Article[]=[];
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
  selected_articles:any[]=[];
  selected_etabs:any[]=[];
  selected_prio_etabs:any=[];
  etabs: Etablissement[]=[];
  props?:propAffiche[];
  lib:any="S_"+this.datePipe.transform(new Date(), 'yyyy_MM_dd_hh_mm_ss');
  datei?: any =new Date();
  options: string[]=['stock_min','moy_vente'];
  crit:any="stock_min";
  id_session:any;
  tablepending:any;
  tableEtabs:any;
  submitted = false;
  created=false;
  articleA=true;
  etabA=false;
  totalColumns:number=4;
  end_of_data:boolean=false;
  no_previous:boolean=true;
  page_number:number=1;
  constructor(private articleService: ArticleService,private etabService: EtablissementService,private sessionService:SessionService,private datePipe: DatePipe,private detailDetailSessionService: DetailDetailSessionService,private propositionService:PropositionService) { }

  ngOnInit() {
    this.retrieveArticles();
    this.retrieveEtabs();
    
    
  
  }
  retrieveArticles(): void {
    this.articleService.getArticles(this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.articles = data;
        },
        error: (e) => console.error(e)
        ,
       complete : () => {
          this.refreshList_articles()
      }
      });
  }

refreshList_articles(){
  if(this.tablepending){
    $('#datatable1').off('select.dt', this.selectListener);
    $('#datatable1').off('deselect.dt', this.deselectListener);
    this.tablepending.destroy();
  }
  /*this.tablepending= $('#datatable1').DataTable({
    columnDefs: [
      {
        orderable: false,
        className: 'select-checkbox',
        targets: 0 
      },
      
    ],
    select: {
      style: 'os multi',
      selector: 'td:first-child' 
    },
    order: [[1, 'asc']],
    buttons: [
      'selectAll',
      'selectNone'
  ],
  dom: 'Bfrtip'
  });*/
  this.tablepending=$('#datatable1').DataTable({ data : this.articles,
    columns: [
      { data:null, defaultContent: '' },
      { data: 'code_article_dem', title: 'Code DIM' },
      { data: 'code_barre', title: 'Code Barre' },
      { data: 'libelle', title: 'Désignation' },
    ],
    columnDefs: [
      {
        orderable: false,
        className: 'select-checkbox',
        targets: 0 
      },
      
    ],
    select: {
      style: 'os multi',
      selector: 'td:first-child' 
    },
    order: [[1, 'asc']],
    buttons: [
      'selectAll',
      'selectNone'
  ],
  dom: 'Bfrtip',
  paging: false,        
  });
  $(document).ready(() => {
  for(var j=0;j<this.articles.length;j++){
    if (this.selected_articles.find(item => item.code_article_dem === this.articles[j].code_article_dem)){
      this.tablepending.rows(j).select();
    } 
  }
  $('#datatable1').on('select.dt',this.selectListener )
  $('#datatable1').on('deselect.dt', this.deselectListener);
});
}

 selectListener =() => {
  const selectedRows = this.tablepending.rows({ selected: true }).data().toArray();
  selectedRows.forEach((row: { code_article_dem: any; }) => {
    // Check if the row's code_article_dem already exists in selected_articles
    if (!this.selected_articles.some(selected => selected.code_article_dem === row.code_article_dem)) {
      this.selected_articles.push(row); // Push the row to selected_articles if not already present
    }
  });
};

deselectListener =() => {
  const deselectedRows = this.tablepending.rows({ selected: false }).data().toArray();
  deselectedRows.forEach((row: { code_article_dem: any; }) => {
    const index = this.selected_articles.findIndex(selected => selected.code_article_dem === row.code_article_dem);
    if (this.selected_articles.some(selected => selected.code_article_dem === row.code_article_dem)) {
      this.selected_articles.splice(index, 1); // Remove deselected row data from the list
    }
  });
};

  retrieveEtabs(): void {
    this.etabService.getAllEtablissements()
      .subscribe({
        next: (data) => {
          this.etabs = data;
        },
        error: (e) => console.error(e)
        ,
       complete : () => {
          this.refreshList_etabs()
      }
      });
  }

  refreshList_etabs(){
    if(this.tableEtabs){
      const tab1=this.tableEtabs.rows({selected:  true}).data();
      const tab2=this.tableEtabs.rows({selected:  false}).data();
      for (var i=0; i < tab1.length ;i++){
        if (!this.selected_etabs.includes(tab1[i][1])) {
        this.selected_etabs.push(tab1[i][1]);
        this.selected_prio_etabs.push(this.etabs[i].priorite)
        }
      }
      for (var i=0; i < tab2.length ;i++){
        if (this.selected_etabs.indexOf(tab2[i][1])!=-1){
          this.selected_etabs.splice(this.selected_etabs.indexOf(tab2[i][1]), 1);
          this.selected_prio_etabs.splice(this.selected_etabs.indexOf(tab2[i][1]), 1)
        }
      }
      this.tableEtabs.destroy();
    }
    $(document).ready(() => {
    this.tableEtabs= $('#datatable2').DataTable({
      columnDefs: [
        {
          orderable: false,
          className: 'select-checkbox',
          targets: 0
        },
        
      ],
      select: {
        style: 'os multi', 
        selector: 'td:first-child' 
      },
      order: [[1, 'asc']],
      buttons: [
        'selectAll',
        'selectNone'
    ],
    dom: 'Bfrtip'
    }
      );
      for(var j=0;j<this.etabs.length;j++){
        if (this.selected_etabs.find(item => item === this.etabs[j].code_etab)){
          this.tableEtabs.rows(j).select();
        }
      }
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
        ,
       complete : () => {
          this.refreshList_props()
      }
      });
  }

  refreshList_props(){
    if (this.props) {
      $('#datatable3').DataTable().clear().destroy();
    }
    $(document).ready(() => {
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
  });
  }
  next_page():void{
    if(this.articles.length>=10){
    this.end_of_data=false
    this.page_number=this.page_number+1
    this.no_previous=false;
    this.Filtrer();
    if (this.articles.length=0)
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
      },
      error: (e) => console.error(e)
      ,
       complete : () => {
          this.refreshList_articles()
      }
    });
  }
  Filtrer_click(): void{
    this.page_number=1
    this.end_of_data=false;
    this.no_previous=true;
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
      },
      error: (e) => console.error(e)
      , complete: ()=> {
        this.refreshList_articles()
      }
    });
  }
  Filtrer2(): void{
    const data = {
      code_etab: this.ce,
      adresse1: this.adr,
      type: this.type,
      
    };
    this.etabService.getEtabssMultipleParams(data,'1000')
    .subscribe({
      next: (data) => {
        this.etabs = data;
        console.log(this.etabs);
        
      },
      error: (e) => console.error(e)
      ,
       complete : () => {
          this.refreshList_etabs()
      }
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
    this.refreshList_articles();
    this.refreshList_etabs();
    const id_etabs=this.selected_etabs; 
    const prio_etabs=this.selected_prio_etabs;    
    const critere=this.crit  
      const id_articles=this.selected_articles;       
      const datatosend={
        articles:id_articles,
        etabs: id_etabs,
        prios : prio_etabs,
        critere: critere,
      }
      this.detailDetailSessionService.createDetailSession(datatosend,this.id_session)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
        ,
       complete : () => {
        this.retrieveprops();
        this.created = true;
        this.articleA=false;
        this.etabA=false;
      }
      });

  }
 
  onInputChange(etab:Etablissement):void{
    const i = this.etabs.findIndex(item => item.code_etab === etab.code_etab);
    this.etabs[i].priorite=etab.priorite
    
  }

   Deselect_article(article:Article){
    $(document).ready(() => {
      for(var j=0;j<this.articles.length;j++){
        if (this.articles[j].code_article_dem==article.code_article_dem){
          this.tablepending.rows(j).deselect();
        }
      }
    });
    this.selected_articles.splice(this.selected_articles.indexOf(article),1)
  }

}
