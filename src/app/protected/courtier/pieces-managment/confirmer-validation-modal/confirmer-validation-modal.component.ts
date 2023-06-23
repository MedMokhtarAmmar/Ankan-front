import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Piece} from "../../../../core/models/Piece";
import {PieceService} from "../../../../core/services/piece.service";
import {ToastrService} from "ngx-toastr";
import {Document} from "../../../../core/models/Document";

@Component({
  selector: 'app-confirmer-validation-modal',
  templateUrl: './confirmer-validation-modal.component.html',
  styleUrls: ['./confirmer-validation-modal.component.scss']
})
export class ConfirmerValidationModalComponent implements OnInit {
  piece: Piece;
  newPiece: Piece;
  documents: Document[];

  constructor(public dialogRef: MatDialogRef<ConfirmerValidationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private pieceService: PieceService,
              private toastrService: ToastrService) {
    this.newPiece = new Piece();
    this.piece = this.data.piece;
    this.documents=this.data.documents
  }

  ngOnInit(): void {
    console.log(this.documents)

  }

  ValiderPiece() {
    this.newPiece.pieceName = this.piece.pieceName;
    this.newPiece.projetID = this.piece.projetID;
    this.newPiece.categorieID = this.piece.categorieID;
    this.newPiece.description = this.piece.description;
    this.newPiece.uploaderID = this.piece.uploaderID;
    this.newPiece.modelPiece = this.piece.modelPiece;
    this.newPiece.clientID=this.piece.clientID;
    this.newPiece.createdAt=this.piece.createdAt;
    this.newPiece.pieceStatus = "VERIFIED";



    this.pieceService.modifierPiece(this.piece.id, this.newPiece).subscribe((data) => {
      console.log(data)
      this.toastrService.info(this.piece.pieceName + " à été valider !")
      this.closeModal()
    })
  }
  closeModal() {
    this.dialogRef.close()
  }

}
