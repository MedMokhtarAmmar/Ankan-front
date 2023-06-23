import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/User";
import {UserService} from "../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.scss']
})
export class ModifierUtilisateurComponent implements OnInit {
  editForm: FormGroup;

  user: User;

  public utilisateur: User;


  constructor(private formBuilder: FormBuilder,
              private userservice: UserService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<ModifierUtilisateurComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.user = this.data.user;
  }

  ngOnInit(): void {
    this.createForm();
    this.getuser(this.user);
    console.log(this.data.user)
  }

  getuser(user: User) {
    this.userservice.getUser(user.id).then((res: any) => {
      this.utilisateur = res;
      console.log(this.utilisateur)
    })
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      firstName: [this.user.firstName,''],
      lastName: [this.user.lastName,''],
      username: [this.user.username,''],
      email: [this.user.email, Validators.required],
      userAddress: [this.user.userAddress,''],
      userPhone: [this.user.userPhone, Validators.required],
    });
  }

  onSubmit() {


    this.user.firstName = this.editForm.get('firstName').value;
    this.user.lastName = this.editForm.get('lastName').value;
    this.user.username = this.editForm.get('username').value;
    this.user.email = this.editForm.get('email').value;
    this.user.userAddress = this.editForm.get('userAddress').value;
    this.user.userPhone = this.editForm.get('userPhone').value;
    console.log(this.data)
    this.userservice.modifierUser(this.data.user.id,this.user).then(() => {
      this.toastr.success("utilisateur modifié avec succes");
      this.ngOnInit();
      this.user = new User();
      this.dialogRef.close();

    }).catch(err => {
      this.toastr.error("Merci de verfier les coordonnées de l'utilisateur")
    })
  }

}
