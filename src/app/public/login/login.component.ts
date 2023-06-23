import {Compiler, Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../core/services/authentification/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {SignInData} from '../../core/models/SignInData';
import {AppInfoService} from "../../core/services/app-info.service";
import Auth from '@aws-amplify/auth';
import {AuthService} from "../../core/services/authentification/auth.service";
import {AmplifyService} from "aws-amplify-angular";
import {User} from "../../core/models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []

})
export class LoginComponent implements OnInit {
  public signInData: SignInData;
  version: string;
  username: '';
  password: '';
  user: User;
  admin: User;
  show: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private authservice: AuthService,
    private toastr: ToastrService,
    private tokenStorage: TokenStorageService,
    private appInfoService: AppInfoService,
    private _compiler: Compiler,
    private amplifyService: AmplifyService) {
    this.signInData = new SignInData();
    this.user = new User();
    this.admin = new User();
    this.show=false;


  }

  ngOnInit() {
    this.getBaseUrl()
    this.addAdministrator()
  }

  getBaseUrl() {
    // fetch('../../../config/config.json').then(res => {
    //   res.json().then((res) => {
    //     localStorage.setItem('BASE_URL', res.apiUrl+'/');
    //   });
    // });
  }

  getCurrentVersion() {
    this.appInfoService.getCurrentVersion().then((data: any) => {
      this.version = data.version;
    });
  }

  addAdministrator() {
    this.admin.username = "AllenceTunisie";
    this.admin.email = "mokhtar.ammar@allence-tunisie.com";
    this.admin.firstName = "Allence";
    this.admin.lastName = "Tunisie";
    this.admin.userPhone = "50396602";
    this.admin.userAddress = "rue elles,Montplaisir,Tunis";
    this.userService.ajoutUser(this.admin).then(() => {
      console.log("admin added")
    }).catch((e) => {
      console.log(e)
    })
  }


  signIn() {
    const user = this.authservice.signin(this.signInData.email, this.signInData.userPassword).then(r => {

      // Auth.currentSession().then( res => {
      //   // localStorage.setItem( 'token' , res.getIdToken().getJwtToken());
      // });
      Auth.currentUserInfo().then(res => {
        localStorage.setItem('emailUser', res.attributes.email);
      });
      this.initialiseUser().then(()=>{

        this.toastr.success('Bienvenue');
        if (this.tokenStorage.getAuthorities() === 'CLIENT') {
          this.router.navigate(['client/pieces']);
        } else if (this.tokenStorage.getAuthorities() === 'COURTIER') {
          this.router.navigate(['courtier/accueil']);
        } else {
          this.router.navigate(['admin/accueil'])
        }
      }).catch(reason => {
        this.toastr.warning(' verifier vos parametres de connexion: ',reason.message);
      });

      }).catch(reason => {
        this.toastr.error(reason.message)
    });


  }



  initialiseUser() {
  return   new Promise(resolve => {
      Auth.currentUserInfo().then((data: any) => {
        this.user = data;
        this.userService.loadUserByEmail(data.attributes.email).then((data: any) => {
          this.user = data;
          localStorage.setItem("id", data.result[0].id)
          resolve(localStorage.getItem('id'))
        });


    });
      return localStorage.getItem('id')


    })
  }

  forgetPassword() {
    Auth.forgotPassword(this.signInData.email)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  showMessage() {
    this.toastr.warning("Entrez Votre Username pour reçevoir le code de confirmation")
  }

  clickEvent() {
    this.show = !this.show;
    console.log(this.show)
  }
}
