import {Component, Inject, OnInit} from '@angular/core';

import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PieceService} from "../../../core/services/piece.service";
import {Piece} from "../../../core/models/Piece";
import {Project} from "../../../core/models/Project";

@Component({
  selector: 'app-required-pieces',
  templateUrl: './required-pieces.component.html',
  styleUrls: ['./required-pieces.component.scss']
})
export class RequiredPiecesComponent implements OnInit {
  public pieces : Piece[];
  public piece : Piece;
  public project : Project;

  constructor(
    private pieceservice: PieceService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RequiredPiecesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.project= new Project();
    this.piece = new Piece();
    this.project = data.project;
  }

  ngOnInit(): void {
    this.getpieces();
    console.log(this.data.project);
  }
  getpieces() {
    this.pieceservice.getPiecesbyProjectID(this.data.project.id).then((data: any) => {
      this.pieces = data.result;
      console.log(this.pieces)
    })
  }

}
