import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {BodyComponent} from './components/body/body.component';
import {MaterialModule} from './modules/material/material.module';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {AlertDialogComponent} from './components/alertdialog/alertdialog.component';
import { NewElementComponent } from './components/new-element/new-element.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditElementComponent } from './components/edit-element/edit-element.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent,
	NewElementComponent,
	EditElementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent, AlertDialogComponent, NewElementComponent, EditElementComponent],
})
export class AppModule {
}
