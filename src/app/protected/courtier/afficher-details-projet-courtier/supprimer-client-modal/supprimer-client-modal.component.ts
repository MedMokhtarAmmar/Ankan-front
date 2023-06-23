import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../core/models/User";
import {Project} from "../../../../core/models/Project";
import {ProjectService} from "../../../../core/services/project.service";
import {PieceService} from "../../../../core/services/piece.service";
import {Piece} from "../../../../core/models/Piece";

@Component({
  selector: 'app-supprimer-client-modal',
  templateUrl: './supprimer-client-modal.component.html',
  styleUrls: ['./supprimer-client-modal.component.scss']
})
export class SupprimerClientModalComponent implements OnInit {
  client: User;
  projectUpdated: Project;
  project: Project;
  mail: string;
  existant: boolean;
  pieces: Piece[];

  constructor(public dialogRef: MatDialogRef<SupprimerClientModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private projectService: ProjectService, private pieceService: PieceService) {
    this.client = data.client;
    this.project = data.project;
    this.mail = data.mail;
    this.existant = data.existant;
    this.projectUpdated = new Project();
    this.pieces = [];
  }

  ngOnInit(): void {
    console.log(this.client);
    console.log(this.project);
    console.log(this.mail);
    console.log(this.existant);

  }


  async supprimerClient(client: User) {
    if (this.existant == true) {
      console.log(client.email);
      this.projectUpdated.projectName = this.project.projectName;
      this.projectUpdated.status = this.project.status;
      this.projectUpdated.lastConsultationDay = this.project.lastConsultationDay;
      this.projectUpdated.courtierID = this.project.courtierID;
      this.projectUpdated.clientID = this.project.clientID.filter(obj => obj !== client.id);
      this.projectUpdated.clientEmail = this.project.clientEmail.filter(obj => obj !== client.email);
      await this.projectService.modifierProject(this.project.id, this.projectUpdated).then(() => {

      }).then(() => this.supprimerPieceClient()).finally(() => this.closeModal()
      )
    } else {
      this.projectUpdated.projectName = this.project.projectName;
      this.projectUpdated.status = this.project.status;
      this.projectUpdated.lastConsultationDay = this.project.lastConsultationDay;
      this.projectUpdated.courtierID = this.project.courtierID;
      this.projectUpdated.clientID = this.project.clientID;
      this.projectUpdated.clientEmail = this.project.clientEmail.filter(obj => obj !== this.mail);
      await this.projectService.modifierProject(this.project.id, this.projectUpdated).then(() => {
      }).then(() => this.supprimerPieceClient()
      ).finally(() => this.closeModal()
      )
    }
  }

  getPieceClient() {

    return new Promise<any>((resolve, reject) => {
      if (this.existant == true) {
        this.pieceService.getPiecesbyClientMailProjectID(this.client.email, this.project.id).subscribe((data: any) => {
          this.pieces = data.result;
          resolve(this.pieces)
        });
      } else {
        this.pieceService.getPiecesbyClientMailProjectID(this.mail, this.project.id).subscribe((data: any) => {
          this.pieces = data.result;
          resolve(this.pieces)
        });
      }

      return this.pieces
    })

  }

  async supprimerPieceClient() {

    this.getPieceClient().then((data: any) => {
      for (let i = 0; i < this.pieces.length; i++) {
        this.pieceService.deletePiece(this.pieces[i].id).subscribe(() => {
          console.log("pieces deleted")
        })

      }
    })
  }

  closeModal() {
    this.dialogRef.close()
  }
}
