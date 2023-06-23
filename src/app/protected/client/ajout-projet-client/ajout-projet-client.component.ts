import {Component, NgZone, OnInit} from '@angular/core';
import {User} from "../../../core/models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {TokenStorageService} from "../../../core/services/authentification/token-storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProjectService} from "../../../core/services/project.service";
import {Project} from "../../../core/models/Project";

@Component({
  selector: 'app-ajout-projet-client',
  templateUrl: './ajout-projet-client.component.html',
  styles: []
})
export class AjoutProjetClientComponent implements OnInit {

  user: User;
  project: Project;
  courtiers: User[] = [];
  projectForm: FormGroup;
  searchText: string = '';
  userSelected: User;


  get f() {
    return this.projectForm.controls;
  }

  constructor(public userService: UserService,
              public projectService: ProjectService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) {
    this.user = new User();
    this.searchText = "";
    this.userSelected = new User();
    this.project = new Project();

  }

  ngOnInit() {



    this.getUserByEmail();

    this.createForm()

  }

  createForm() {
    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectStatus: ['', Validators.required],
      courtierFirstName: [''],
      courtierLastName: [''],
      courtierEmail: [''],
      courtierPhone: ['', Validators.required],
    });
  }




  onSubmit() {



  }

  getUserByEmail() {
    if (this.searchText.length > 1)
      this.userService.loadUserByEmail(this.searchText).then((data: any) => {
        this.courtiers = data;
      });
    else {
      this.courtiers = [];
    }

  }


  clickSearchText(courtier: User) {
    this.userSelected = courtier;
    this.projectForm.get('courtierEmail').setValue(this.userSelected.email);
    this.projectForm.get('courtierFirstName').setValue(this.userSelected.firstName);
    this.projectForm.get('courtierPhone').setValue(this.userSelected.userPhone);
    this.projectForm.get('courtierLastName').setValue(this.userSelected.lastName);

  }


}
