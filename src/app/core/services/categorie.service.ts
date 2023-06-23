import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Piece} from "../models/Piece";
import {Categorie} from "../models/Categorie";


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  public CATEGORIE_URL = `categoriePieces/`;

  constructor(private http: HttpClient) {
  }

  public getCategories(page: number, perPage: number) {
    return this.http.get(this.CATEGORIE_URL + '?page=' + page + '&perpage=' + perPage);
  }

  getCategorie(id: string) {
    return this.http.get<Piece>(this.CATEGORIE_URL + id);
  }
  ajoutCategorie(categorie:any){
    return this.http.post(this.CATEGORIE_URL,categorie).toPromise()
  }
  deleteCategorie(categorie:Categorie){
    return this.http.delete(this.CATEGORIE_URL+categorie.id)
  }
  modifierCategorie(id: string, categorie: Categorie) {
    return this.http.put<Categorie>(this.CATEGORIE_URL + id, categorie).toPromise()
  }
}
