import {Component, OnInit} from '@angular/core';
import {CategorieService} from "../../core/services/categorie.service";
import {Categorie} from "../../core/models/Categorie";
import {AjoutUtilisateurComponent} from "../users-management/ajout-utilisateur/ajout-utilisateur.component";
import {MatDialog} from "@angular/material/dialog";
import {AjoutCategorieComponent} from "./ajout-categorie/ajout-categorie.component";
import {ToastrService} from "ngx-toastr";
import {User} from "../../core/models/User";
import {ModifierUtilisateurComponent} from "../users-management/modifier-utilisateur/modifier-utilisateur.component";
import {ModifierCategorieComponent} from "./modifier-categorie/modifier-categorie.component";

@Component({
  selector: 'app-categorie-piece-management',
  templateUrl: './categorie-piece-management.component.html',
  styleUrls: ['./categorie-piece-management.component.scss']
})
export class CategoriePieceManagementComponent implements OnInit {
  categories: Categorie[];
  public page = 1;
  public perPage = 5;
  public suivant: boolean;
  public selectedCategorie: Categorie;

  constructor(private categorieService: CategorieService, public dialog: MatDialog, private toastrService: ToastrService) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.getAllCategorie(this.page, this.perPage)
  }

  getAllCategorie(page: number, perPage: number) {
    this.categorieService.getCategories(page, perPage).subscribe((data: any) => {
        this.categories = data
        console.log(data)
      }
    )
  }

  nextPage() {
    if (this.suivant) {
      this.page = this.page + 1;
      this.getAllCategorie(this.page, this.perPage);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllCategorie(this.page, this.perPage);
    } else {
    }
  }


  firstPage() {
    this.getAllCategorie(1, this.perPage);
    if (this.categories.length === this.perPage) {
      this.suivant = true;
    } else {
      this.suivant = false;
    }
    this.page = 1;
  }

  optionOne() {
    this.perPage = 5;
    this.page = 1;
    this.getAllCategorie(this.page, 5);

  }

  optionTwo() {
    this.perPage = 10;
    this.page = 1;
    this.getAllCategorie(this.page, 10);

  }

  optionThree() {
    this.perPage = 20;
    this.page = 1;
    this.getAllCategorie(this.page, 20);

  }


  openDialogAjoutCategorie() {
    const dialogRef = this.dialog.open(AjoutCategorieComponent, {
      width: '750px',
      data: {}
    }).afterClosed().subscribe((res: any) => {
      this.getAllCategorie(this.page, this.perPage);
    });
  }

  supprimerCategorie(categorie: Categorie) {
    this.categorieService.deleteCategorie(categorie).subscribe(() => {
      this.getAllCategorie(this.page, this.perPage)
      this.toastrService.info("catégorie supprimée avec success ")
    })
  }

  openDialogModifierCategorie(categorie: Categorie) {
    this.selectedCategorie = categorie;

    const dialogRef = this.dialog.open(ModifierCategorieComponent, {
      width: '800px',

      data: {categorie: this.selectedCategorie}

    }).afterClosed().subscribe(res => {
      this.initSelectedCategorie();
      this.getAllCategorie(this.page, this.perPage);
    });

  }
  initSelectedCategorie() {
    this.selectedCategorie = new Categorie();
  }
}
