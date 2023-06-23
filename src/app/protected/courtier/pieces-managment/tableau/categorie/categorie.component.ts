import {Component, Input, OnInit} from '@angular/core';

import {Categorie} from "../../../../../core/models/Categorie";

import {CategorieService} from "../../../../../core/services/categorie.service";

@Component({
  selector: 'app-categorie-tableau',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  @Input() categorieID: any;
  public categorie: Categorie;

  constructor(private categorieService: CategorieService) {
    this.categorie = new Categorie();
  }

  ngOnInit(): void {

    if (this.categorieID !== undefined ) {
      this.getCategorieByID();
    }

  }

  getCategorieByID() {
    this.categorieService.getCategorie(this.categorieID).subscribe((res: any) => {
      this.categorie = res.result;
    })
  }

}
