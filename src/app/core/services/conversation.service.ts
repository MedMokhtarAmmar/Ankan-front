import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Message} from "../models/Message";
import {Conversation} from "../models/Conversation";


@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  public CONVERSATION_URL = `conversation/`;

  constructor(private http: HttpClient) {
  }
  AjouterConversation(conversation: Conversation) {
    return this.http.post(this.CONVERSATION_URL, conversation).toPromise();
  }
  getConversationbyProjectID(projectID: string) {
    let params = new HttpParams();
    params = params.append('projetID', projectID);
    return this.http.get(this.CONVERSATION_URL, {params: params}).toPromise();
  }
  getConversationbyPieceID(projetPieceID: string) {
    let params = new HttpParams();
    params = params.append('projetPieceID', projetPieceID);
    return this.http.get(this.CONVERSATION_URL, {params: params}).toPromise();
  }


}
