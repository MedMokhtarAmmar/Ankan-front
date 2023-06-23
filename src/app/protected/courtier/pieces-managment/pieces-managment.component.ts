import {Component, OnInit} from '@angular/core';
import {Piece} from "../../../core/models/Piece";
import {ToastrService} from "ngx-toastr";
import {PieceService} from "../../../core/services/piece.service";
import {ProjectService} from "../../../core/services/project.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdatePieceComponent} from "./update-piece/update-piece.component";
import {UserService} from "../../../core/services/user.service";
import {Project} from "../../../core/models/Project";


@Component({
  selector: 'app-pieces-managment',
  templateUrl: './pieces-managment.component.html',
  styleUrls: ['./pieces-managment.component.scss']
})
export class PiecesManagmentComponent implements OnInit {


  public pieces: Piece[];
  public projects: Project[];
  public page = 1;
  public perPage = 1;
  public maxPage: number;

  public precedent: boolean;
  public suivant: boolean;

  public selectedPiece: Piece;

  public userConnected: string;
  test: Piece[];
  current: number = 0;
  end: number = 5;

  constructor(private userService: UserService, private toastrService: ToastrService, private pieceService: PieceService, private projectService: ProjectService, public dialog: MatDialog) {
    this.pieces = [];
    this.selectedPiece = new Piece();
  }

  async ngOnInit(): Promise<void> {
    this.listPiece(localStorage.getItem('id'));
    await this.userService.getIdUserConnected().then((res: any) => {
      this.userConnected = res;
    });
    this.projectService.getProjectsbyCourtierID(this.userConnected).then((res: any) => {
      this.projects = res;
      this.projects.forEach(projet => {
        this.pieceService.getPiecesbyProjectID(projet.id).then((res: any) => {
          console.log(res)
        })
      })
    })
  }

  listPiece(id: string) {
    this.pieceService.getPiecesbyUploaderID(id).subscribe((data: any) => {
      this.test = data.result;
   this.page=Math.ceil(this.test.length/5);
      this.pieces = this.test.slice(this.current, this.end);
      console.log(data);
    }, error => {
    }, () => {
      this.suivant = this.pieces.length === this.perPage;
    });
  }


  initSelectedUser() {
    this.selectedPiece = new Piece();
  }

  nextPage() {
    if (this.end < this.test.length) {
      this.perPage++;
    this.current = this.current + 5;
    this.end = this.end + 5;

    console.log(this.end)

      this.pieces = this.test.slice(this.current, this.end)
    }

  }


  previousPage() {
    if (this.current >= 5) {
      this.perPage--;
    this.current = this.current - 5;
    this.end = this.end - 5;

    console.log(this.current)

      this.pieces = this.test.slice(this.current, this.end)
    }

  }



  getNameProjectByID(projectID: string) {
    if (projectID !== undefined) {
      this.projectService.getProjectsbyID(projectID).subscribe((res: any) => {
        return res.result.projectName;
      })
    }

  }

  deletePiece(id: string) {
    this.pieceService.deletePiece(id).subscribe((res: any) => {
      this.toastrService.success('cette piece a eté supprimmer avec succes ');
    }, error => {
      this.toastrService.error('une erreur est servenue lors de la suppression de cette piece');
    }, () => {
      this.ngOnInit();
    });
  }

  editPiece(piece: Piece) {
    const dialogRef = this.dialog.open(UpdatePieceComponent, {
      width: '750px',
      data: {piece: piece}
    }).afterClosed().subscribe(data => this.ngOnInit());
  }


}
