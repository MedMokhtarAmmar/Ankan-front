import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Model} from "../../../core/models/Model";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ModelService} from "../../../core/services/model.service";
import {CategorieService} from "../../../core/services/categorie.service";
import {Categorie} from "../../../core/models/Categorie";
import {Piece} from "../../../core/models/Piece";
import {Storage} from "aws-amplify";

@Component({
  selector: 'app-ajout-modele',
  templateUrl: './ajout-modele.component.html',
  styleUrls: ['./ajout-modele.component.scss']
})
export class AjoutModeleComponent implements OnInit {
  ajoutForm: FormGroup;
  modele: Model;
  public categories: Categorie[];
  public selectedCategorie: any;
  public modelName: string;
  public description: string;
  public newModel: Model;
  public filename: any;
  private file: any;
  private fileExtention: string;
  url: string | ArrayBuffer;
  type: boolean;

  constructor(private formBuilder: FormBuilder,
              private modeleService: ModelService,
              private categorieService: CategorieService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<AjoutModeleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modele= new Model();
    this.categories = [];

  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categorieService.getCategories(1, 25).subscribe((data: any) => {
      this.categories = data;
    });
  }
  selectCategorie(categorieId: any) {
    this.selectedCategorie = categorieId;
  }


  ajouterModele() {

    if (this.modelName.length < 2 || this.description.length < 2 || this.selectedCategorie === undefined || this.url === undefined ) {
      this.toastr.warning('verifier vos parametres d\'entré');
    } else {
      this.modele = new Model();
      this.modele.categorieID = this.selectedCategorie;
      this.modele.modelName = this.modelName;
      this.modele.description = this.description;

      this.modele.modelPiece= 'modeles'+ '/'+this.modelName  + '/' +this.filename ;


      this.modeleService.postModel(this.modele).then((data: any) => {
        this.newModel = data
        this.toastr.success('modéle enrigestré avec succes');

      }).then(()=>{


        this.uploadModele('modeles'+'/'+this.modelName  + '/' +this.filename, this.file);
      }).finally(()=>{
        this.dialogRef.close()
      });
    }
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.filename = event.target.files[0].name;

      this.file = event.target.files[0];
      var reader = new FileReader();
      this.fileExtention = event.target.files[0].type;
      if (event.target.files[0].type === "application/pdf") {
        this.type = false;
        console.log(this.type)
      }
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  uploadModele(fileName, file) {
    Storage.put(fileName, file, {
      level: 'public'

    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

}
