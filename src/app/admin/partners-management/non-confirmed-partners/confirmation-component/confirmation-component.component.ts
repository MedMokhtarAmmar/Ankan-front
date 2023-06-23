import {Component, Inject, OnInit} from '@angular/core';
import {Partenaire} from "../../../../core/models/Partenaire";
import {PartnersService} from "../../../../core/services/partners.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirmation-component',
  templateUrl: './confirmation-component.component.html',
  styleUrls: ['./confirmation-component.component.scss']
})
export class ConfirmationComponentComponent implements OnInit {


partenaire: Partenaire;


  constructor( private partnersService : PartnersService, private toastrService: ToastrService, public dialogRef: MatDialogRef<ConfirmationComponentComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any)
  { this.partenaire= this.data.partenaire}

  ngOnInit(): void {
    console.log(this.partenaire)
  }
  confirmPartner(partenaire: Partenaire){
    partenaire.partnerStatus="CONFIRME";

    this.partnersService.updatePartner(partenaire).subscribe((data: any) => {
        this.toastrService.success('partnenaire confirmé ', 'Success');
        this.closeModal()
    },error => {
      this.toastrService.error('erreur lors de la confirmation', 'Erreur');
    })
  }
  closeModal() {
    this.dialogRef.close()
  }
}
