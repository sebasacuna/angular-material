import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NewElementComponent} from '../new-element/new-element.component';
import {PeriodicElement} from '../../models/element.model';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.sass']
})
export class EditElementComponent implements OnInit {

  title = 'Elemento';
  containerdialog = 'container-dialog';
  index;

  private data2: PeriodicElement;

  public formedit: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public fb: FormBuilder,
              private dialogRef: MatDialogRef<NewElementComponent>) {
    if (data) {
      this.title = 'Elemento';
      this.index = data.indexRow;
      console.log('index is ', this.index);
    }
    this.data2 = data;
    this.createForm(data.data);

  }

  createForm(data) {
    console.log(data);
    this.formedit = this.fb.group({
      number: new FormControl({
        value: data.number,
        disabled: true
      }, [Validators.required]),
      name: data.name,
      weight: data.weight,
      symbol: data.symbol
    });
  }

  editElement() {
    console.log('edit element');
    console.log(this.formedit.value.number);
    const bar: PeriodicElement = {
      number: this.formedit.controls['number'].value,
      name: this.formedit.value.name,
      weight: this.formedit.value.weight,
      symbol: this.formedit.value.symbol
    };
    const response = {
      data: bar,
      response: true,
    };
    this.dialogRef.close(response);
  }

  close() {
    this.dialogRef.close();
  }

  get f() {
    return this.formedit.controls;
  }


  ngOnInit() {
  }

}
