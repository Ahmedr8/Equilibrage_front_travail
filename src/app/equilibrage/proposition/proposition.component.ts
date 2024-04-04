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
  articles_gen: Article[]=[];
  cag:any='';
  cag_filter:any='';
  cad:any='';
  cb:any='';
  cf:any='';
  m:any='';
  c:any='';
  sc:any='';
  cb_filter:any='';
  cf_filter:any='';
  m_filter:any='';
  c_filter:any='';
  sc_filter:any='';
  desig_filter:any='';
  filter_clicked:boolean=false;
  filter_clicked2:boolean=false;
  ce:any='';
  type:any='';
  adr:any='';
  ce_filter:any='';
  type_filter:any='';
  adr_filter:any='';
  desig:any='';
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
  articleGenList:any;
  submitted = false;
  created=false;
  articleA=true;
  etabA=false;
  totalColumns:number=4;
  end_of_data:boolean=false;
  no_previous:boolean=true;
  page_number:number=1;
  stock_min_value: number = 0;
  select_style:string="";
  button_all:any=[
    'selectAll',
    'selectNone'
]
  constructor(private articleService: ArticleService,private etabService: EtablissementService,private sessionService:SessionService,private datePipe: DatePipe,private detailDetailSessionService: DetailDetailSessionService,private propositionService:PropositionService) { }
ngOnInit() {
  this.retrieveArticles();
  this.retrieveEtabs();
  this.retrieveArticlesGen();
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
        console.log(this.articles)
          this.refreshList_articles()
      }
      });
}
retrieveArticlesGen(): void {
    this.articleService.getArticlesGen(this.page_number.toString())
      .subscribe({
        next: (data) => {
          this.articles_gen = data;
        },
        error: (e) => console.error(e)
        ,
       complete : () => {
          console.log(this.articles_gen)
          this.refreshList_articles_gen()
      }
      });
}

