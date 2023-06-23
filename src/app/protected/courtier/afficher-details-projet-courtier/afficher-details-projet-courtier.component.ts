import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../core/services/project.service";
import {UserService} from "../../../core/services/user.service";
import {PieceService} from "../../../core/services/piece.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../../core/models/User";
import {Project} from "../../../core/models/Project";
import {Piece} from "../../../core/models/Piece";
import {AjoutPieceModalComponent} from "./ajout-piece-modal/ajout-piece-modal.component";
import {DetailsPieceComponent} from "../../client/afficher-details-projet/details-piece/details-piece.component";
import {UpdatePieceComponent} from '../pieces-managment/update-piece/update-piece.component';
import {ModelService} from "../../../core/services/model.service";
import {Model} from "../../../core/models/Model";
import {ToastrService} from "ngx-toastr";
import {ListPiece} from "../../../core/models/listPiece";
import {ListPieceService} from "../../../core/services/list-piece.service";
import {Conversation} from "../../../core/models/Conversation";
import {Notification} from "../../../core/models/Notification";
import {ConversationService} from "../../../core/services/conversation.service";
import {NotificationsService} from "../../../core/services/notifications.service";
import {SupprimerClientModalComponent} from "./supprimer-client-modal/supprimer-client-modal.component";

@Component({
  selector: 'app-afficher-details-projet-courtier',
  templateUrl: './afficher-details-projet-courtier.component.html',
  styleUrls: ['./afficher-details-projet-courtier.component.scss']
})
export class AfficherDetailsProjetCourtierComponent implements OnInit {
  projectId: string;
  clients: User[];
  projectForm: FormGroup;
  project: Project;
  clientID: string[];
  pieces: Piece[];
  type: string = 'projet';
  selectedProject: Project;
  selectedPiece: Piece;
  modeles: Model[];
  ModelSelected: Model;
  searchText: string = '';
  newPiece: Piece;
  user: User;
  courtierID: string;
  listPiece: ListPiece[];
  models: Model[];
  newConversation: Conversation;
  newNotification: Notification;
  AddedPiece: Piece;
  check: boolean = true;

  listTest: any[];
  clientMail: string[];
  clientMail2: string[];
  projectUpdated: Project;
  selectedClient: User;


  constructor(private  route: ActivatedRoute, private projectService: ProjectService,
              private userService: UserService, private pieceService: PieceService,
              private formBuilder: FormBuilder, public dialog: MatDialog,
              private modelService: ModelService,
              private toastr: ToastrService,
              private listPieceService: ListPieceService,
              private conversationService: ConversationService,
              private notificationsService: NotificationsService
  ) {
    this.selectedPiece = new Piece();
    this.modeles = [];
    this.newPiece = new Piece();
    this.listPiece = [];
    this.models = [];
    this.newConversation = new Conversation();
    this.newNotification = new Notification();
    this.clients = [];
    this.listTest = [];
    this.clientMail2 = [];
    this.projectUpdated = new Project();
    this.selectedClient = new User();
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.id;
    this.initialiseUser();
    this.global();
    this.listPieceProjets();
    this.getListModel();
    this.getListOFlistPiece();
  }

  async global() {
    await this.getProjectInfo().then(() => {
      this.clientID = this.project.clientID;

    }).then(() => {
      this.getClientInfo();
      this.test();
    });
  }

  getProjectInfo() {
    return new Promise<Project>((resolve, reject) => {
      this.clientMail = [];
      this.projectService.getProjectById(this.projectId).then((data: any) => {
        this.project = data.result;
        this.clientMail = data.result.clientEmail;

        resolve(this.project);
      });
      return this.project;
    });
  }


  async getClientInfo() {
    for (let i = 0; i < this.clientID.length; i++) {
      this.userService.getUser(this.clientID[i]).then((data: any) => {

        this.clients[i] = data.result;
        this.clientMail2[i] = data.result.email
        return this.clients;
      });
    }

  }

  listPieceProjets() {
    this.pieceService.getPiecesbyProjectID(this.projectId).then((data: any) => {
      this.pieces = data.result

    })
  }

  initSelectedProject() {
    this.selectedProject = new Project();
  }

  openDialogAjoutPiece(projet: Project, client: string) {
    this.selectedProject = projet;

    const dialogRef = this.dialog.open(AjoutPieceModalComponent, {
      width: '800px',
      height: '800px',

      data: {project: this.selectedProject, client: client}

    }).afterClosed().subscribe(res => {
      this.initSelectedProject();
      this.listPieceProjets();
      this.test()
    });

  }


  openDialogDetailsPiece(piece: Piece) {
    this.selectedPiece = piece;

    const dialogRef = this.dialog.open(DetailsPieceComponent, {
      width: '800px',
      height: '800px',

      data: {piece: this.selectedPiece}

    }).afterClosed().subscribe(res => {
      this.initSelectedPiece();
      this.listPieceProjets();
    });

  }

  openDialogeditPiece(piece: Piece) {
    this.selectedPiece = piece;

    const dialogRef = this.dialog.open(UpdatePieceComponent, {
      width: '800px',
      height: '800px',

      data: {piece: this.selectedPiece}

    }).afterClosed().subscribe(res => {
      this.initSelectedPiece();
      this.listPieceProjets();
    });

  }

  initSelectedPiece() {
    this.selectedPiece = new Piece();
  }

