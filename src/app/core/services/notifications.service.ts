import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Piece} from '../models/Piece';
import {Notification} from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public NOTIFOCATION_URL = `notification/`;


  constructor(private http: HttpClient) {
  }

  public addNotification(notification: Notification) {
    return this.http.post(this.NOTIFOCATION_URL, notification).toPromise();
  }

  getNotificationByUserID(userID: string) {
    let params = new HttpParams();
    params = params.append('userID', userID);
    return this.http.get(this.NOTIFOCATION_URL, {params: params}).toPromise();
  }

  updateNotificationStatus(id: string, notification: Notification) {
    return this.http.put<Piece>(this.NOTIFOCATION_URL + id, notification).toPromise();
  }
}
