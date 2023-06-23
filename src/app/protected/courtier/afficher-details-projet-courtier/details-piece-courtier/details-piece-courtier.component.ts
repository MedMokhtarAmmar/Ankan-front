import {Component, Inject, OnInit} from '@angular/core';
import {Piece} from "../../../../core/models/Piece";
import {Categorie} from "../../../../core/models/Categorie";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CategorieService} from "../../../../core/services/categorie.service";
import {DocumentService} from "../../../../core/services/document.service";

@Component({
  selector: 'app-details-piece-courtier',
  templateUrl: './details-piece-courtier.component.html',
  styleUrls: ['./details-piece-courtier.component.scss']
})
export class DetailsPieceCourtierComponent implements OnInit {

  piece: Piece
  categorie: Categorie
  id: string = '';
  documents: Document[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private categorieService: CategorieService,
              private  documentService: DocumentService) {
    this.piece = data.piece;
    this.documents = []

  }

  ngOnInit(): void {
    console.log(this.piece)
    this.getCategorie();
    this.getDocumentOfPiece();
  }

  getCategorie() {
    this.id = this.piece.categorieID;
    this.categorieService.getCategorie(this.id).subscribe((data: any) => {
      this.categorie = data.result
      console.log(this.categorie)
    })
  }

  getDocumentOfPiece() {
    this.documentService.getDocumentByPieceID(this.piece.id).then((data: any) => {
      this.documents = data.result
    })
  }
}
