import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ListPieceService} from "../../../core/services/list-piece.service";
import {ListPiece} from "../../../core/models/listPiece";
import {AjoutCategorieComponent} from "../../categorie-piece-management/ajout-categorie/ajout-categorie.component";
import {AjoutListeDesPiecesComponent} from "../ajout-liste-des-pieces/ajout-liste-des-pieces.component";
import {Partenaire} from "../../../core/models/Partenaire";
import {ModifierPartnerComponent} from "../../partners-management/modifier-partner/modifier-partner.component";
import {ModifierListPieceComponent} from "../../../protected/courtier/list-piece-management/modifier-list-piece/modifier-list-piece.component";
import {ModifierListComponent} from "../modifier-list/modifier-list.component";

@Component({
  selector: 'app-list-of-pieces',
  templateUrl: './list-of-pieces.component.html',
  styleUrls: ['./list-of-pieces.component.scss']
})
export class ListOfPiecesComponent implements OnInit {
  listes: ListPiece[];
  public page = 1;
  public perPage = 5;
  public suivant: boolean;
  selectedList: ListPiece;

  constructor(public dialog: MatDialog, private listPieceService: ListPieceService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllListes(this.page, this.perPage)

  }

  getAllListes(page: number, perPage: number) {
    this.listPieceService.getListes(page, perPage).subscribe((data: any) => {
        this.listes = data
        console.log(data)
      }
    )
  }


  openDialogModifierList(ListPiece: ListPiece) {
    this.selectedList = ListPiece;

    const dialogRef = this.dialog.open(ModifierListComponent, {
      width: '800px',

      data: {list: this.selectedList}

    }).afterClosed().subscribe(res => {
      this.initSelectedList();
      this.getAllListes(this.page, this.perPage);
    });

  }


  nextPage() {
    if (this.suivant) {
      this.page = this.page + 1;
      this.getAllListes(this.page, this.perPage);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllListes(this.page, this.perPage);
    } else {
    }
  }


  firstPage() {
    this.getAllListes(1, this.perPage);
    if (this.listes.length === this.perPage) {
      this.suivant = true;
    } else {
      this.suivant = false;
    }
    this.page = 1;
  }

  optionOne() {
    this.perPage = 5;
    this.page = 1;
    this.getAllListes(this.page, 5);

  }

  optionTwo() {
    this.perPage = 10;
    this.page = 1;
    this.getAllListes(this.page, 10);

  }

  optionThree() {
    this.perPage = 20;
    this.page = 1;
    this.getAllListes(this.page, 20);

  }

  supprimerListe(liste: ListPiece) {
    this.listPieceService.deleteListPiece(liste.id).subscribe(() => {
      this.toastrService.warning("list of pieces deleted successfully")
      this.getAllListes(this.page, this.perPage);
    })

  }

  showListe(liste: ListPiece) {

  }

  openDialogAjoutListe() {
    const dialogRef = this.dialog.open(AjoutListeDesPiecesComponent, {
      width: '750px',
      data: {}
    }).afterClosed().subscribe((res: any) => {
      this.getAllListes(this.page, this.perPage);
    });
  }


  private initSelectedList() {
    this.selectedList = new ListPiece();

  }
}
