import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../core/models/Categorie";
import {User} from "../../../core/models/User";
import {CategorieService} from "../../../core/services/categorie.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.scss']
})
export class AjoutCategorieComponent implements OnInit {
  ajoutForm: FormGroup;
  categorie: Categorie;

  constructor(private toastr: ToastrService,
              private categorieService: CategorieService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AjoutCategorieComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.categorie = new Categorie();
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.ajoutForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],

    });
  }


  onSubmit() {
    this.categorie.libelle = this.ajoutForm.get('libelle').value;
    this.categorie.description = this.ajoutForm.get('description').value;

    this.categorieService.ajoutCategorie(this.categorie).then(() => {
      this.toastr.success("utilisateur ajouté avec succes");
      this.ngOnInit();
      this.categorie = new Categorie();
      this.dialogRef.close();

    }).catch(err => {
      this.toastr.error("Merci de verfier les coordonnées de l'utilisateur")
    })
  }
}
