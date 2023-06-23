import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Piece} from "../../../../core/models/Piece";
import {Categorie} from "../../../../core/models/Categorie";
import {Project} from "../../../../core/models/Project";
import {UserService} from "../../../../core/services/user.service";
import {CategorieService} from "../../../../core/services/categorie.service";
import {ProjectService} from "../../../../core/services/project.service";
import {ToastrService} from "ngx-toastr";
import {PieceService} from "../../../../core/services/piece.service";
import Auth from "@aws-amplify/auth";
import {User} from "../../../../core/models/User";

@Component({
  selector: 'app-update-piece',
  templateUrl: './update-piece.component.html',
  styleUrls: ['./update-piece.component.scss']
})
export class UpdatePieceComponent implements OnInit {

  public categories: Categorie[];
  public selectedCategorie: any;
  public projets: Project[];
  public selectedProjet: any;
  public piece: Piece;

  public user: User;
  public courtierID: string;

  constructor(
    public dialogRef: MatDialogRef<UpdatePieceComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService, private categorieService: CategorieService  , private projetService: ProjectService  ,
    private toastrService: ToastrService , private pieceService: PieceService
  ) {
    this.categories = [];
    this.projets = [];
    this.piece = new Piece();
    this.user = new User();
  }

  ngOnInit(): void {
    this.piece = this.data.piece;
    this.initialiseUser().then(() => {
      this.getProjets(this.courtierID);
    })
    this.getCategories();
  }

  getCategories() {
    this.categorieService.getCategories(1 , 25).subscribe((data: any) => {
      this.categories = data;
    });
  }

  getProjets(courtierID: string) {
    this.projetService.getProjectsbyCourtierID(courtierID).then((data: any) => {
      this.projets = data;
      console.log(this.projets);
    });
  }

  selectProjet(projetID: any) {
    this.selectedProjet = projetID;
  }

  selectCategorie(categorieId: any) {
    this.selectedCategorie = categorieId;
  }

  initialiseUser() {
    return new Promise<any>((resolve, reject) => {
      let email=localStorage.getItem('emailUser')
        this.userService.loadUserByEmail(email).then((data: any) => {
          this.user = data;
          this.courtierID = data.result[0].id;
          console.log(data.result[0].id)
          resolve(this.user);
        });
        return this.courtierID;

    })
  }

  updatePiece() {
      if (this.piece.description === undefined  || this.piece.pieceName=== undefined || this.piece.categorieID=== undefined || this.piece.projetID=== undefined ){

      }else {
        this.pieceService.modifierPiece(this.piece.id , this.piece).subscribe((res:any) => {
          this.toastrService.success("piece modifié avec succes");
          this.dialogRef.close();
        }, error => {
          this.toastrService.error("une erreur est servenue lors de la modification de cette piece");
          this.dialogRef.close();
        })
      }
  }
}
