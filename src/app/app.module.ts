import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {MaterialModule} from './modules/material/material.module';
import {ConfirmationDialogComponent} from './maintainers/element/dialogs/confirmation-dialog/confirmation-dialog.component';
import {AlertDialogComponent} from './maintainers/element/dialogs/alertdialog/alertdialog.component';
import { NewElementComponent } from './maintainers/element/dialogs/new-element/new-element.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditElementComponent } from './maintainers/element/dialogs/edit-element/edit-element.component';
import {ElementMantainerComponent} from './maintainers/element/components/element/elemenmantainer.component';

import { HttpClientModule } from '@angular/common/http';

import {IConfig, NgxMaskModule} from 'ngx-mask';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ElementMantainerComponent,
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
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent, AlertDialogComponent, NewElementComponent, EditElementComponent],
})
export class AppModule {
}
