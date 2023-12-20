import { Article } from "src/app/BaseData/models/Article.model";
import { Etablissement } from "src/app/BaseData/models/Etablissement.model";

export class DetailSession{
    id_detaille!:number;
    code_session!:number;
    code_article_dem!:string;
    code_etab!:string;
    stock_physique!:number|null;
    stock_min!:number|null;
}

export class DataToSend{
    articles!:Article[];
    etabs!: Etablissement[]
}