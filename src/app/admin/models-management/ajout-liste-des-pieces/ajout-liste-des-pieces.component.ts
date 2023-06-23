import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ListPieceService} from "../../../core/services/list-piece.service";
import {ModelService} from "../../../core/services/model.service";
import {Model} from "../../../core/models/Model";
import {ListPiece} from "../../../core/models/listPiece";

@Component({
  selector: 'app-ajout-liste-des-pieces',
  templateUrl: './ajout-liste-des-pieces.component.html',
  styleUrls: ['./ajout-liste-des-pieces.component.scss']
})
export class AjoutListeDesPiecesComponent implements OnInit {


  // maps the local data column to fields property
  public localFields: Object = {text: 'modelName', value: 'modelName'};
  // set the placeholder to MultiSelect Dropdown input element
  public localWaterMark: string = 'Select pieces';
  public value: string[] = ['AU'];
  models: Model[];
  listName: string;
  description: string;
  selectedModel: string[];
  newList: ListPiece;


  constructor(private toastr: ToastrService,
              private listePieceService: ListPieceService,
              private modelService: ModelService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AjoutListeDesPiecesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedModel = [];
    this.newList = new ListPiece();

  }

  ngOnInit(): void {
    this.getAllModels(1, 20)
  }


  getAllModels(page: number, perpage: number) {
    this.modelService.getModeles(page, perpage).subscribe((data: any) => {
      this.models = data;
      console.log(this.models)
    })
  }

  getModels(selectedlist: string[]) {

    for (let i = 0; i < selectedlist.length; i++) {
      this.modelService.getModelsByName(selectedlist[i]).then((data: any) => {
        this.selectedModel[i] = data.result[0].id


      })
    }
    return this.selectedModel
  }

  chargerlist() {
    this.getModels(this.value);
  }

  async ajouterListPiece() {

    if (this.listName.length < 2 || this.description.length < 2 || this.selectedModel.length < 1) {
      this.toastr.warning('verifier vos parametres d\'entré');
    } else {
      this.newList = new ListPiece();
      this.newList.listName = this.listName;
      this.newList.description = this.description
      this.newList.models = this.selectedModel
      await this.listePieceService.postList(this.newList).then(() => {
        this.toastr.info("list ajoutée avc success")
      }).then(() => {
        this.dialogRef.close()
      })

    }
  }


}
