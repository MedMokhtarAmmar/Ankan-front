import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../core/models/Categorie";
import {UserService} from "../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../core/services/categorie.service";
import {User} from "../../../core/models/User";

@Component({
  selector: 'app-modifier-categorie',
  templateUrl: './modifier-categorie.component.html',
  styleUrls: ['./modifier-categorie.component.scss']
})
export class ModifierCategorieComponent implements OnInit {
  editForm: FormGroup;
  categorie: Categorie;
  newCategorie:Categorie;

  constructor(private formBuilder: FormBuilder,
              private categorieService: CategorieService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<ModifierCategorieComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.categorie = this.data.categorie;
    this.newCategorie=new Categorie();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      libelle: [this.categorie.libelle, Validators.required],
      description: [this.categorie.description, Validators.required],

    });
  }

  onSubmit() {


    this.newCategorie.libelle = this.editForm.get('libelle').value;
    this.newCategorie.description = this.editForm.get('description').value;
    this.categorieService.modifierCategorie(this.data.categorie.id, this.newCategorie).then(() => {
      this.toastr.success("catégorie modifiée avec succes");
      this.ngOnInit();
      this.categorie = new Categorie();
      this.dialogRef.close();

    }).catch(err => {
      this.toastr.error("Merci de verfier les coordonnées de cette categorie")
    })
  }
}
