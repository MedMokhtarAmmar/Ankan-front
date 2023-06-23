import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Piece} from "../models/Piece";


@Injectable({
  providedIn: 'root'
})
export class PieceService {

  public PIECE_URL = `pieces/`;

  constructor(private http: HttpClient) { }

  public getPieces(page: number, perPage: number) {
    return this.http.get(this.PIECE_URL + '?page=' + page + '&perpage=' + perPage);
  }
  public postPiece(piece: Piece) {
    return this.http.post(this.PIECE_URL, piece).toPromise();
  }

    deletePiece(pieceID: string) {
    return this.http.delete<any>(this.PIECE_URL + pieceID);
  }

  modifierPiece(id: string, piece: Piece) {
    return this.http.put<Piece>(this.PIECE_URL + id, piece);
  }
  getPiece(id: any) {
    return this.http.get<Piece>(this.PIECE_URL + id);
  }

  getPiecesbyProjectID(projectID : string){
    let params = new HttpParams();
    params = params.append("projetID" , projectID);
    return this.http.get(this.PIECE_URL ,{params:params}).toPromise();
  }

  getPiecesbyUploaderID(uploaderID : string){
    let params = new HttpParams();
    params = params.append("uploaderID" , uploaderID);
    return this.http.get(this.PIECE_URL ,{params:params});
  }

  getPiecesbyClientMailProjectID(clientID : string,projetID: string){
    let params = new HttpParams();
    //params = params.append("uploaderID" , uploaderID);
    return this.http.get(this.PIECE_URL +'?clientID='+clientID+'&projetID='+projetID);
  }

}
