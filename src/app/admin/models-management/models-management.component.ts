import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ModelService} from "../../core/services/model.service";
import {Model} from "../../core/models/Model";
import {Partenaire} from "../../core/models/Partenaire";
import {mod} from "ngx-bootstrap/chronos/utils";
import {AjoutPartenaireComponent} from "../partners-management/ajout-partenaire/ajout-partenaire.component";
import {AjoutModeleComponent} from "./ajout-modele/ajout-modele.component";

@Component({
  selector: 'app-models-management',
  templateUrl: './models-management.component.html',
  styleUrls: ['./models-management.component.scss']
})
export class ModelsManagementComponent implements OnInit {
  modeles: Model[];
  public page = 1;
  public perPage = 5;
  public precedent: boolean;
  public suivant: boolean;

  constructor(public dialog: MatDialog, private modelService: ModelService, private toastrService: ToastrService) {
    this.modeles = [];
  }

  ngOnInit(): void {
    this.getallModels(this.page, this.perPage)
  }

  getallModels(page: number, perpage: number) {
    this.modelService.getModeles(page, perpage).subscribe((data: any) => {
      this.modeles = data
      console.log(data)
    })
  }




  nextPage() {
    if (this.suivant) {
      this.page = this.page + 1;
      this.getallModels(this.page, this.perPage);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getallModels(this.page, this.perPage);
    } else {
    }
  }


  firstPage() {
    this.getallModels(1, this.perPage);
    if (this.modeles.length === this.perPage) {
      this.suivant = true;
    } else {
      this.suivant = false;
    }
    this.page = 1;
  }

  optionOne() {
    this.perPage = 5;
    this.page = 1;
    this.getallModels(this.page, 5);

  }

  optionTwo() {
    this.perPage = 10;
    this.page = 1;
    this.getallModels(this.page, 10);

  }

  optionThree() {
    this.perPage = 20;
    this.page = 1;
    this.getallModels(this.page, 20);

  }

  supprimerModel(modele:Model){
    this.modelService.deleteModele(modele.id).subscribe(()=>
    {
      this.toastrService.info("Modele " +modele.modelName  +" supprimé")
      this.ngOnInit();
    })
  }

  modifierModel(modele:Model){

  }
  openDialogAjoutModel() {
    const dialogRef = this.dialog.open(AjoutModeleComponent, {
      width: '750px',
      data: {}
    }).afterClosed().subscribe((res: any) => {
      this.getallModels(this.page, this.perPage);
    });
  }
}
