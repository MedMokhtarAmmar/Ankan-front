import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/models/User';
import {Op} from '../../../core/models/Op';
import {Router} from '@angular/router';
import {UserService} from '../../../core/services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../core/services/authentification/token-storage.service';
import Auth from '@aws-amplify/auth';
import {Storage} from "aws-amplify";
import {ToastrService} from "ngx-toastr";
import {FileS3} from "../../../core/models/FileS3";

@Component({
  selector: 'app-profil-client',
  templateUrl: './profil-client.component.html',
  styles: []
})
export class ProfilClientComponent implements OnInit {
  username: string;
  public attributes: any;
  public testmail: string = '';
  userProfile: User;
  private fileExtention: string;
  private filename: any;
  private file: any;
  private file2: any;
  url: string | ArrayBuffer;
  url2: string | ArrayBuffer;
  type: boolean;
  fileURL: any;
  fileURLComapny: any;

  constructor(private router: Router,
              private userService: UserService,
              public fb: FormBuilder,
              private toastrService: ToastrService,
  ) {
    this.attributes = '';
    this.user = new User();
    this.userProfile = new User();
    this.ops = [];

  }

  get f() {
    return this.passwordForm.controls;
  }

  public user: User;
  userId: string;
  public value = '';
  public oldPassword = '';
  passwordForm: FormGroup;


  private ops: Op[];

  userForm = new FormGroup({
    lastName: new FormControl(null),
    firstName: new FormControl(null),
    userPhone: new FormControl(null),
    userAddress: new FormControl(null),
    username: new FormControl(null),
  });


  ngOnInit() {
    this.getEmail();


    this.createForm();

  }

  getEmail() {
    Auth.currentUserInfo().then((data: any) => {
      this.user = data;
      this.attributes = data.attributes;
      this.testmail = data.attributes.email;
      this.userService.loadUserByEmail(this.testmail).then((data: any) => {

        this.user = data.result[0];
        this.getComptePicture();
        this.getCompanyPicture();
        this.stat(this.user);

        console.log(this.user)
      });

    })
  }

  createForm() {
    this.passwordForm = this.fb.group({
      confirmPassword: [''],
      oldPassword: [''],
      newPassword: ['']
    });
  }

  stat(user:User){
    if(user.status=='new'){
      this.toastrService.info('veuillez completez les informations de votre profile')
    }
  }
  updatefirstName(str: string) {
    return Auth.currentAuthenticatedUser().then(user => {
      return Auth.updateUserAttributes(user, {name: str}).catch(err => console.log(err))

    }).then(() => {

      this.userProfile.username = this.user.username;
      this.userProfile.userAddress = this.user.userAddress;
      this.userProfile.firstName = str;
      this.userProfile.email = this.user.email;
      this.userProfile.userPhone = this.user.userPhone;
      this.userProfile.lastName = this.user.lastName;
      this.userProfile.status='old';

      this.userService.modifierUser(this.user.id, this.userProfile)
    })
  }

  updatelastName(str: string) {

    this.userProfile.username = this.user.username;
    this.userProfile.userAddress = this.user.userAddress;
    this.userProfile.lastName = str;
    this.userProfile.email = this.user.email;
    this.userProfile.userPhone = this.user.userPhone;
    this.userProfile.firstName = this.user.firstName;
    this.userProfile.status='old';

    this.userService.modifierUser(this.user.id, this.userProfile)
  }

  updateUserPhone(str: string) {

    console.log(this.user)

    this.userProfile.firstName = this.user.firstName;
    this.userProfile.userAddress = this.user.userAddress;
    this.userProfile.username = this.user.username;
    this.userProfile.email = this.user.email;
    this.userProfile.userPhone = str;
    this.userProfile.lastName = this.user.lastName;
    this.userProfile.status='old';
    console.log(this.userProfile)
    this.userService.modifierUser(this.user.id, this.userProfile).then(() => {
    })


  }

  updateUserAddress(str: string) {
    this.userProfile.firstName = this.user.firstName;
    this.userProfile.userAddress = this.user.userAddress;
    this.userProfile.username = this.user.username;
    this.userProfile.email = this.user.email;
    this.userProfile.userPhone = str;
    this.userProfile.lastName = this.user.lastName;
    this.userProfile.status='old';
    console.log(this.userProfile)
    this.userService.modifierUser(this.user.id, this.userProfile)

  }

  updateUserName(str: string) {


  }


  updatePassword() {
    return Auth.currentAuthenticatedUser().then(user => {
      return Auth.changePassword(user, this.passwordForm.value.oldPassword, this.passwordForm.value.newPassword);

      this.resetForm();
      console.log('changePassword:', user)
    }).catch(err => {
      console.log(err)
    });

  }

  resetForm() {
    this.passwordForm = this.fb.group({
      id: [],
      oldPassword: ['', Validators.required],
      userPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }


  updateCompteFile(event) {
    console.log(this.file)

    this.onSelectFile(event).then(() => {
      this.uploadPicture(this.user.username + '/' + 'ComptePicture/' + 'comptePicture', this.file)
    })
  }

  updateCampanyFile(event) {
    console.log(this.file2)

    this.onSelectFileCompany(event).then(() => {
      console.log(this.url2)
      this.uploadPicture(this.user.username + '/' + 'CompanyPicture/' + 'CompanyPicture', this.file2)
    })
  }


  getComptePicture() {
    Storage.get(this.user.username + '/' + 'ComptePicture/' + 'comptePicture',
      {
        level: 'public'
      }).then((data) => {
      this.fileURL = data;
      console.log(this.fileURL);
    }).catch(e => {
      console.log(e, 'error fetching image')
    });
  }

  getCompanyPicture() {
    Storage.get(this.user.username + '/' + 'CompanyPicture/' + 'CompanyPicture',
      {
        level: 'public'
      }).then((data) => {
      this.fileURLComapny = data;
      console.log(this.fileURLComapny);
    }).catch(e => {
      console.log(e, 'error fetching image')
    });
  }


  uploadPicture(fileName, file) {
    Storage.put(fileName, file, {
      level: 'public'

    })
      .then(result => console.log(result))
      .then(() => {
        this.toastrService.info('Mon Compte image est mis à jour')
      })
      .catch(err => console.log(err));
  }

  onSelectFile(event) {

    return new Promise<any>((resolve, reject) => {

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
      resolve(this.file)
    })

  }

  onSelectFileCompany(event) {

    return new Promise<any>((resolve, reject) => {

      if (event.target.files && event.target.files[0]) {
        this.filename = event.target.files[0].name;
        this.file2 = event.target.files[0];
        var reader = new FileReader();
        this.fileExtention = event.target.files[0].type;
        if (event.target.files[0].type === "application/pdf") {
          this.type = false;
          console.log(this.type)
        }
        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
          console.log(this.url2)

          this.url2 = event.target.result;
        }
      }
      resolve(this.file2)
    })

  }

}
