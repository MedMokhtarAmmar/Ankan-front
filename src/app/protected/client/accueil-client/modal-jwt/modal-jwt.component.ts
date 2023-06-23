import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-jwt',
  templateUrl: './modal-jwt.component.html',
  styleUrls: ['./modal-jwt.component.scss']
})
export class ModalJwtComponent implements OnInit {

  token: string;


  constructor(
    public dialogRef: MatDialogRef<ModalJwtComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }



}






