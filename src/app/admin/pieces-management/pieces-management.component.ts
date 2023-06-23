import { Component, OnInit } from '@angular/core';
import {Piece} from "../../core/models/Piece";
import {ActivatedRoute, Router} from "@angular/router";
import {PieceService} from "../../core/services/piece.service";

@Component({
  selector: 'app-pieces-management',
  templateUrl: './pieces-management.component.html',
  styleUrls: ['./pieces-management.component.scss']
})
export class PiecesManagementComponent implements OnInit {
  public pieces : Piece[];
  public piece : Piece;

  constructor(private pieceservice: PieceService ,private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getpieces();
  }

  getpieces() {
    this.pieceservice.getPiecesbyProjectID(this.router.snapshot.params.id).then((data: any) => {
      this.pieces = data.result;
      console.log(this.pieces)
    })
  }



}
