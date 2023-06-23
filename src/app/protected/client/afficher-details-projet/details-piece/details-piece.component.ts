import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Piece} from "../../../../core/models/Piece";
import {Categorie} from "../../../../core/models/Categorie";
import {CategorieService} from "../../../../core/services/categorie.service";
import {DocumentService} from "../../../../core/services/document.service";
import {Storage} from "aws-amplify";
import {FileS3} from "../../../../core/models/FileS3";
import {UserService} from "../../../../core/services/user.service";
import {Document} from "../../../../core/models/Document";

@Component({
  selector: 'app-details-piece',
  templateUrl: './details-piece.component.html',
  styleUrls: ['./details-piece.component.scss']
})
export class DetailsPieceComponent implements OnInit {
  piece: Piece
  categorie: Categorie
  id: string;
  documents: Document[];
  username: string;
  fileURL: any[];
  model: String | Object;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categorieService: CategorieService, private  documentService: DocumentService,
              private userService :UserService) {
    this.piece = data.piece;
    this.documents = [];
    this.fileURL = [];


  }

  ngOnInit(): void {
    this.getModel(this.piece.modelPiece)

    console.log(this.piece)
    this.getCategorie();
    this.getClient(localStorage.getItem('id')).then(()=>{
      this. getDocumentOfPiece();

    })
  }

  getCategorie() {
    this.id = this.piece.categorieID;
    this.categorieService.getCategorie(this.id).subscribe((data: any) => {
      this.categorie = data.result;

      console.log(this.categorie)
    })
  }

  getDocumentOfPiece() {
    this.documentService.getDocumentByPieceID(this.piece.id).then((data: any) => {
      this.documents = data.result;
      for (let i = 0; i < this.documents.length; i++) {
        console.log(this.username + '/' + this.documents[i].documentPath)
        Storage.get(this.username + '/' + this.documents[i].documentPath,
          {
            level: 'public'
          }).then((data) => {
          this.fileURL[i] = [new FileS3(data, this.documents[i].documentTitle, this.documents[i].extension)];
        }).catch(e => {
          console.log(e, 'error fetching image')
        })

      }
    })
  }
  getClient(id: string) {
    return new Promise<any>((resolve, reject) => {

      this.userService.getUser(id).then((data: any) => {
        this.username = data.result.username;
        resolve(this.username)
      });
      return this.username
    })
  }

  getModel(modelPath: string) {

    Storage.get(modelPath,
      {
        level: 'public'
      }).then((data) => {
      this.model = data

    }).catch(e => {
      console.log(e, 'error fetching image')
    });

  }

}
