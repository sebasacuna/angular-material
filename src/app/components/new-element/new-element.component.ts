import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-element',
  templateUrl: './new-element.component.html',
  styleUrls: ['./new-element.component.sass']
})
export class NewElementComponent implements OnInit {

  title = 'Elemento';
  containerdialog = 'container-dialog'

  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  			  public fb: FormBuilder,
              private dialogRef: MatDialogRef<NewElementComponent>) {
    if (data) {
      this.title = 'Elemento';
    }
   this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      number: '',
      name: '',
      weight: '',
      symbol: ''
    });
  }

  close() {
	  console.log('close my friend');
	  this.dialogRef.close();
  }

  ngOnInit() {
  }

}
