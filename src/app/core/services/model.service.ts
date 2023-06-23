import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Model} from "../models/Model";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  public MODEL_URL = `modeles/`;


  constructor(private http: HttpClient) { }

  public getModeles(page: number, perPage: number) {
    return this.http.get(this.MODEL_URL + '?page=' + page + '&perpage=' + perPage);
  }
  public postModel(model: Model) {
    return this.http.post(this.MODEL_URL, model).toPromise();
  }
  deleteModele(modeleID: string) {
    return this.http.delete<any>(this.MODEL_URL + modeleID);
  }
  modifierModel(id: string, modele: Model) {
    return this.http.put<Model>(this.MODEL_URL + id, modele);
  }
  getModel(id: any) {
    return this.http.get<Model>(this.MODEL_URL + id);
  }

  getModelsByName(modelName : string){
    let params = new HttpParams();
    params = params.append("modelName" , modelName);
    return this.http.get(this.MODEL_URL ,{params:params}).toPromise();
  }
}
