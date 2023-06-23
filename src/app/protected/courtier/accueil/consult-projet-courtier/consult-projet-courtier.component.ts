import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../../../core/models/Project";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../../core/models/User";
import {ProjectService} from "../../../../core/services/project.service";
import {TokenStorageService} from "../../../../core/services/authentification/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-consult-projet-courtier',
  templateUrl: './consult-projet-courtier.component.html',
  styles: []
})
export class ConsultProjetCourtierComponent implements OnInit {
  project: Project;
  projectForm: FormGroup;
  courtier: User;
  searchText: string = '';
  courtiers: User[] = [];
  userSelected: User;
  IDclient: string = ''
  clientEmail: string;


  constructor(
    public dialogRef: MatDialogRef<ConsultProjetCourtierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public projectService: ProjectService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.project = new Project();

    this.project = this.data.project;
    this.searchText = "";
    this.courtier = new User();

  }

  ngOnInit() {

    this.getCourtierById()
    this.createForm();

    this.projectForm = new FormGroup({
      projectName: new FormControl(this.project.projectName, Validators.required),
      status: new FormControl(this.project.status),
      firstName: new FormControl(this.courtier.firstName, Validators.min(3)),
      lastName: new FormControl(this.courtier.lastName, Validators.min(3)),
      email: new FormControl(this.clientEmail, Validators.email),
      userPhone: new FormControl(this.courtier.userPhone, Validators.required),

    })
  }


  createForm() {

    this.projectForm = this.formBuilder.group({
      projectName: [this.project.projectName, Validators.required],
      status: [this.project.status, Validators.required],
      firstName: [this.courtier.firstName, ''],
      lastName: [this.courtier.lastName, ''],
      email: [this.courtier.email, ''],
      userPhone: [this.courtier.userPhone, Validators.required],
    })

  }

  getCourtierById() {
    if(this.project.clientID!=null){
      return new Promise<any>((resolve, reject) => {
        this.userService.getUser(this.project.clientID[0]).then((data: any) => {
          this.courtier = data.result;
          this.clientEmail=this.courtier.email;
          resolve(this.courtier);
          return (this.clientEmail)
        })

      })
    }else {
      this.clientEmail=this.project.clientEmail[0]
      console.log(this.clientEmail);

    }

  }


  getProjectInfo() {
    return new Promise<any>((resolve, reject) => {

      this.projectService.getProjectById(this.data.id).then((data: any) => {
        this.project = data.result;
        resolve(this.project);
      });
      return this.project;
    });
  }
  async onSubmit() {
    console.log(this.projectForm.get('email').value);
    let email = await this.getUserByEmail(this.projectForm.get('email').value);
    if (email != null) {
      this.project.projectName = this.projectForm.get('projectName').value;
      this.project.status = this.projectForm.get('status').value;
      this.project.clientID[0] = this.IDclient;


      this.projectService.modifierProject(this.data.project.id, this.project).then(() => {

        this.toastr.success("Projet modifié avec succes");
        this.getProjectInfo()
        this.ngOnInit();
        this.dialogRef.close();

      }).catch(err => {
        this.toastr.error("Merci de verfier les coordonnées du Projet")
      })
    } else {
      this.toastr.error("this email does not correspond to any User")

    }

  }


  getUserByEmail(email: string) {
    if (email!=''&& email !=null) {
      return new Promise<any>((resolve, reject) => {

          this.userService.loadUserByEmail(email).then((data: any) => {

            this.IDclient = data.result[0].id;
            console.log(data)

            resolve(this.IDclient)
            return this.IDclient
          }).catch((err) => {
            this.toastr.error('please verify the email address of the client')
          });

        }
      )
    }else {
      return this.IDclient=this.project.clientID[0];
    }

  }


}
