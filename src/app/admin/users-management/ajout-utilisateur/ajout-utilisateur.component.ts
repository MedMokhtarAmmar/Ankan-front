import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/User";
import {UserService} from "../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.scss']
})
export class AjoutUtilisateurComponent implements OnInit {

  ajoutForm: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private userservice: UserService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<AjoutUtilisateurComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = new User();

  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.ajoutForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      email: ['', Validators.required],
      userAddress: [''],
      userPhone: ['', Validators.required],
    });
  }

  onSubmit() {
    this.user.firstName = this.ajoutForm.get('firstName').value;
    this.user.lastName = this.ajoutForm.get('lastName').value;
    this.user.username = this.ajoutForm.get('username').value;
    this.user.email = this.ajoutForm.get('email').value;
    this.user.userAddress = this.ajoutForm.get('userAddress').value;
    this.user.userPhone = this.ajoutForm.get('userPhone').value.toString();
    this.userservice.ajoutUser(this.user).then(() => {
      this.toastr.success("utilisateur ajouté avec succes");
      this.ngOnInit();
      this.user = new User();
      this.dialogRef.close();

    }).catch(err=>{
      this.toastr.error("Merci de verfier les coordonnées de l'utilisateur")
    })
  }
}
