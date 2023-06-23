import {Component, Inject, OnInit} from '@angular/core';
import {Partenaire} from "../../../core/models/Partenaire";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PartnersService} from "../../../core/services/partners.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modifier-partner',
  templateUrl: './modifier-partner.component.html',
  styleUrls: ['./modifier-partner.component.scss']
})
export class ModifierPartnerComponent implements OnInit {
  partner: Partenaire;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any
    , private toastr: ToastrService, private partnersService: PartnersService,
              public dialogRef: MatDialogRef<ModifierPartnerComponent>,) {
  }

  ngOnInit(): void {
    this.partner = this.data.partner;
    this.createForm();

  }


  createForm() {
    this.editForm = this.formBuilder.group({
      partenaireNom: [this.partner.partenaireNom, ''],
      partenairePrenom: [this.partner.partenairePrenom, ''],
      partenairePhone: [this.partner.partenairePhone, ''],
      partenaireEmail: [this.partner.partenaireEmail, Validators.required],
      partenaireCivility: [this.partner.partenaireCivility, ''],
      partenaireAddress: [this.partner.partenaireAddress, Validators.required],
      partenaireEstablishment: [this.partner.partenaireEstablishment, Validators.required],
      partenaireSiren: [this.partner.partenaireSiren, Validators.required],
      partenaireServiceName: [this.partner.partenaireServiceName, Validators.required],
      address2: [this.partner.address2, Validators.required],
      address3: [this.partner.address3, Validators.required],
      codePostal: [this.partner.codePostal, Validators.required],
      ville: [this.partner.ville, Validators.required],
      partnerStatus: [this.partner.partnerStatus, Validators.required],
    });
  }

  onSubmit() {


    this.partner.partenaireNom = this.editForm.get('partenaireNom').value;
    this.partner.partenairePrenom = this.editForm.get('partenairePrenom').value;
    this.partner.partenairePhone = this.editForm.get('partenairePhone').value;
    this.partner.partenaireEmail = this.editForm.get('partenaireEmail').value;
    this.partner.partenaireCivility = this.editForm.get('partenaireCivility').value;
    this.partner.partenaireAddress = this.editForm.get('partenaireAddress').value;
    this.partner.partenaireEstablishment = this.editForm.get('partenaireEstablishment').value;
    this.partner.partenaireSiren = this.editForm.get('partenaireSiren').value;
    this.partner.partenaireServiceName = this.editForm.get('partenaireServiceName').value;
    this.partner.address2 = this.editForm.get('address2').value;
    this.partner.address3 = this.editForm.get('address3').value;
    this.partner.codePostal = this.editForm.get('codePostal').value;
    this.partner.ville = this.editForm.get('ville').value;
    this.partner.partnerStatus = this.editForm.get('partnerStatus').value;
    console.log(this.data)
    this.partnersService.updatePartner(this.partner).subscribe(() => {
      this.toastr.success("utilisateur modifié avec succes");
      this.ngOnInit();
      this.partner = new Partenaire();
      this.dialogRef.close();

    })
  }
}
