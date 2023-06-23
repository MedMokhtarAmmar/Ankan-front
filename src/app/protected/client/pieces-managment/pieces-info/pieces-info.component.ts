import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLinkActive} from "@angular/router";
import {PieceService} from "../../../../core/services/piece.service";
import {Piece} from "../../../../core/models/Piece";
import {ProjectService} from "../../../../core/services/project.service";
import {Project} from "../../../../core/models/Project";
import {CategorieService} from "../../../../core/services/categorie.service";
import {Categorie} from "../../../../core/models/Categorie";
import {DocumentService} from "../../../../core/services/document.service";
import {AjoutDocumentComponent} from "../../afficher-details-projet/ajout-document/ajout-document.component";
import {MatDialog} from "@angular/material/dialog";
import {Storage} from 'aws-amplify';
import * as conf from '../../../../../config/config.json'
import {DocumentInfoComponent} from "../document-info/document-info.component";
import {FileS3} from "../../../../core/models/FileS3";
import {Document} from "../../../../core/models/Document";
import {serializeTranslationMessage} from "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/serialize_translation_message";
import Auth from "@aws-amplify/auth";
import {TokenStorageService} from "../../../../core/services/authentification/token-storage.service";


@Component({
  selector: 'app-pieces-info',
  templateUrl: './pieces-info.component.html',
  styleUrls: ['./pieces-info.component.scss']
})
export class PiecesInfoComponent implements OnInit {
  idPiece: string;
  idProject: string;
  idCategorie: string;
  piece: Piece;
  project: Project;
  categorie: Categorie;
  documents: Document[];
  selectedPiece: Piece;
  type: string = 'piece';
  selecteddocument: Document;

  documentsPath: string[] = [];
  listfile: FileS3[];
  fileURL: any[];
  file: FileS3;
  model: any;

  constructor(private  route: ActivatedRoute,
              private pieceService: PieceService,
              private  projectService: ProjectService,
              private categorieService: CategorieService,
              private  documentService: DocumentService,
              public dialog: MatDialog,
              private localStorage: TokenStorageService) {
    this.idPiece = route.snapshot.params.id;
    this.documents = [];
    this.fileURL = [];
    this.listfile = []

  }

  ngOnInit(): void {
    console.log(this.idPiece);
    this.global();
  }


  global() {
    this.getDetailsPieces().then(() => {
      this.getProjectPiece(this.idProject);
      this.getCategorie(this.idCategorie);
      this.getDocumentofPiece2(this.idPiece);

    }).then(() => {

      this.getModel(this.piece.modelPiece);
      console.log(this.fileURL);

    })
  }

  getDetailsPieces() {
    return new Promise<any>((resolve, reject) => {

      this.pieceService.getPiece(this.idPiece).subscribe((data: any) => {
        this.piece = data.result;
        this.idCategorie = this.piece.categorieID;
        this.idProject = this.piece.projetID;
        console.log(this.piece.modelPiece);

        resolve(this.piece);
      })
      return this.piece;
    })

  }

  getProjectPiece(id: string) {
    this.projectService.getProjectById(id).then((data: any) => {
      this.project = data.result


    })
  }

  getCategorie(id: string) {
    this.categorieService.getCategorie(id).subscribe((data: any) => {
      this.categorie = data.result
    })
  }


  // getDocumentOfPiece(id: string) {
  //   this.documentService.getDocumentByPieceID(id).then((data: any) => {
  //     this.documents = data.result
  //     for (let i = 0; i < this.documents.length; i++) {
  //       this.documentsPath[i] = data.result[i].documentPath;
  //       for (let i = 0; i < this.documentsPath.length; i++) {
  //         console.log(this.documentsPath[i]);
  //
  //         Storage.get(this.documentsPath[i],
  //           {
  //             level: 'protected'
  //           }).then((data) => {
  //           this.fileURL[i] = data;
  //           console.log(this.fileURL[i]);
  //
  //         }).catch(e => {
  //           console.log(e, 'error fetching image')
  //         })
  //       }
  //     }
  //   })
  // }

  getDocumentofPiece2(id: string) {


    this.documentService.getDocumentByPieceID(id).then((data: any) => {
      this.documents = data.result
      console.log(this.documents)

      for (let i = 0; i < this.documents.length; i++) {
        Storage.get(this.localStorage.getUsername() + '/' + this.documents[i].documentPath,
          {
            level: 'public'
          }).then((data) => {
          this.fileURL[i] = [new FileS3(data, this.documents[i].documentTitle, this.documents[i].extension)];
          console.log(this.fileURL);
        }).catch(e => {
          console.log(e, 'error fetching image')
        });

      }
      console.log(this.fileURL);
    })

  }

  getModel(modelPath: string) {

    Storage.get(modelPath,
      {
        level: 'public'
      }).then((data) => {
      this.model=data

    }).catch(e => {
      console.log(e, 'error fetching image')
    });

  }

  openDialogAjoutDocument(piece: Piece) {
    this.selectedPiece = piece;

    const dialogRef = this.dialog.open(AjoutDocumentComponent, {
      width: '800px',
      height: '800px',

      data: {piece: this.selectedPiece}

    }).afterClosed().subscribe(res => {

      this.global();
    });

  }


  openDialogDetailsDocument(document: Document) {
    this.selecteddocument = document;

    const dialogRef = this.dialog.open(DocumentInfoComponent, {
      width: '800px',
      height: '800px',

      data: {document: this.selecteddocument}

    }).afterClosed().subscribe(res => {
      this.initSelectedDocument();
      // this.getDocumentOfPiece(this.idPiece);
    });

  }

  initSelectedDocument() {
    this.selecteddocument = new Document();
  }


}
