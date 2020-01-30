import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PeriodicElement} from '../../models/element.model';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-new-element',
  templateUrl: './new-element.component.html',
  styleUrls: ['./new-element.component.sass']
})
export class NewElementComponent implements OnInit {

  title = 'Elemento';
  containerdialog = 'container-dialog';

  public form: FormGroup;

  constructor(private logger: NGXLogger,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              private dialogRef: MatDialogRef<NewElementComponent>) {
    if (data) {
      this.title = 'Elemento';
    }
    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      number: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required,
        Validators.maxLength(15)]),
      weight: new FormControl('', [Validators.required]),
      symbol: new FormControl('', [Validators.required])
    });
  }


  get f() {
    return this.form.controls;
  }

  close() {
    this.logger.info('close');
    const response = {
      data: null,
      response: false,
    };
    this.dialogRef.close(response);
  }

  addNewElement() {
    this.logger.info('add element');
    this.logger.info(this.addNewElement.name + ' ', this.form);
    this.logger.info(this.addNewElement.name + ' ', this.data.datasource.data);
    const bar: PeriodicElement = {
      number: this.form.value.number,
      name: this.form.value.name,
      weight: this.form.value.weight,
      symbol: this.form.value.symbol
    };
    const response = {
      data: bar,
      response: true,
    };
    this.dialogRef.close(response);
  }

  ngOnInit() {
  }

}
