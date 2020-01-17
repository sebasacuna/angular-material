import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {PeriodicElement} from '../../models/element.model';

@Component({
  selector: 'app-new-element',
  templateUrl: './new-element.component.html',
  styleUrls: ['./new-element.component.sass']
})
export class NewElementComponent implements OnInit {

  title = 'Elemento';
  containerdialog = 'container-dialog';

  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              private dialogRef: MatDialogRef<NewElementComponent>) {
    console.log(data);
    if (data) {
      this.title = 'Elemento';
    }
    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      number: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      weight: new FormControl( '', [Validators.required]),
      symbol: new FormControl( '', [Validators.required])
    });
  }


  get f() { return this.form.controls; }

  close() {
    this.dialogRef.close();
  }

  addNewElement() {
    console.log(this.form);
    console.log(this.data.datasource.data);
    const bar: PeriodicElement = {
      position: this.form.value.number,
      name: this.form.value.name,
      weight: this.form.value.weight,
      symbol: this.form.value.symbol
    };
    //this.data.datasource.data.push( bar);
    this.dialogRef.close( bar);

    //console.log(this.data.datasource);
  }

  ngOnInit() {
  }

}
