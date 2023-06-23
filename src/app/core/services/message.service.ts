import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Project} from '../models/Project';
import {Message} from '../models/Message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public MESSAGE_URL = `message/`;

  constructor(private http: HttpClient) {
  }

  AjouterMessage(message: Message) {
    return this.http.post(this.MESSAGE_URL, message).toPromise();
  }

  getMessageByConversationID(conversationID: string) {
    let params = new HttpParams();
    params = params.append('conversationID', conversationID);
    return this.http.get(this.MESSAGE_URL, {params: params}).toPromise();
  }

  getMessageSender(senderID: string) {
    let params = new HttpParams();
    params = params.append('senderID', senderID);
    return this.http.get(this.MESSAGE_URL, {params: params}).toPromise();

  }
}
