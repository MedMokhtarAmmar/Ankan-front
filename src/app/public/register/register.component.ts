import {Component, OnInit} from '@angular/core';
import {User} from '../../core/models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/services/user.service';
import {TokenStorageService} from '../../core/services/authentification/token-storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../core/services/authentification/auth.service';
import {RegisterObject} from '../../core/models/RegisterObject';
import {Project} from "../../core/models/Project";
import {retryWhen} from "rxjs/operators";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public user: User;
  registerForm: FormGroup;
  accepted = false;
  submitted = false;
  loading = false;
  isClientShown: boolean;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  acceptCondition = false;


  cognito: null;
  blankfield: false;
  passwordmatch: false;
  newuser: User;


  get f() {
    return this.registerForm.controls;
  }

  get f2() {
    return this.registerForm.controls;
  }

  constructor(public service: UserService,
              private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) {

    this.newuser = new User();

  }

  ngOnInit() {
    this.getBaseUrl()
    this.submitted = false;
    this.accepted = false;
    this.resetForm();
    this.loading = false;
    this.isClientShown = true;
    this.registerForm = this.formBuilder.group({
     // lastName: ['', Validators.maxLength(20)],
      userEmail: ['', Validators.required],
      userName: ['', Validators.maxLength(30)],
     // firstName: ['', Validators.maxLength(20)],
      userPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required,],
      accepted: [this.accepted, Validators.required],
    });
  }

  getBaseUrl() {
    // fetch('../../../config/config.json').then(res => {
    //   console.log(res)
    //   res.json().then((res) => {
    //     //console.log(res.apiUrl)
    //     localStorage.setItem('BASE_URL', res.apiUrl+'/');
    //   });
    // });
  }

  clearErrorState = () => {
    this.cognito = null,
      this.blankfield = false,
      this.passwordmatch = false;
  }

  resetForm() {
    this.submitted = false;
    this.accepted = false;
    this.registerForm = this.formBuilder.group({
      //lastName: ['', Validators.required],
      userEmail: ['', Validators.required],
      userName: ['', Validators.required],
      //firstName: ['', Validators.required],
      userPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required,],
      accepted: [this.accepted, Validators.required],
    });
  }

  onSubmit() {
    const registerObject = new RegisterObject();
    this.submitted = true;
    if (this.registerForm.invalid) {
      return null;
    }

    if (this.isClientShown == true) {
        this.authService.signup(this.registerForm.get('userEmail').value,
          this.registerForm.get('userPassword').value,
          this.registerForm.get('userName').value, 'COURTIER').then(res => {
          this.toastr.success('inscription profile Client avec succes , veuillez confirmer pour la connexion');

         // this.newuser.firstName = this.registerForm.get('firstName').value;
         // this.newuser.lastName = this.registerForm.get('lastName').value;
          this.newuser.email = this.registerForm.get('userEmail').value;
          this.newuser.username = this.registerForm.get('userName').value;
          this.newuser.status='new';
          console.log(this.registerForm.get('userName').value);
          console.log(res)
        }).catch(error => {
          this.toastr.error("error while adding to cognito", error.message)
        })
        .then(() => {
          this.service.ajoutUser(this.newuser).
          catch(error => {
            this.toastr.error("error while adding user to database")
          }).then(() => {
            this.router.navigate(['/']).then(r => this.resetForm());
          });


        }).catch(error => {

          // this.resetForm();

          if (error.message === 'User already exists') {

            this.toastr.warning('ce nom d\'utilisateur existe deja');
          } else if (error.message === 'Password did not conform with policy: Password must have numeric characters') {
            this.toastr.warning('le mot de passe doit contenir un charatere numérique');
          } else {
            this.toastr.warning('une erreur est servenue lors de l\'inscription');
          }
        });

    } else {
      this.authService.signup(this.registerForm.get('userEmail').value,
        this.registerForm.get('userPassword').value,
        this.registerForm.get('userName').value, 'CLIENT').then(res => {

        this.toastr.success('inscription profile Client avec succes , veuillez confirmer pour la connexion');

       // this.newuser.firstName = this.registerForm.get('firstName').value;
        //this.newuser.lastName = this.registerForm.get('lastName').value;
        this.newuser.email = this.registerForm.get('userEmail').value;
        this.newuser.username = this.registerForm.get('userName').value;
        this.newuser.status='new';
        console.log(this.registerForm.get('userName').value);

      }).then(() => {
        this.service.ajoutUser(this.newuser).catch(error => {
          this.toastr.error(error)
        }).then(() => {
          this.router.navigate(['/']).then(r => this.resetForm());
        });

      }).catch(error => {

        // this.resetForm();

        if (error.message === 'User already exists') {

          this.toastr.warning('ce nom d\'utilisateur existe deja');
        } else if (error.message === 'Password did not conform with policy: Password must have numeric characters') {
          this.toastr.warning('le mot de passe doit contenir un charatere numérique');
        } else {
          this.toastr.warning('une erreur est servenue lors de l\'inscription');
        }
      });
    }

  }


  switchToCourtier() {
    this.isClientShown = true;
    console.log(this.isClientShown)
  }

  switchToClient() {
    this.isClientShown = false;
    console.log(this.isClientShown)

  }

}
