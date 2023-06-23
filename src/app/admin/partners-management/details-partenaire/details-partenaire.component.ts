import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Partenaire} from "../../../core/models/Partenaire";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-details-partenaire',
  templateUrl: './details-partenaire.component.html',
  styleUrls: ['./details-partenaire.component.scss']
})
export class DetailsPartenaireComponent implements OnInit {
  public partenaire : Partenaire;
  public detailsForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DetailsPartenaireComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) {
    this.partenaire = this.data.partner;
  }

  ngOnInit(): void {
    this.createForm()
    console.log(this.partenaire)
  }


  createForm() {
    this.detailsForm = this.formBuilder.group({
      partenaireNom: [this.partenaire.partenaireNom, ''],
      partenairePrenom: [this.partenaire.partenairePrenom, ''],
      partenaireAddress: [this.partenaire.partenaireAddress, ''],
      ville: [this.partenaire.ville, Validators.required],
      partenairePhone: [this.partenaire.partenairePhone, ''],
      partenaireEmail: [this.partenaire.partenaireEmail, Validators.required],
      address2: [this.partenaire.address2, Validators.required],
      address3: [this.partenaire.address3, Validators.required],
      codePostal: [this.partenaire.codePostal, Validators.required],
      partenaireCivility: [this.partenaire.partenaireCivility, Validators.required],
      partenaireServiceName: [this.partenaire.partenaireServiceName, Validators.required],
      partenaireEstablishment: [this.partenaire.partenaireEstablishment, Validators.required],
      partenaireSiren: [this.partenaire.partenaireSiren, Validators.required],
    });
  }
}
