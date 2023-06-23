
import {Component, OnInit} from '@angular/core';

import {ToastrService} from "ngx-toastr";
import {Partenaire} from "../../../core/models/Partenaire";
import {MatDialog} from "@angular/material/dialog";
import {PartnersService} from "../../../core/services/partners.service";
import {DetailsPartenaireComponent} from "../details-partenaire/details-partenaire.component";
import {AjoutPartenaireComponent} from "../ajout-partenaire/ajout-partenaire.component";
import {ConfirmationComponenetComponent} from "../../users-management/confirmation-componenet/confirmation-componenet.component";
import {ConfirmationComponentComponent} from "./confirmation-component/confirmation-component.component";
import {ModifierPartnerComponent} from "../modifier-partner/modifier-partner.component";

@Component({
  selector: 'app-non-confirmed-partners',
  templateUrl: './non-confirmed-partners.component.html',
  styleUrls: ['./non-confirmed-partners.component.scss']
})
export class NonConfirmedPartnersComponent implements OnInit {
  public partenaires: Partenaire[];
  public page = 1;
  public perPage = 5;
  public precedent: boolean;
  public suivant: boolean;
  public selectedPartenaire: Partenaire;

  constructor(public dialog: MatDialog, private partenaireService: PartnersService, private toastrService:ToastrService) {
    this.partenaires = [];
  }

  ngOnInit(): void {
    this.getallPartners(this.page, this.perPage);
  }

  getallPartners(page: number, perpage: number) {
    this.partenaireService.getPartners(page, perpage).subscribe((data: any) => {
      this.partenaires = data
      console.log(data)
    })
  }


  nextPage() {
    if (this.suivant) {
      this.page = this.page + 1;
      this.getallPartners(this.page, this.perPage);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getallPartners(this.page, this.perPage);
    } else {
    }
  }


  firstPage() {
    this.getallPartners(1, this.perPage);
    if (this.partenaires.length === this.perPage) {
      this.suivant = true;
    } else {
      this.suivant = false;
    }
    this.page = 1;
  }

  optionOne() {
    this.perPage = 5;
    this.page = 1;
    this.getallPartners(this.page, 5);

  }

  optionTwo() {
    this.perPage = 10;
    this.page = 1;
    this.getallPartners(this.page, 10);

  }

  optionThree() {
    this.perPage = 20;
    this.page = 1;
    this.getallPartners(this.page, 20);

  }

  openDialogDetailsPartenaire(partenaire: Partenaire) {
    this.selectedPartenaire = partenaire;

    const dialogRef = this.dialog.open(DetailsPartenaireComponent, {
      width: '800px',

      data: {partner: this.selectedPartenaire}

    }).afterClosed().subscribe(res => {
      this.initSelectedPartner();
      this.getallPartners(this.page, this.perPage);
    });

  }
  openDialogModifierPartenaire(partenaire: Partenaire) {
    this.selectedPartenaire = partenaire;

    const dialogRef = this.dialog.open(ModifierPartnerComponent, {
      width: '800px',

      data: {partner: this.selectedPartenaire}

    }).afterClosed().subscribe(res => {
      this.initSelectedPartner();
      this.getallPartners(this.page, this.perPage);
    });

  }

  initSelectedPartner() {
    this.selectedPartenaire = new Partenaire();
  }
  openDialogAjoutUser() {
    const dialogRef = this.dialog.open(AjoutPartenaireComponent, {
      width: '750px',
      data: {}
    }).afterClosed().subscribe((res: any) => {
      this.getallPartners(this.page, this.perPage);
    });
  }

  supprimerPartner(partner:Partenaire){
    this.partenaireService.deletePartner(partner.id).subscribe(()=>
    {
      this.toastrService.info("Partenaire " +partner.partenaireNom +" "+ partner.partenairePrenom +" supprimé")
      this.ngOnInit();
    })
  }

  OpenDialogConfirmation(partner:Partenaire)
    {
      this.selectedPartenaire = partner;
      const dialogRef = this.dialog.open(ConfirmationComponentComponent, {
        width: '750px',
        data: {partenaire: this.selectedPartenaire}

      }).afterClosed().subscribe(res => {
        this.initSelectedPartner();
        this.getallPartners(this.page, this.perPage);
      });
  }
}
