import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../core/services/project.service";
import {Project} from "../../../../core/models/Project";
import {User} from "../../../../core/models/User";
import {UserService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ajouter-personne-physique',
  templateUrl: './ajouter-personne-physique.component.html',
  styleUrls: ['./ajouter-personne-physique.component.scss']
})
export class AjouterPersonnePhysiqueComponent implements OnInit {
  projectId: string;
  projectForm: FormGroup;
  project2: Project;
  project: Project;
  searchText: string = '';
  clients: User[] = [];
  userSelected: User;
  public clientemail: string = '';
  public idUSer: string = '';

  constructor(private  route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private projectService: ProjectService,
              private userService: UserService,
              private toastr: ToastrService,
  ) {
    this.project2 = new Project();
    this.project = new Project();
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.id;
    this.initialiseUser()
    this.getproject()
    this.createForm()
  }

  initialiseUser() {
    let email = localStorage.getItem('emailUser')


    this.userService.loadUserByEmail(email).then((data: any) => {
      this.idUSer = data.result[0].id;
      console.log(this.idUSer)
    });


  }

  getproject() {
    this.projectService.getProjectById(this.projectId).then((data: any) => {
      this.project2 = data.result
      console.log(this.project2)
    })

  }

  createForm() {
    this.projectForm = this.formBuilder.group({
      projectName: [this.project2.projectName, Validators.required],
      projectStatus: [this.project2.status, Validators.required],
      clientFirstName: [''],
      clientLastName: [''],
      clientEmail: [''],
      clientPhone: ['', Validators.required],
    });
  }

  async onSubmit() {

    await this.userService.loadUserByEmail(this.projectForm.get('clientEmail').value).then((data: any) => {
      console.log(data);
      this.clientemail = data.result[0].id;
      console.log(this.clientemail)
    }).catch((e) => {
      console.log(e);
      this.clientemail = null
    });
    if (this.clientemail != null && this.project2.clientID.includes(this.clientemail)  || this.project2.clientEmail.includes(this.projectForm.get('clientEmail').value)) {
      this.toastr.warning("utilisateur deja ajouté")
      console.log(this.project2.clientEmail)
    } else {

      this.project.courtierID = this.idUSer;
      this.project.status = "NEW";
      if (this.clientemail != null && !this.project2.clientID.includes(this.clientemail)) {
        this.project.clientID = this.project2.clientID.concat(this.clientemail);
      } else {
        this.project.clientID = this.project2.clientID;
      }

      this.project.lastConsultationDay = '';
      this.project.clientEmail = this.project2.clientEmail.concat(this.projectForm.get('clientEmail').value);


      this.project.projectName = this.project2.projectName;

      if (this.project.clientID.includes(this.project.courtierID)) {
        this.toastr.error('Vous ne pouvez pas creer un projet pour vous meme');
      } else {
        this.projectService.modifierProject(this.projectId, this.project).then((data: any) => {
          if (this.clientemail == null) {
            console.log("send email to " + this.project.clientEmail);
          }
          this.toastr.success('client ajouté');
          this.router.navigateByUrl('courtier/project-info/' + this.projectId)
        })
      }
    }
  }


  getUserByEmail() {
    if (this.searchText.length > 1)
      this.userService.loadUserByEmail(this.searchText).then((data: any) => {
        this.clients = data.result;
        console.log(this.clients)
      });
    else {
      this.clients = [];
    }

  }

  clickSearchText(user: User) {

    this.userSelected = user;
    this.projectForm.get('clientEmail').setValue(this.userSelected.email);
    this.projectForm.get('clientFirstName').setValue(this.userSelected.firstName);
    this.projectForm.get('clientLastName').setValue(this.userSelected.lastName);
    this.projectForm.get('clientPhone').setValue(this.userSelected.userPhone);

  }
}
