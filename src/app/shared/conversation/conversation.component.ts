import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../../core/services/message.service';
import {Message} from '../../core/models/Message';
import {ConversationService} from '../../core/services/conversation.service';
import {Conversation} from '../../core/models/Conversation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import Auth from '@aws-amplify/auth';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/models/User';
import {NotificationsService} from "../../core/services/notifications.service";
import {Notification} from "../../core/models/Notification";


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;

  messages: Message[];
  conversation: Conversation;
  conversationID: string = '';
  user: User;
  idUploader: string;
newNotification:Notification;
  messageForm: FormGroup;
  message: Message;

  constructor(private conversationService: ConversationService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private messageService: MessageService,
              private userService: UserService,
              private notificationsService:NotificationsService) {
    this.message = new Message();
    this.newNotification=new Notification();
  }


  ngOnInit() {
    this.initialiseUser();
    this.createForm();
    this.global();
  }

  initialiseUser() {
    Auth.currentUserInfo().then((data: any) => {
      this.user = data;
      this.userService.loadUserByEmail(data.attributes.email).then((data: any) => {
        this.user = data;
        this.idUploader = data.result[0].id
      });


    })
  }

  global() {
    this.getConversationById().then(() => {
      this.getMessageConversation(this.conversation[0].id);
    });

  }


  getConversationById() {
    return new Promise<any>((resolve, reject) => {

      if (this.type === 'projet') {
        this.conversationService.getConversationbyProjectID(this.id).then((data: any) => {
          this.conversation = data.result;
          this.conversationID = this.conversation[0].id;
          resolve(this.conversation);


        });
        return this.conversation;

      } else if (this.type === 'piece') {
        this.conversationService.getConversationbyPieceID(this.id).then((data: any) => {
          this.conversation = data.result;
          this.conversationID = this.conversation[0].id;
          resolve(this.conversation);


        });
        return this.conversation;
        console.log('piece ');
      } else {
        console.log('document');
      }
    });
  }

  getMessageConversation(id: string) {
    this.messageService.getMessageByConversationID(id).then((data: any) => {
      this.messages = data.result;

    });
  }


  createNewConversation(conversation: Conversation) {
    this.conversationService.AjouterConversation(conversation)
  }


  createForm() {
    this.messageForm = this.formBuilder.group({
      messageText: ['', Validators.required],
      senderID: ['', Validators.required],
      conversationID: [''],
      duration: [''],

    });
  }


  onSubmit() {
    this.message.messageText = this.messageForm.get('messageText').value;

    this.message.conversationID = this.conversationID;
    this.message.duration = Date.now().toString();
    this.message.senderID = this.idUploader;

    this.messageService.AjouterMessage(this.message).then(() => {
      this.toastr.success('message ajouté avec succes');
      this.ngOnInit();
      this.message = new Message();

    }).catch(err => {
      this.toastr.error('Merci de verfier le message ajouté')
    });
  }


}