refreshList_articles_gen(){
    if(this.articleGenList){
      $('#datatable4').off('select.dt', this.selectListener);
      $('#datatable4').off('deselect.dt', this.deselectListener);
      this.articleGenList.destroy();
    }
    this.articleGenList=$('#datatable4').DataTable({ data : this.articles_gen,
      columns: [
        { data:null, defaultContent: '' },
        { data: 'code_article_gen', title: 'Code Gen' },
        { data: 'libelle', title: 'Désignation' },
        { data: 'fam1', title: 'Model' },
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
      console.log(this.articleGenList)
    for(var j=0;j<this.articles_gen.length;j++){
      if (this.selected_articles.find(item => item.code_article_gen === this.articles[j].code_article_gen)){
        this.tablepending.rows(j).select();
      } 
    }
    $('#datatable4').on('select.dt',this.selectListener )
    $('#datatable4').on('deselect.dt', this.deselectListener);
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
    console.log(this.tablepending)
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
  if(this.crit=="articles_dem"){
    console.log('select')
    const selectedRows = this.articleGenList.rows({ selected: true }).data().toArray();
  selectedRows.forEach((row: { code_article_gen: any; }) => {
    // Check if the row's code_article_dem already exists in selected_articles
    if (!this.selected_articles.some(selected => selected.code_article_gen === row.code_article_gen)) {
      this.selected_articles.push(row); // Push the row to selected_articles if not already present
    }
  });
  }
  else{
  const selectedRows = this.tablepending.rows({ selected: true }).data().toArray();
  selectedRows.forEach((row: { code_article_dem: any; }) => {
    // Check if the row's code_article_dem already exists in selected_articles
    if (!this.selected_articles.some(selected => selected.code_article_dem === row.code_article_dem)) {
      this.selected_articles.push(row); // Push the row to selected_articles if not already present
    }
  });
}
};

deselectListener =() => {
  if(this.crit=="articles_dem"){
    console.log("deslect")
    const deselectedRows = this.articleGenList.rows({ selected: false }).data().toArray();
    deselectedRows.forEach((row: { code_article_gen: any; }) => {
      const index = this.selected_articles.findIndex(selected => selected.code_article_gen === row.code_article_gen);
      if (this.selected_articles.some(selected => selected.code_article_gen === row.code_article_gen)) {
        this.selected_articles.splice(index, 1); // Remove deselected row data from the list
      }
    });
  }else{
  const deselectedRows = this.tablepending.rows({ selected: false }).data().toArray();
  deselectedRows.forEach((row: { code_article_dem: any; }) => {
    const index = this.selected_articles.findIndex(selected => selected.code_article_dem === row.code_article_dem);
    if (this.selected_articles.some(selected => selected.code_article_dem === row.code_article_dem)) {
      this.selected_articles.splice(index, 1); // Remove deselected row data from the list
    }
  });
}
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
    if (this.crit=="seul_emet"){ this.select_style="single"
    this.button_all=[]
  }
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
        style: this.select_style, 
        selector: 'td:first-child' 
      },
      order: [[1, 'asc']],
      buttons: this.button_all,
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
          {
            extend: 'excelHtml5',
            text: 'Export to Excel',
            className: 'btn btn-success',
            customize: this.customizeExcelExport
          },
          'colvis',
          {
            extend: 'print',
            text: 'Print',
            customize: function(win:any) {
                // Fit content to page
                $(win.document.body).css('zoom', '90%');
            }
        }
          
          
      ],
      dom: 'Bfrtip',
      createdRow: (row: any, data: any, dataIndex: any) => {
        if (data[7] == "SIEGE") {
          $(row).addClass('bg-danger text-white');
        }
      }
      }
    );
  });
  }

  customizeExcelExport(xlsx: any): void {
    const sheet = xlsx.xl.worksheets['sheet1.xml'];
  
    sheet.querySelectorAll('row').forEach((row: any) => {
      let cell = row.querySelector('c[r^="H"] is t');
  
      if (cell && cell.textContent === 'SIEGE') {
        Array.from(row.children).forEach((cell: any) => {
          cell.setAttribute('s', '10');
        });
      }
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
  next_page_articles_gen():void{
    if(this.articles_gen.length>10){
    this.end_of_data=false
    this.page_number=this.page_number+1
    this.no_previous=false;
    this.Filtrer_articles_gen();
    if (this.articles_gen.length=0)
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
  previous_page_articles_gen():void{
    if(this.page_number>1){
    this.page_number=this.page_number-1
    this.end_of_data=false
    this.Filtrer_articles_gen();
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
          if ((this.cag!='')|| (this.cb!='')||(this.cf!='')||(this.m!='')|| (this.c!='')||(this.sc!='')){
            this.filter_clicked=true
            this.sc_filter=this.sc
            this.m_filter=this.m
            this.c_filter=this.c
            this.cb_filter=this.cb
            this.cag_filter=this.cag
            this.cf_filter=this.cf
          }else
          {this.filter_clicked=false}
      }
    });
  }
  Filtrer_articles_gen(): void{
    const data = {
      code_article_gen: this.cag,
      code_fournisseur: this.cf,
      fam1: this.m,
      libelle:this.desig
    };
    this.articleService.getArticlesGenMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.articles_gen = data;
        console.log(this.articles);
      },
      error: (e) => console.error(e)
      ,
       complete : () => {
          this.refreshList_articles_gen()
          if ((this.cag!='')|| (this.desig!='')||(this.cf!='')||(this.m!='')){
            this.filter_clicked=true
            this.m_filter=this.m
            this.desig_filter=this.desig
            this.cag_filter=this.cag
            this.cf_filter=this.cf
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
        if ((this.cag!='')|| (this.cb!='')||(this.cf!='')||(this.m!='')|| (this.c!='')||(this.sc!='')){
          this.filter_clicked=true
          this.sc_filter=this.sc
          this.m_filter=this.m
          this.c_filter=this.c
          this.cb_filter=this.cb
          this.cag_filter=this.cag
          this.cf_filter=this.cf
        }else
        {this.filter_clicked=false}
      }
    });
  }
  Filtrer_click_articles_gen(): void{
    this.page_number=1
    this.end_of_data=false;
    this.no_previous=true;
    const data = {
      code_barre: this.cb,
      code_article_gen: this.cag,
      code_fournisseur: this.cf,
      fam1: this.m,
      libelle: this.desig
    };
    this.articleService.getArticlesGenMultipleParams(data,this.page_number.toString())
    .subscribe({
      next: (data) => {
        this.articles_gen = data;
        console.log(this.articles);
      },
      error: (e) => console.error(e)
      , complete: ()=> {
        this.refreshList_articles_gen()
        if ((this.cag!='')|| (this.desig!='')||(this.cf!='')||(this.m!='')){
          this.filter_clicked=true
          this.m_filter=this.m
          this.desig_filter=this.desig
          this.cag_filter=this.cag
          this.cf_filter=this.cf
        }else
        {this.filter_clicked=false}
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
          if ((this.ce!='')|| (this.adr!='')||(this.type!='')){
            this.filter_clicked2=true
            this.ce_filter=this.ce
            this.adr_filter=this.adr
            this.type_filter=this.type
          }else
          {this.filter_clicked2=false}
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
        ,
        complete: () => {
          this.refreshList_etabs()
        }
      });
  }
  createProp():void{
    var id_articles
    this.refreshList_etabs();
    if(this.crit=="articles_dem"){
      this.refreshList_articles_gen()
       id_articles = this.selected_articles.map(article => article.code_article_gen);  
    }
      else{
        this.refreshList_articles();
         id_articles = this.selected_articles.map(article => article.code_article_dem);  
      }
    const id_etabs=this.selected_etabs; 
    const prio_etabs=this.selected_prio_etabs;    
    const critere=this.crit  
    const aux=localStorage.getItem('stock_min')
    if (aux !=null) {
      this.stock_min_value=+aux
    }
    else
    {this.stock_min_value=1}    
      const datatosend={
        articles:id_articles,
        etabs: id_etabs,
        prios : prio_etabs,
        critere: critere,
        stock_min:this.stock_min_value
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

  Deselect_article_gen(article:Article){
    $(document).ready(() => {
      for(var j=0;j<this.articles_gen.length;j++){
        if (this.articles_gen[j].code_article_gen==article.code_article_gen){
          this.articleGenList.rows(j).deselect();
        }
      }
    });
    this.selected_articles.splice(this.selected_articles.indexOf(article),1)
  }

  del_filter(filter:any){
    if (filter==this.sc){
      this.sc=''
    }else if (filter==this.cf){
      this.cf=''
    }else  if (filter==this.cag){
      this.cag=''
    }
    else if (filter==this.m){
      this.m=''
    }else if (filter==this.c){
      this.c=''
    }else if(filter==this.cb){
      this.cb=''
    }else{
      this.desig=''
    }
    this.Filtrer()
    this.Filtrer_articles_gen()
  }

  del_filter2(filter:any){
    if (filter==this.ce){
      this.ce=''
    }else if (filter==this.type){
      this.type=''
    }else  if (filter==this.adr){
      this.adr=''
    }
    this.Filtrer2()
  }
}
