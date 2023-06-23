import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../core/models/Project";
import {Piece} from "../../../core/models/Piece";
import {PieceService} from "../../../core/services/piece.service";

@Component({
  selector: 'app-piecesnumber',
  templateUrl: './piecesnumber.component.html',
  styleUrls: ['./piecesnumber.component.scss']
})
export class PiecesnumberComponent implements OnInit {
  public pieces: Piece[] ;
  public piece: Piece;
  public piecesnumber : number;

  @Input() project: Project;

  constructor( public pieceservice: PieceService) {
    this.project = new Project();
    this.piece = new Piece();

  }

  ngOnInit(): void {
    this.listPieces();
  }
  listPieces() {
    this.pieceservice.getPiecesbyProjectID(this.project.id).then((data: any) => {
      this.pieces = data.result;
      console.log(this.pieces)
      this.piecesnumber = this.pieces.length;
      console.log(this.pieces.length);


    })
  }


}
