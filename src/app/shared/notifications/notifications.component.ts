import {Component, Input, OnInit} from '@angular/core';
import Auth from '@aws-amplify/auth';
import {User} from '../../core/models/User';
import {UserService} from '../../core/services/user.service';
import {NotificationsService} from '../../core/services/notifications.service';
import {Notification} from '../../core/models/Notification';
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() typeUser: string;
  public attributes: { email: string };
  userID: string;
  notifications: Notification[];
  notificationsNONLUS: Notification[];
  result: Notification[];
  numberofNotification: number;
  numberofNewNotification: number;
  newNotif = false;
  updatedNotification: Notification;
  overten: boolean = false;
  ShownNotification: Notification[];

  constructor(private userService: UserService,
              private notificationsService: NotificationsService,
              public router: Router) {
    this.notifications = [];
    this.ShownNotification = [];
    this.notificationsNONLUS = [];
    this.numberofNewNotification = 0;
    this.updatedNotification = new Notification();
    // setInterval(() => this.loadNotificationUser(localStorage.getItem('id')), 180000);
    // setInterval(() => this.checkNumber(), 180000);

  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('id');
    this.global()
  }

  global() {
    this.getuser().then(() => {
      this.loadNotificationUser(this.userID)
      this.checkNumber()
    })
  }

  loadNotificationUser(id: string) {
    this.notificationsService.getNotificationByUserID(id).then((data: any) => {

      this.notifications = data.result;
      this.numberofNotification = this.notifications.length;
      let i: number = 0;
      while (i < this.notifications.length) {
        if (this.notifications[i].status === 'NON_LUS') {
          this.notificationsNONLUS[i] = this.notifications[i];

        }
        i++;
      }
      this.result = this.notificationsNONLUS.filter(o => !Object.keys(o).every(k => !o[k]));
      for (let i=0  ;i<10;i++){
        this.ShownNotification[i]=this.result[i];
      }
      this.numberofNewNotification = this.result.length;
      this.checkNumber();
    });
  }

  checkNumber() {
    if (this.numberofNewNotification > 0) {
      this.newNotif = true;
      if(this.numberofNotification>10){
        this.overten = true

      }
      return this.newNotif;
    }
  }

  updateNotificationStauts(notification: Notification) {
    this.updatedNotification.title = notification.title;
    this.updatedNotification.objectID = notification.objectID;
    this.updatedNotification.typeNotification = notification.typeNotification;
    this.updatedNotification.date = notification.date;
    this.updatedNotification.messageID = notification.messageID;
    this.updatedNotification.userID = notification.userID;
    this.updatedNotification.status = 'LUS';
    this.notificationsService.updateNotificationStatus(notification.id, this.updatedNotification).then(() => {
      this.loadNotificationUser(this.userID);
    }).catch((err) => {
      console.log(err);
    });
  }

  getuser() {
    return new Promise(resolve => {
      this.userService.loadUserByEmail(localStorage.getItem('emailUser')).then((data: any) => {
        this.userID = data.result[0].id
        resolve(this.userID)
      })
      return (this.userID)
    })

  }

}
