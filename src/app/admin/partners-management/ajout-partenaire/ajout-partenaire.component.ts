import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Partenaire} from "../../../core/models/Partenaire";
import {PartnersService} from "../../../core/services/partners.service";

@Component({
  selector: 'app-ajout-partenaire',
  templateUrl: './ajout-partenaire.component.html',
  styleUrls: ['./ajout-partenaire.component.scss']
})
export class AjoutPartenaireComponent implements OnInit {
  addForm: FormGroup;
  partenaire: Partenaire;
  public page = 1;
  public perPage = 5;
  public suivant: boolean;
  public selectedPartenaire: Partenaire;

  constructor(private formBuilder: FormBuilder,
              private partenaireService: PartnersService,
              private toastr: ToastrService,
              public dialog: MatDialog,
  ) {
    this.partenaire = new Partenaire();

  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      partenaireNom: [ ''],
      partenairePrenom: [ ''],
      partenaireAddress: [''],
      ville: [''],
      partenairePhone: [ ''],
      partenaireEmail: ['', Validators.required],
      address2: [''],
      address3: [''],
      codePostal: [''],
      partenaireCivility: ['', Validators.required],
      partenaireServiceName: [''],
      partenaireEstablishment: [''],
      partenaireSiren: [''],
    });
  }

  onSubmit() {
    this.partenaire.partenaireNom = this.addForm.get('partenaireNom').value;
    this.partenaire.partenairePrenom = this.addForm.get('partenairePrenom').value;
    this.partenaire.partenaireCivility = this.addForm.get('partenaireCivility').value;
    this.partenaire.partenaireEstablishment = this.addForm.get('partenaireEstablishment').value;
    this.partenaire.partenaireServiceName = this.addForm.get('partenaireServiceName').value;
    this.partenaire.partenairePhone = this.addForm.get('partenairePhone').value.toString();
    this.partenaire.partenaireSiren = this.addForm.get('partenaireSiren').value.toString();
    this.partenaire.partenaireAddress = this.addForm.get('partenaireAddress').value.toString();
    this.partenaire.address2 = this.addForm.get('address2').value.toString();
    this.partenaire.address3 = this.addForm.get('address3').value.toString();
    this.partenaire.ville = this.addForm.get('ville').value.toString();
    this.partenaire.partenaireEmail = this.addForm.get('partenaireEmail').value.toString();
    this.partenaire.codePostal = this.addForm.get('codePostal').value.toString();
    this.partenaire.partnerStatus="CONFIRME",
      this.partenaireService.ajoutPartner(this.partenaire).then(() => {
        this.toastr.success("Partenaire ajouté avec succes");
        this.ngOnInit();
        this.partenaire = new Partenaire();

      }).catch(err=>{
        this.toastr.error("Merci de verfier les coordonnées du Partenaire")
      })
  }

}
