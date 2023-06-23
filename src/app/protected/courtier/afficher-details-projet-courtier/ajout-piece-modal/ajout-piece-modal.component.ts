import {Component, Inject, OnInit, Sanitizer} from '@angular/core';
import {Categorie} from "../../../../core/models/Categorie";
import {Project} from "../../../../core/models/Project";
import {Piece} from "../../../../core/models/Piece";
import {User} from "../../../../core/models/User";
import {Conversation} from "../../../../core/models/Conversation";
import {UserService} from "../../../../core/services/user.service";
import {CategorieService} from "../../../../core/services/categorie.service";
import {ProjectService} from "../../../../core/services/project.service";
import {ToastrService} from "ngx-toastr";
import {PieceService} from "../../../../core/services/piece.service";
import {Router} from "@angular/router";
import {ConversationService} from "../../../../core/services/conversation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Storage} from "aws-amplify";
import {Notification} from "../../../../core/models/Notification";
import {NotificationsService} from "../../../../core/services/notifications.service";

@Component({
  selector: 'app-ajout-piece-modal',
  templateUrl: './ajout-piece-modal.component.html',
  styleUrls: ['./ajout-piece-modal.component.scss']
})
export class AjoutPieceModalComponent implements OnInit {

  public project: Project;
  public categories: Categorie[];
  public selectedCategorie: any;

  public projets: Project[];
  public selectedProjet: any;

  public piece: Piece;
  public newPiece: Piece;

  public libelle: string;
  public description: string;
  public user: User;
  public courtierID: string;
  newNotification: Notification;
  fileExtention: string;
  filename: any;
  imageURL: string;
  newConversation: Conversation;
  file: any;
  url: string | ArrayBuffer;
  type: boolean;
   clientmail: string='';

  constructor(public dialogRef: MatDialogRef<AjoutPieceModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private categorieService: CategorieService,
              private projetService: ProjectService,
              private toastrService: ToastrService,
              private pieceService: PieceService,
              public router: Router,
              private conversationService: ConversationService,
              private toastr: ToastrService,
              private notificationsService: NotificationsService,
              ) {
    this.project = data.project;
    this.clientmail=data.client
    this.categories = [];
    this.projets = [];
    this.piece = new Piece();
    this.user = new User();
    this.libelle = '';
    this.description = '';
    this.newConversation = new Conversation();
    this.newNotification = new Notification();
    this.type = true;

  }

  ngOnInit(): void {
    console.log(this.project);
    console.log(this.clientmail);
    this.initialiseUser().then(() => {
      this.getProjets(this.courtierID);
    })
    this.getCategories();
  }

  getCategories() {
    this.categorieService.getCategories(1, 25).subscribe((data: any) => {
      this.categories = data;
    });
  }

  selectCategorie(categorieId: any) {
    this.selectedCategorie = categorieId;
  }

  getProjets(courtierID: string) {
    this.projetService.getProjectsbyCourtierID(courtierID).then((data: any) => {
      this.projets = data;
      console.log(data);
    });
  }


  ajouterPiece() {

    if (this.libelle.length < 2 || this.description.length < 2 || this.selectedCategorie === undefined || this.url === undefined || this.project === undefined) {
      console.log(this.project.id)
      this.toastrService.warning('verifier vos parametres d\'entré');
    } else {
      this.piece = new Piece();
      this.piece.categorieID = this.selectedCategorie;
      this.piece.projetID = this.project.id;
      this.piece.pieceName = this.libelle;
      this.piece.description = this.description;
      this.piece.uploaderID = this.courtierID;
      this.piece.pieceStatus = "NEW";
      this.piece.clientID=this.clientmail;
      this.piece.modelPiece = 'modeles/' + this.project.projectName + '/' + this.libelle + '/' + this.filename;

      console.log(this.project)
      this.pieceService.postPiece(this.piece).then((data: any) => {
        this.newPiece = data
        this.toastrService.success('piece enrigestré avec succes');

      }).then(() => {

        console.log('modeles/' + this.project.projectName + '/' + this.libelle + '/' + this.filename)
        this.uploadProtected('modeles/' + this.project.projectName + '/' + this.libelle + '/' + this.filename, this.file);
      }).then(() => {
        this.newConversation.title = "conversation du piece:" + this.piece.pieceName + this.piece.id;
        this.newConversation.projetPieceID = this.newPiece.id;

        this.newNotification.title = "Création d'une nouvelle piece";
        this.newNotification.messageID = "une nouvelle piéce " + this.newPiece.pieceName + " à été ajoué à votre projet."
        this.newNotification.status = 'NON_LUS';
        this.newNotification.typeNotification = 'PIECE';
        this.newNotification.objectID = this.newPiece.id;
        // this.newNotification.userID = this.project.clientID;
        this.newNotification.date = Date.now().toString();


        this.conversationService.AjouterConversation(this.newConversation).then(() => {
            this.toastr.info("conversation  added");
           // this.router.navigate(['/courtier/pieces'])
          }
        ).then(() => {
          this.notificationsService.addNotification(this.newNotification).then(() => {
            this.toastr.info('votre client sera notifié par l ajout de cette piéce');
          })
        }).catch(() => {
          this.toastr.error("conversation not added");
        })
      });
    }
    this.dialogRef.close();
  }





  initialiseUser() {
    return new Promise<any>((resolve, reject) => {
      let email = localStorage.getItem('emailUser');
      this.userService.loadUserByEmail(email).then((data: any) => {
        this.user = data;
        this.courtierID = data.result[0].id;
        console.log(data.result[0].id);
        resolve(this.user);
      });
      return this.courtierID;

    })
  }

  uploadProtected(fileName, file) {
    Storage.put(fileName, file, {
      level: 'public'

    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.filename = event.target.files[0].name;

      this.file = event.target.files[0];
      var reader = new FileReader();
      this.fileExtention = event.target.files[0].type;
      if (event.target.files[0].type === "application/pdf") {
        this.type = false;
        console.log(this.type)
      }
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }


}
