import {Compiler, Component, OnInit} from '@angular/core';
import Auth from '@aws-amplify/auth';
import {TokenStorageService} from '../../core/services/authentification/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-project',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _compiler: Compiler,private tokenStorage: TokenStorageService,public router: Router) { }

  ngOnInit(): void {
  }
  async logout() {
    await Auth.signOut()
      .then(data => {
        this._compiler.clearCache();
        this.tokenStorage.signOut();
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
