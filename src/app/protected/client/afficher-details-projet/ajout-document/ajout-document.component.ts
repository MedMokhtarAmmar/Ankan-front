import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Piece} from "../../../../core/models/Piece";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Document} from "../../../../core/models/Document";
import {User} from "../../../../core/models/User";
import {DocumentService} from "../../../../core/services/document.service";
import {ToastrService} from "ngx-toastr";
import Auth from "@aws-amplify/auth";
import {UserService} from "../../../../core/services/user.service";
import {PieceService} from "../../../../core/services/piece.service";
import {Notification} from "../../../../core/models/Notification";
import {NotificationsService} from "../../../../core/services/notifications.service";
import {Storage} from 'aws-amplify';
import {ProjectService} from "../../../../core/services/project.service";
import {Project} from "../../../../core/models/Project";

@Component({
  selector: 'app-ajout-document',
  templateUrl: './ajout-document.component.html',
  styleUrls: ['./ajout-document.component.scss']
})
export class AjoutDocumentComponent implements OnInit {
  piece: Piece;
  newPiece: Piece;
  documentForm: FormGroup;
  document: Document;
  newDocument: Document;
  user: User;
  idUploader: string;
  url: string | ArrayBuffer;
  type: boolean;
  newNotification: Notification;
  private fileExtention: string;
  private filename: any;
  private file: any;
  project:Project;
  private username: string;


  get f() {
    return this.documentForm.controls;
  }

  constructor(public dialogRef: MatDialogRef<AjoutDocumentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private documentService: DocumentService,
              private toastr: ToastrService,
              private userService: UserService,
              private pieceService: PieceService,
              private toastrService: ToastrService,
              private notificationsService: NotificationsService,
              private projectService: ProjectService) {
    this.user = new User();
    this.piece = data.piece;
    this.document = new Document();
    this.type = true;
    this.newPiece = new Piece();
    this.newNotification = new Notification();

  }

  ngOnInit(): void {
    this.initialiseUser()
    this.documentForm = new FormGroup({
      documentTitle: new FormControl('', Validators.minLength(3)),
      documentDescription: new FormControl('', Validators.minLength(3)),
      documentPath: new FormControl(''),
      extension: new FormControl(''),
      uploaderID: new FormControl(''),
      pieceID: new FormControl(''),
      documentStatus: new FormControl(''),

    })
    this.createForm()
this.getProjectById()
  }

getProjectById(){
    this.projectService.getProjectById(this.piece.projetID).then((data:any)=>{
      this.project=data.result;
      console.log(this.project)

    })
}
  createForm() {
    this.documentForm = this.formBuilder.group({
      documentTitle: ['', Validators.required],
      documentDescription: ['', Validators.required],
      documentPath: [''],
      extension: [''],
      uploaderID: [''],
      pieceID: [''],
      documentStatus: ['']
    });
  }


  initialiseUser() {
    let email=localStorage.getItem('emailUser')
    console.log(email)
      this.userService.loadUserByEmail(email).then((data: any) => {
        this.user = data;
        this.username=data.result[0].username
        this.idUploader = data.result[0].id
        console.log(data)
      });



  }

  onSubmit() {
    this.document.documentTitle = this.documentForm.get('documentTitle').value;
    this.document.documentDescription = this.documentForm.get('documentDescription').value;
    this.document.documentPath = this.project.projectName+'/'+this.piece.pieceName + '/' + this.documentForm.get('documentTitle').value + '/' + this.filename;
    this.document.extension = this.fileExtention;
    this.document.uploaderID = this.idUploader;
    this.document.pieceID = this.piece.id;
    this.document.documentStatus = "NEW";


    this.documentService.ajoutDocument(this.document).then((data: any) => {
      this.newDocument = data
      this.toastr.success("document ajouté avec succes");
      this.ngOnInit();
      this.document = new Document();
      this.dialogRef.close();

    }).then(() => {

      this.uploadProtected(this.username+'/'+this.project.projectName+'/'+this.piece.pieceName + '/' + this.newDocument.documentTitle + '/' + this.filename, this.file);

    }).then(() => {
      this.newNotification.date = Date.now().toString();
      this.newNotification.messageID = 'un nouveau document ' + this.newDocument.documentTitle + ' à été ajouter par votre client .';
      this.newNotification.status = 'NON_LUS';
      this.newNotification.title = 'Nouveau Document';
      this.newNotification.userID = this.piece.uploaderID;
      this.newNotification.objectID = this.piece.id;
      this.newNotification.typeNotification = 'DOCUMENT';
      this.notificationsService.addNotification(this.newNotification).then(() => {
        this.toastr.info('votre client sera notifié par l ajout de cette piéce');
      })
      this.updatePieceStatus()

    }).catch(err => {
      this.toastr.error("Merci de verfier le document ajouté")
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


  updatePieceStatus() {
    this.newPiece.pieceName = this.piece.pieceName;
    this.newPiece.projetID = this.piece.projetID;
    this.newPiece.categorieID = this.piece.categorieID;
    this.newPiece.description = this.piece.description;
    this.newPiece.uploaderID = this.piece.uploaderID;
    this.newPiece.modelPiece = this.piece.modelPiece;
    this.newPiece.clientID=this.piece.clientID;
    this.newPiece.pieceStatus = "WAITING";


    this.pieceService.modifierPiece(this.piece.id, this.newPiece).subscribe((data) => {
      console.log(data)
      this.toastrService.info("status du piéce " + this.piece.pieceName + " à été mis à jour !")
    })
  }

}
