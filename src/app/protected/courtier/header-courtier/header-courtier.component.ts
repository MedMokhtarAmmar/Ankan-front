import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../../../core/services/authentification/token-storage.service";
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../core/models/User";
import Auth from "@aws-amplify/auth";
import {DataServiceService} from "../../../core/services/data-service.service";

@Component({
  selector: 'app-header-courtier',
  templateUrl: './header-courtier.component.html',
  styles: []
})
export class HeaderCourtierComponent implements OnInit {

  @Input() user: User;
  show: boolean;


  public attributes: { email: string };
  public testmail: string = '';
  typeUser: string = 'COURTIER';
  private message: boolean;


  constructor(private tokenStorage: TokenStorageService,
              public router: Router, private data: DataServiceService) {
    this.attributes = {email: ''};
    this.testmail = '';
    this.user = new User();
    //this.show = 'true';
  }

  ngOnInit() {
    this.initialiseUser();
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  initialiseUser() {
    Auth.currentUserInfo().then((data: any) => {
      this.user = data;
      this.attributes = data.attributes;
      this.testmail = data.attributes.email
    })
  }

  async logout() {
    await Auth.signOut()
      .then(data => {
        this.tokenStorage.signOut();
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err);
      });
  }

  showSide() {
    if (this.show === false) {
      this.data.HideShowSideBar(true);
      this.show=true

    } else {
      this.data.HideShowSideBar(false);
      this.show=false

    }


  }


}
