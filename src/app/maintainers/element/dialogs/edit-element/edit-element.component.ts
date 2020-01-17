import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NewElementComponent } from '../new-element/new-element.component';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.sass']
})
export class EditElementComponent implements OnInit {

  title = 'Elemento';
  containerdialog = 'container-dialog'

  public formedit: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public fb: FormBuilder,
              private dialogRef: MatDialogRef<NewElementComponent>) {
    if (data) {
      this.title = 'Elemento';
    }
   this.createForm(data.data);

  }

  createForm(data) {
    console.log(data);
    this.formedit = this.fb.group({
      number: data.position,
      name: data.name,
      weight: data.weight,
      symbol: data.symbol
    });
  }

  close() {
	this.dialogRef.close();
  }


  ngOnInit() {
  }

}
