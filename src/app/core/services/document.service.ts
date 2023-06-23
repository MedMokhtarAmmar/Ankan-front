import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Document} from "../models/Document";


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public DOCUMENT_URL = `document/`;

  constructor(private http: HttpClient) {
  }


  ajoutDocument(document: any) {
    return this.http.post(this.DOCUMENT_URL, document).toPromise()

  }

  getDocument(id: string) {
    return this.http.get(this.DOCUMENT_URL + id)
  }

  getDocumentByPieceID(PieceID: string) {
    let params = new HttpParams();
    params = params.append("pieceID", PieceID);
    return this.http.get(this.DOCUMENT_URL, {params: params}).toPromise();
  }

  modifierDocument(id: string, document: Document) {
    return this.http.put<Document>(this.DOCUMENT_URL + id, document).toPromise()

  }
}
