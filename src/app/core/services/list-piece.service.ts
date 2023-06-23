import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ListPiece} from "../models/listPiece";

@Injectable({
  providedIn: 'root'
})
export class ListPieceService {

  public LIST_URL = `listPiece/`;

  constructor(private http: HttpClient) {
  }

  public getListes(page: number, perPage: number) {
    return this.http.get(this.LIST_URL + '?page=' + page + '&perpage=' + perPage);
  }

  public postList(listPiece: ListPiece) {
    return this.http.post(this.LIST_URL, listPiece).toPromise();
  }

  deleteListPiece(listID: string) {
    return this.http.delete<any>(this.LIST_URL + listID);
  }

  modifierListPiece(id: string, liste: ListPiece) {
    return this.http.put<ListPiece>(this.LIST_URL + id, liste);
  }

  getListPiece(id: any) {
    return this.http.get<ListPiece>(this.LIST_URL + id);
  }

  getListePiecesbyName(listName: string) {
    let params = new HttpParams();
    params = params.append("listName", listName);
    return this.http.get(this.LIST_URL, {params: params}).toPromise();
  }
}
