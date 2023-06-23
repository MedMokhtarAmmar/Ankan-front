import {Component, OnInit} from '@angular/core';
import {Categorie} from "../../../../core/models/Categorie";
import {Piece} from "../../../../core/models/Piece";
import {CategorieService} from "../../../../core/services/categorie.service";
import {ToastrService} from "ngx-toastr";
import {PieceService} from "../../../../core/services/piece.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../../../core/services/project.service";
import Auth from "@aws-amplify/auth";
import {UserService} from '../../../../core/services/user.service';
import {User} from '../../../../core/models/User';
import {Project} from '../../../../core/models/Project';
import {Conversation} from "../../../../core/models/Conversation";
import {ConversationService} from "../../../../core/services/conversation.service";
import {NotificationsService} from "../../../../core/services/notifications.service";
import {Notification} from "../../../../core/models/Notification";
import {Storage} from "aws-amplify";

@Component({
  selector: 'app-create-piece',
  templateUrl: './create-piece.component.html',
  styleUrls: ['./create-piece.component.scss']
})
export class CreatePieceComponent implements OnInit {


  public categories: Categorie[];
  public selectedCategorie: any;
  public projets: Project[];
  public selectedProjet: any;
  public selectedProjet2: Project;
  public piece: Piece;
  public newPiece: Piece;
  public libelle: string;
  public description: string;
  public user: User;
  public courtierID: string;
  imageURL: string;
  newConversation: Conversation;
  newNotification: Notification;
  public client: User;
  private fileExtention: string;
  private filename: any;
  private file: any;
  url: string | ArrayBuffer;
  type: boolean;
  public project: Project;


  constructor(private userService: UserService,
              private categorieService: CategorieService,
              private projetService: ProjectService,
              private toastrService: ToastrService,
              private pieceService: PieceService,
              public router: Router,
              private conversationService: ConversationService,
              private toastr: ToastrService,
              private notificationsService: NotificationsService) {
    this.categories = [];
    this.projets = [];
    this.piece = new Piece();
    this.user = new User();
    this.libelle = '';
    this.description = '';
    this.newConversation = new Conversation();
    this.newNotification = new Notification();
    this.client = new User();
    this.type = true;
    this.project=new Project();

  }

  ngOnInit(): void {
    this.initialiseUser().then(() => {
      this.getProjets(this.courtierID);
      console.log(this.courtierID)
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
      console.log(this.projets);
    });
  }

  selectProjet(projetID: any) {
    this.selectedProjet = projetID;

    this.getClient()
    this.projectSelectedInfo(this.selectedProjet)

  }

  getClient() {
    this.projetService.getProjectById(this.selectedProjet).then((data: any) => {
      this.selectedProjet2 = data.result;
    }).then(() => {
      this.userService.getUser(this.selectedProjet2.clientID[0]).then((data: any) => {
        this.client = data.result;


      })
    })

  }
  projectSelectedInfo(id:string){
    this.projetService.getProjectById(id).then((data:any)=>{
      this.project=data.result;
      console.log(this.project)
    })
  }

  ajouterPiece() {


    if (this.libelle.length < 2 || this.description.length < 2 || this.selectedCategorie === undefined || this.url === undefined || this.selectedProjet === undefined) {
      this.toastrService.warning('verifier vos parametres d\'entré');
    } else {
      for(let i=0;i<this.project.clientEmail.length;i++){
      this.piece = new Piece();
      this.piece.categorieID = this.selectedCategorie;
      this.piece.projetID = this.selectedProjet;
      this.piece.pieceName = this.libelle;
      this.piece.description = this.description;
      this.piece.uploaderID = this.courtierID;
      this.piece.pieceStatus = "NEW";
      this.piece.modelPiece = 'modeles/' + this.selectedProjet2.projectName + '/' + this.libelle + '/' + this.filename;
      this.piece.clientID=this.project.clientEmail[i]

      console.log(this.selectedProjet2)
      this.pieceService.postPiece(this.piece).then((data: any) => {
        this.newPiece = data
        this.toastrService.success('piece enrigestré avec succes');

      }).then(() => {

        console.log('modeles/' + this.selectedProjet2.projectName + '/' + this.libelle + '/' + this.filename)
        this.uploadProtected('modeles/' + this.selectedProjet2.projectName + '/' + this.libelle + '/' + this.filename, this.file);
      }).then(() => {
        this.newConversation.title = "conversation du piece:" + this.piece.pieceName + this.piece.id;
        this.newConversation.projetPieceID = this.newPiece.id;

        this.newNotification.title = "Création d'une nouvelle piece";
        this.newNotification.messageID = "une nouvelle piéce " + this.newPiece.pieceName + " à été ajoué à votre projet."
        this.newNotification.status = 'NON_LUS';
        this.newNotification.typeNotification = 'PIECE';
        this.newNotification.objectID = this.newPiece.id;
        this.newNotification.userID = this.client.id;
        this.newNotification.date = Date.now().toString();


        this.conversationService.AjouterConversation(this.newConversation).then(() => {
            this.toastr.info("conversation  added");
            this.router.navigate(['/courtier/pieces'])
          }
        ).then(() => {
          this.notificationsService.addNotification(this.newNotification).then(() => {
            this.toastr.info('votre client sera notifié par l ajout de cette piéce');
          })
        }).catch(() => {
          this.toastr.error("conversation not added");
        })
      });
    }}
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

  initialiseUser() {
    return new Promise<any>((resolve, reject) => {

      this.courtierID = localStorage.getItem('id');
      resolve(this.user);
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

}
