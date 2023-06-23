import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {AjoutUtilisateurComponent} from './ajout-utilisateur/ajout-utilisateur.component';
import {ModifierUtilisateurComponent} from './modifier-utilisateur/modifier-utilisateur.component';
import {User} from '../../core/models/User';
import {ConfirmationComponenetComponent} from './confirmation-componenet/confirmation-componenet.component';


@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  public Users: any[];
  public page = 1;
  public perPage = 5;
  public maxPage: number;

  public precedent: boolean;
  public suivant: boolean;

  public selectedUser: User;


  constructor(public dialog: MatDialog, private userService: UserService, private toastrService: ToastrService) {


    this.Users = [];
    this.selectedUser = new User();
  }


  ngOnInit() {
 this.listUser(this.page, this.perPage);
  }

  listUser(page: number, perPage: number) {
    this.userService.getUsers(page, perPage).subscribe((data: any) => {
      this.Users = data;
    }, error => {
    }, () => {
      if (this.Users.length === this.perPage) {
        this.suivant = true;
      } else {
        this.suivant = false;
      }
    });
  }

  openDialogAjoutUser() {
    const dialogRef = this.dialog.open(AjoutUtilisateurComponent, {
      width: '750px',
      data: {}
    }).afterClosed().subscribe((res: any) => {
      this.listUser(this.page, this.perPage);
    });
  }

  openDialogModifierUser(user: User) {
    this.selectedUser = user;

    const dialogRef = this.dialog.open(ModifierUtilisateurComponent, {
      width: '800px',

      data: {user: this.selectedUser}

    }).afterClosed().subscribe(res => {
      this.initSelectedUser();
      this.listUser(this.page, this.perPage);
    });

  }

    OpenDialogConfirmation(user: User) {
    this.selectedUser = user;
    const dialogRef = this.dialog.open(ConfirmationComponenetComponent, {
      width: '750px',
      data: {user: this.selectedUser}

    }).afterClosed().subscribe(res => {
      this.initSelectedUser();
      this.listUser(this.page, this.perPage);
    });
  }

  initSelectedUser() {
    this.selectedUser = new User();
  }

  nextPage() {
      if (this.suivant) {
        this.page = this.page + 1 ;
        this.listUser(this.page , this.perPage);
      }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.listUser(this.page, this.perPage);
    } else {
    }
  }


  firstPage() {
    this.listUser(1, this.perPage);
    if (this.Users.length === this.perPage) {
      this.suivant = true;
    } else {
      this.suivant = false;
    }
    this.page = 1 ;
  }

  optionOne() {
    this.perPage = 5;
    this.page = 1;
    this.listUser(this.page, 5);

  }

  optionTwo() {
    this.perPage = 10;
    this.page = 1;
    this.listUser(this.page, 10);

  }

  optionThree() {
    this.perPage = 20;
    this.page = 1;
    this.listUser(this.page, 20);

  }
}
