import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListPieceService} from "../../../../core/services/list-piece.service";
import {ListPiece} from "../../../../core/models/listPiece";
import {ModelService} from "../../../../core/services/model.service";
import {Model} from "../../../../core/models/Model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modifier-list-piece',
  templateUrl: './modifier-list-piece.component.html',
  styleUrls: ['./modifier-list-piece.component.scss']
})
export class ModifierListPieceComponent implements OnInit {
  idList: string;
  list: ListPiece;
  modelsID: string[];
  models: Model[];
  listName: string ="";
  description: string="";
  public localFields: Object = {text: 'modelName', value: 'modelName'};
  // set the placeholder to MultiSelect Dropdown input element
  public localWaterMark: string = 'Selectionner les Piéces à ajouter dans cette liste ';
  public value: string[];
  allmodels: Model[];
  selectedModel: string[];
  check: boolean = false;
  newList: ListPiece;


  constructor(private  route: ActivatedRoute,
              private listPieceService: ListPieceService,
              private modelService: ModelService,
              private toastr: ToastrService,) {
    this.idList = route.snapshot.params.id;
    this.modelsID = [];
    this.models = [];
    this.value = ["AU"];
    this.selectedModel = [];

  }

  ngOnInit(): void {
    this.getAllModels(1, 20)
    this.global(this.idList)
  }


  global(id: string) {
    this.getList(id).then(() => {

      this.getmodels(this.modelsID)
    })
  }

  getList(idList: string) {
    return new Promise(resolve => {
      this.listPieceService.getListPiece(idList).subscribe((data: any) => {
        this.list = data.result;
        this.modelsID = this.list.models;
        this.listName = data.result.listName;
        this.description = data.result.description;

        resolve(this.modelsID)
      });
      return this.modelsID
    })

  }

  getmodels(modelID: string[]) {
    for (let i = 0; i < modelID.length; i++) {
      this.modelService.getModel(modelID[i]).subscribe((data: any) => {

        this.models[i] = data.result

      })
    }
    console.log(this.models)
    console.log(this.value)

  }

  chargerlist() {
    this.check = true;
    console.log(this.value)
    for (let i = 0; i < this.value.length; i++) {
      this.modelService.getModelsByName(this.value[i]).then((data: any) => {
        this.selectedModel[i] = data.result[0].id
      })
    }
    return this.selectedModel
  }

  getAllModels(page: number, perpage: number) {
    this.modelService.getModeles(page, perpage).subscribe((data: any) => {
      this.allmodels = data;
      console.log(this.allmodels)
    })
  }

  async modifierListPiece() {


    if (this.listName.length < 2 || this.description.length < 2 || this.selectedModel.length < 1) {
      console.log(this.selectedModel)

      this.toastr.warning('verifier vos parametres d\'entré');
    } else {
      this.newList = new ListPiece();
      this.newList.listName = this.listName;
      this.newList.description = this.description
      this.newList.models = this.selectedModel
      console.log(this.selectedModel)
      this.models=[]
      await this.listPieceService.modifierListPiece(this.idList, this.newList).subscribe(() => {
        this.toastr.info("list modifiée avc success")
        this.global(this.idList)
        this.selectedModel=[]
      })
      console.log(this.value)

      console.log(this.selectedModel)
    }


  }
}
