import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {ConversationComponent} from './conversation/conversation.component';
import {UserOfMessageComponent} from './conversation/user-of-message/user-of-message.component';
import {NotificationsComponent} from './notifications/notifications.component';


@NgModule({
  declarations: [
    ConversationComponent,
    UserOfMessageComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      // positionClass: 'toast-bottom-right',
      // preventDuplicates: true,
    }),
    RouterModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConversationComponent,
    NotificationsComponent,


  ]
})
export class SharedModule {
  constructor() {}
}