  getListModel() {
    this.modelService.getModeles(1, 20).subscribe((data: any) => {
      this.modeles = data;

    })
  }

  getListOFlistPiece() {
    this.listPieceService.getListes(1, 20).subscribe((data: any) => {
      this.listPiece = data;
    })
  }

  clickSearchTextModel(model: Model, index: number) {

    this.ModelSelected = model;
    this.newPiece = new Piece();
    this.newPiece.pieceName = model.modelName;
    this.newPiece.description = model.description;
    this.newPiece.categorieID = model.categorieID;
    this.newPiece.modelPiece = model.modelPiece;
    this.newPiece.pieceStatus = "NEW";
    this.newPiece.projetID = this.projectId;
    this.newPiece.uploaderID = this.courtierID;
    this.newPiece.clientID = this.clientMail[index]


    const found = this.listTest[index].some(el => el.pieceName === this.newPiece.pieceName);
    if (!found) {
      this.pieceService.postPiece(this.newPiece).then((data: any) => {
        this.AddedPiece = data;
        this.toastr.info("piece ajoutée avec succés")
        this.listPieceProjets();
        this.test()
      }).then(() => {
        this.addNewPieceConversation(this.AddedPiece)
      });

    } else {
      console.log('already added ')
    }


  }


  clickSearchTextList(list: ListPiece, index: number) {
    for (let i = 0; i < list.models.length; i++) {
      this.modelService.getModel(list.models[i]).subscribe((data: any) => {
        this.models[i] = data.result
        this.newPiece = new Piece();
        this.newPiece.pieceName = this.models[i].modelName;
        this.newPiece.description = this.models[i].description;
        this.newPiece.categorieID = this.models[i].categorieID;
        this.newPiece.modelPiece = this.models[i].modelPiece;
        this.newPiece.pieceStatus = "NEW";
        this.newPiece.projetID = this.projectId;
        this.newPiece.uploaderID = this.courtierID;
        this.newPiece.clientID = this.clientMail[index]
        const found = this.listTest[index].some(el => el.pieceName === this.newPiece.pieceName);
        if (!found) {
          this.pieceService.postPiece(this.newPiece).then((data: any) => {
            this.AddedPiece = data;
            this.toastr.info("pieces ajoutée avec succés")
            this.listPieceProjets();
            this.test()
          }).then(() => {
            this.addNewPieceConversation(this.AddedPiece)


          });
        } else {
          console.log("list already added")
        }
      })

    }
  }


  initialiseUser() {
    return new Promise<any>((resolve, reject) => {
      // let email=localStorage.getItem('emailUser')
      // this.userService.loadUserByEmail(email).then((data: any) => {
      //   this.user = data;
      //   this.courtierID = data.result[0].id;
      //   resolve(this.user);
      // });
      this.courtierID = localStorage.getItem('id');
      resolve(this.courtierID);
      return this.courtierID;

    })
  }

  addNewPieceConversation(piece: Piece) {


    this.newConversation.title = "conversation du piece: " + piece.pieceName + piece.id;
    this.newConversation.projetPieceID = piece.id;

    this.newNotification.title = "Création d'une nouvelle piece";
    this.newNotification.messageID = "une nouvelle piéce " + piece.pieceName + " à été ajoué à votre projet."
    this.newNotification.status = 'NON_LUS';
    this.newNotification.typeNotification = 'PIECE';
    this.newNotification.objectID = piece.id;
    //  this.newNotification.userID = this.client.id;
    this.newNotification.date = Date.now().toString();


    this.conversationService.AjouterConversation(this.newConversation).then(() => {
        //this.toastr.info("conversation  added");

      }
    ).then(() => {
      this.notificationsService.addNotification(this.newNotification).then(() => {
        this.toastr.info('votre client sera notifié par l ajout de cette piéce');
      })
    }).catch(() => {
      this.toastr.error("conversation not added");
    })

  }

  deletePiece(piece: Piece) {
    this.pieceService.deletePiece(piece.id).subscribe(
      () => {
        console.log("piece deleted")
        this.listPieceProjets();
        this.test()
      }
    )
  }


  test() {
    this.listTest = [];
    for (let i = 0; i < this.clientMail.length; i++) {

      this.pieceService.getPiecesbyClientMailProjectID(this.clientMail[i], this.projectId).subscribe((data: any) => {
        this.listTest[i] = data.result;

      });

    }

  }


  initSelectedClient() {
    this.selectedClient = new User();
  }

  openDialogSupprimerClient(client: User, project: Project, existant: boolean) {
    this.selectedClient = client;

    const dialogRef = this.dialog.open(SupprimerClientModalComponent, {
      width: '750px',


      data: {client: this.selectedClient, project: project, existant: existant}

    }).afterClosed().subscribe(res => {
      //  window.location.reload()
      this.global();

      this.test();
      this.clients = []

    }, error => {
    }, () => {
      ;
    });

  }

  openDialogSupprimerClientNotRegistred(project: Project, mail: string, existant: boolean) {

    const dialogRef = this.dialog.open(SupprimerClientModalComponent, {
      width: '750px',
      data: {project: project, mail: mail, existant: existant}
    }).beforeClosed().subscribe(res => {
      this.global();
      this.initSelectedClient();
      this.getClientInfo();


    });

  }
}
