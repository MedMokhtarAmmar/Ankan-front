import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../core/models/Project";
import {Categorie} from "../../../core/models/Categorie";
import {CategorieService} from "../../../core/services/categorie.service";
import {Piece} from "../../../core/models/Piece";

@Component({
  selector: 'app-categorie-libelle',
  templateUrl: './categorie-libelle.component.html',
  styleUrls: ['./categorie-libelle.component.scss']
})
export class CategorieLibelleComponent implements OnInit {
  @Input() piece: Piece ;

  public categorie: Categorie;
  //public categories: Categorie [];


  constructor(private categorieservice: CategorieService) {

    this.piece = new Piece();
    this.categorie = new Categorie();

  }

  ngOnInit(): void {
    this.getcategorie();
  }


  getcategorie() {
    this.categorieservice.getCategorie(this.piece.categorieID).subscribe((data: any) => {
      this.categorie = data.result;
      console.log(this.categorie.libelle);

    })
  }
}

