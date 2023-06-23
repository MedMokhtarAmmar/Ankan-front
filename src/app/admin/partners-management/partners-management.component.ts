import {Component, OnInit} from '@angular/core';
import {PartnersService} from "../../core/services/partners.service";
import {Partenaire} from "../../core/models/Partenaire";
import {User} from "../../core/models/User";
import {ModifierUtilisateurComponent} from "../users-management/modifier-utilisateur/modifier-utilisateur.component";
import {MatDialog} from "@angular/material/dialog";
import {DetailsPartenaireComponent} from "./details-partenaire/details-partenaire.component";
import {AjoutUtilisateurComponent} from "../users-management/ajout-utilisateur/ajout-utilisateur.component";
import {AjoutPartenaireComponent} from "./ajout-partenaire/ajout-partenaire.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-partners-management',
  templateUrl: './partners-management.component.html',
  styleUrls: ['./partners-management.component.scss']
})
export class PartnersManagementComponent implements OnInit {
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
      console.log(this.partenaires)
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

  initSelectedPartner() {
    this.selectedPartenaire = new Partenaire();
  }
  openDialogAjoutUser() {
    const dialogRef = this.dialog.open(AjoutPartenaireComponent, {
      width: '750px',
      data: {}
    }).afterClosed().subscribe((res: any) => {
      this.getallPartners(this.page, this.perPage);
      close()
    });
  }

  supprimerPartner(partner:Partenaire){
    this.partenaireService.deletePartner(partner.id).subscribe(()=>
    {
      this.toastrService.info("Partenaire " +partner.partenaireNom +" "+ partner.partenairePrenom +" supprimé")
      this.ngOnInit();
    })
  }
  modifyPartner(partner:Partenaire){}
}
