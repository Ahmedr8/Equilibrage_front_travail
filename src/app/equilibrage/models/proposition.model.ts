export class Proposition{
    code_prop!:number;
    code_detaille_emet!:number;
    code_detaille_recep!:number;
    qe_trf!:number;
    statut!:string|null;
    etat!:string|null;
}

export class propAffiche{
    
        ordre_trf!: string;
        code_article_gen!: string;
        code_article_dem!: string;
        code_barre!: string;    
        code_depot_emet!:string; 
        lib_taille!: string;
        lib_couleur!: string;
        emet!: string;
        recep!: string;
        qte_trf!: number;
        code_session!: number;
        date!: Date;
        nom!: string;
        statut!: string;
    
}