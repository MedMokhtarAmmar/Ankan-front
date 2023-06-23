import { Component, OnInit } from '@angular/core';
import {ListPiece} from "../../../core/models/listPiece";
import {MatDialog} from "@angular/material/dialog";
import {ListPieceService} from "../../../core/services/list-piece.service";
import {ToastrService} from "ngx-toastr";
import {AjoutListeDesPiecesComponent} from "../../../admin/models-management/ajout-liste-des-pieces/ajout-liste-des-pieces.component";

@Component({
  selector: 'app-list-piece-management',
  templateUrl: './list-piece-management.component.html',
  styleUrls: ['./list-piece-management.component.scss']
})
export class ListPieceManagementComponent implements OnInit {

  listes: ListPiece[];
  public page = 1;
  public perPage = 20;
  public suivant: boolean;
  constructor(public dialog: MatDialog, private listPieceService: ListPieceService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllListes(this.page,this.perPage)
  }
  getAllListes(page: number, perPage: number) {
    this.listPieceService.getListes(page, perPage).subscribe((data: any) => {
        this.listes = data
        console.log(data)
      }
    )
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

  editPiece(piece: ListPiece) {

  }

  deletePiece(liste: ListPiece) {
    this.listPieceService.deleteListPiece(liste.id).subscribe(()=>{
      this.toastrService.warning("list of pieces deleted successfully")
      this.getAllListes(this.page, this.perPage);    })
  }
}
