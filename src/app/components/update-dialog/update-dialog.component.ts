import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {


  _id:string;
  title:string;
  type:number

  constructor(private dialogRef: MatDialogRef<UpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public data) {

    this._id = data._id;
    this.title = data.title;
    this.type = data.type
   }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}
