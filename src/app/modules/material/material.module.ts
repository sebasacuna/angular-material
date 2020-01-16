import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/typings/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/typings/grid-list';
import {MatIconModule} from '@angular/material/typings/icon';
import {MatSelectModule} from '@angular/material/typings/select';
import {MatSnackBarModule} from '@angular/material/typings/snack-bar';
import {MatListModule} from '@angular/material/typings/list';
import {MatMenuModule} from '@angular/material/typings/menu';
import {MatPaginatorModule} from '@angular/material/typings/paginator';
import {MatSortModule} from '@angular/material/typings/sort';
import {MatTableModule} from '@angular/material/typings/table';
import {MatToolbarModule} from '@angular/material/typings/toolbar';
import {MatTooltipModule} from '@angular/material/typings/tooltip';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    PortalModule,
    ScrollingModule
  ],
  exports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    PortalModule,
    ScrollingModule
  ]
})
export class MaterialModule {
}
