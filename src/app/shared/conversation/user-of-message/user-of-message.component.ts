import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../core/models/Message';
import {MessageService} from "../../../core/services/message.service";
import {User} from "../../../core/models/User";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-user-of-message',
  templateUrl: './user-of-message.component.html',
  styleUrls: ['./user-of-message.component.scss']
})
export class UserOfMessageComponent implements OnInit {
  @Input() message: Message;
  user: User;

  constructor(private userService: UserService) {
    this.message = new Message();
    this.user = new User();

  }

  ngOnInit(): void {
    this. getSenderPerMesasge();
  }

  getSenderPerMesasge() {
    return new Promise<any>((resolve, reject) => {
      this.userService.getUser(this.message.senderID).then((data: any) => {
        this.user = data.result;
        resolve(this.user);
        return this.user;
      })
    })
  }
}
