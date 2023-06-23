import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../core/models/User';
import {TokenStorageService} from '../../../core/services/authentification/token-storage.service';
import {Router} from '@angular/router';
import Auth from '@aws-amplify/auth';
import {DataServiceService} from "../../../core/services/data-service.service";


@Component({

  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styles: [],

})
export class HeaderClientComponent implements OnInit {

  @Input() user: User;
  @Input() show: boolean;

  public attributes: { email: string };
  public testmail: string = '';
  typeUser: string = 'CLIENT';
  role: string = '';
  private message: boolean;


  constructor(private tokenStorage: TokenStorageService,
              public router: Router, private data: DataServiceService) {
    this.testmail = '';
    this.user = new User();
    this.show = false;
  }

  ngOnInit() {

    this.role = this.tokenStorage.getAuthorities();
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
      this.show = true

    } else {
      this.data.HideShowSideBar(false);
      this.show = false

    }
  }

}
