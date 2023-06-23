import {Component, OnInit} from '@angular/core';
import {Notification} from "../../../core/models/Notification";
import {UserService} from "../../../core/services/user.service";
import {NotificationsService} from "../../../core/services/notifications.service";
import {not} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-see-all-notifications',
  templateUrl: './see-all-notifications.component.html',
  styleUrls: ['./see-all-notifications.component.scss']
})
export class SeeAllNotificationsComponent implements OnInit {

  notifications: Notification[];
  numberofNotification: number;
  userID: string;
  notificationsNONARCHIVE: Notification[];
  archived: Notification;

  constructor(private userService: UserService,
              private notificationsService: NotificationsService) {
    this.notifications = [];
    this.notificationsNONARCHIVE = [];
    this.archived = new Notification();
  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('id');
    this.loadNotificationUser(this.userID);

  }


  loadNotificationUser(id: string) {
    this.notificationsService.getNotificationByUserID(id).then((data: any) => {

      this.notifications = data.result;
      this.notifications.sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0));
      for(let i=0;i<this.notifications.length;i++){
        if(this.notifications[i].status!="ARCHIVES")
          this.notificationsNONARCHIVE[i]=this.notifications[i];
      }
      console.log(this.notificationsNONARCHIVE)

      this.numberofNotification = this.notifications.length;
    });
  }

  archiverNotification(notif: Notification) {
    this.archived.date = notif.date;
    this.archived.messageID = notif.messageID;
    this.archived.title = notif.title;
    this.archived.userID = notif.userID;
    this.archived.objectID = notif.objectID;
    this.archived.typeNotification = notif.typeNotification;
    this.archived.status = "ARCHIVES";
    this.notificationsService.updateNotificationStatus(notif.id, this.archived).then(() => {
      this.loadNotificationUser(this.userID)
    })

  }
}
