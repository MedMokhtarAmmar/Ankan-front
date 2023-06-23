import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DocumentService} from "../../../../core/services/document.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Document} from "../../../../core/models/Document";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {throwUnknownPortalTypeError} from "@angular/cdk/portal/portal-errors";
import {Storage} from "aws-amplify";
import {TokenStorageService} from "../../../../core/services/authentification/token-storage.service";
import {UserService} from "../../../../core/services/user.service";
import {User} from "../../../../core/models/User";

@Component({
  selector: 'app-document-info',
  templateUrl: './document-info.component.html',
  styleUrls: ['./document-info.component.scss']
})
export class DocumentInfoCourtierComponent implements OnInit {
  idDocument: string;
  document: Document
  documentDetails: Document;
  type: string;
  documentForm: FormGroup;
  fileURL: String | Object;
  private uploader: User;


  constructor(public dialogRef: MatDialogRef<DocumentInfoCourtierComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  route: ActivatedRoute,
              private documentService: DocumentService,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    this.document = data.document;
    this.idDocument = this.document.id
  }

  ngOnInit(): void {
    this.documentForm = new FormGroup({
      documentTitle: new FormControl(''),
      documentDescription: new FormControl(''),
      documentPath: new FormControl(''),
      extension: new FormControl(''),
      uploaderID: new FormControl(''),
      pieceID: new FormControl(''),
    });

    this.type = this.document.extension;

    this.getDocumentDetails(this.idDocument).then(() => {
      this.createForm()
      this.getuploader(this.document.uploaderID).then(() => {
        this.getImage(this.uploader.username + '/' + this.documentDetails.documentPath)
      });


    });
  }

  getDocumentDetails(id: string) {
    return new Promise<any>((resolve, reject) => {
      this.documentService.getDocument(id).subscribe((data: any) => {
        this.documentDetails = data.result;
        resolve(this.documentDetails)
      });
      return this.documentDetails;
    })
  }

  createForm() {
    this.documentForm = this.formBuilder.group({
      documentTitle: [this.documentDetails.documentTitle],
      documentDescription: [this.documentDetails.documentDescription],
      documentPath: [this.documentDetails.documentPath],
      extension: [this.documentDetails.extension],
      uploaderID: [this.documentDetails.uploaderID],
      pieceID: [this.documentDetails.pieceID]
    });
  }

  getImage(path: string) {
    Storage.get(path,
      {
        level: 'public'
      }).then((data) => {
      this.fileURL = data
    }).catch(e => {
      console.log(e, 'error fetching image')
    })
  }

  getuploader(id: string) {
    return new Promise<any>((resolve, reject) => {

      this.userService.getUser(id).then((data: any) => {
        this.uploader = data.result;
        resolve(this.uploader)
      })
      return this.uploader
    })
  }
}
