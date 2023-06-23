import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {Partenaire} from "../models/Partenaire";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  public PARTENAIRE_URL = `partenaire/`;

  constructor(private http: HttpClient) { }

  getPartners(page: number, perPage: number) {
    return this.http.get<Partenaire[]>(this.PARTENAIRE_URL + '?page=' + page + '&perpage=' + perPage);
  }
  ajoutPartner(partenaire: any) {
    return this.http.post(this.PARTENAIRE_URL, partenaire).toPromise()

  }
  deletePartner(partnerID: string) {
    return this.http.delete<any>(this.PARTENAIRE_URL + partnerID);
  }
  updatePartner(partenaire:Partenaire ){
    return this.http.put(this.PARTENAIRE_URL+partenaire.id, partenaire )
  }
}
