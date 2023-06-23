import { Component, OnInit } from '@angular/core';
import {Partenaire} from "../../../core/models/Partenaire";
import {MatDialog} from "@angular/material/dialog";
import {PartnersService} from "../../../core/services/partners.service";
import {DetailsPartenaireComponent} from "../../../admin/partners-management/details-partenaire/details-partenaire.component";
import {AjoutPartenaireComponent} from "../../../admin/partners-management/ajout-partenaire/ajout-partenaire.component";
import {PartnerDetailsComponent} from "./partner-details/partner-details.component";
import {PartnerAddComponent} from "./partner-add/partner-add.component";

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {

  public partenaires: Partenaire[];
  public page = 1;
  public perPage = 5;
  public precedent: boolean;
  public suivant: boolean;
  public selectedPartenaire: Partenaire;

  constructor(public dialog: MatDialog, private partenaireService: PartnersService) {
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

    const dialogRef = this.dialog.open(PartnerDetailsComponent, {
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
  openDialogAddPartner() {
    const dialogRef = this.dialog.open(PartnerAddComponent, {
      width: '750px',
      data: {}
    }).afterClosed().subscribe((res: any) => {
      this.getallPartners(this.page, this.perPage);
    });
  }

}
