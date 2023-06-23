import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../core/models/User";
import {UserService} from "../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-componenet',
  templateUrl: './confirmation-componenet.component.html',
  styleUrls: ['./confirmation-componenet.component.scss']
})
export class ConfirmationComponenetComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private toastrService: ToastrService, public dialogRef: MatDialogRef<ConfirmationComponenetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = this.data.user;
  }

  ngOnInit(): void {
  }


  deleteUser(user: User) {
     this.userService.deleteUser(user).subscribe((data: any) => {
      console.log(data)
      if (data.message === 'user was deleted successfully!') {
        this.toastrService.success('utilisateur supprimé ', 'Success');
        this.closeModal()

      } else {
        this.toastrService.error('erreur lors de suppression', 'Erreur');
      }
    })
  }

  closeModal() {
    this.dialogRef.close()
  }
}
