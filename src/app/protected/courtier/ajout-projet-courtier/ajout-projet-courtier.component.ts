import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/models/User';
import {Project} from '../../../core/models/Project';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {ProjectService} from '../../../core/services/project.service';
import {TokenStorageService} from '../../../core/services/authentification/token-storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import Auth from '@aws-amplify/auth';
import {ConversationService} from '../../../core/services/conversation.service';
import {Conversation} from '../../../core/models/Conversation';
import {NotificationsService} from '../../../core/services/notifications.service';
import {Notification} from '../../../core/models/Notification';

@Component({
  selector: 'app-ajout-projet-courtier',
  templateUrl: './ajout-projet-courtier.component.html',
  styles: []
})
export class AjoutProjetCourtierComponent implements OnInit {

  user: User;
  project: Project;
  clients: User[] = [];
  projectForm: FormGroup;
  searchText: string = '';
  userSelected: User;
  public clientemail: string = '';
  public idUSer: string = '';
  newConversation: Conversation;
  newNotification: Notification;
  newProject: Project;

  get f() {
    return this.projectForm.controls;
  }

  constructor(public userService: UserService,
              public projectService: ProjectService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private conversationService: ConversationService,
              private notificationsService: NotificationsService) {
    this.user = new User();
    this.searchText = '';
    this.userSelected = new User();
    this.project = new Project();
    this.newProject = new Project();
    this.newConversation = new Conversation();
    this.newNotification = new Notification();


  }

  ngOnInit() {


    this.initialiseUser();

    this.getUserByEmail();

    this.createForm()
  }

  createForm() {
    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectStatus: ['', Validators.required],
      clientFirstName: [''],
      clientLastName: [''],
      clientEmail: [''],
      clientPhone: ['', Validators.required],
    });
  }

  initialiseUser() {
    let email = localStorage.getItem('emailUser')


    this.userService.loadUserByEmail(email).then((data: any) => {
      this.user = data.result[0];
      this.idUSer = data.result[0].id;
      console.log(this.idUSer)
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


    this.project.courtierID = this.idUSer;
    this.project.status = "NEW";
    if (this.clientemail != null) {
      this.project.clientID = [this.clientemail];
    } else {
      this.project.clientID = [];
    }

    this.project.lastConsultationDay = '';
    this.project.clientEmail = [this.projectForm.get('clientEmail').value];


    this.project.projectName = this.projectForm.get('projectName').value;

    if (this.project.clientID[0] === this.project.courtierID) {
      this.toastr.error('Vous ne pouvez pas creer un projet pour vous meme');
    } else {
      this.projectService.creerProjet(this.project).then((data: any) => {
        if (this.clientemail == null) {
          console.log("send email to " + this.project.clientEmail);
        }
        this.toastr.success('Votre projet a été créé');
        this.newProject = data;
        this.router.navigateByUrl('courtier/project-info/' + data.id)
      }).catch(() => {
        this.toastr.error('Merci de vérifier votre saisie')
      }).finally(() => {

        this.newConversation.title = 'conversation du projet:' + this.project.projectName;
        this.newConversation.projetID = this.newProject.id;


        this.newNotification.date = Date.now().toString();
        this.newNotification.messageID = 'un nouveau projet ' + this.newProject.projectName + ' à été ajouter pour vous par ' + this.user.firstName + ' ' + this.user.lastName + '.';
        this.newNotification.status = 'NON_LUS';
        this.newNotification.title = 'Nouveau projet';
        this.newNotification.userID = this.clientemail;
        this.newNotification.objectID = this.newProject.id;
        this.newNotification.typeNotification = 'PROJET';
        this.conversationService.AjouterConversation(this.newConversation).then().catch(() => {
          this.toastr.error('conversation not added');
        }).then(() => {
          this.notificationsService.addNotification(this.newNotification).then(() => {
            this.toastr.info('votre client sera notifié');
          })
        })


      });
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
