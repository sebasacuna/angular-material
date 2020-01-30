import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatSnackBar} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {AlertDialogComponent} from '../../dialogs/alertdialog/alertdialog.component';
import {NewElementComponent} from '../../dialogs/new-element/new-element.component';
import {EditElementComponent} from '../../dialogs/edit-element/edit-element.component';
import {PeriodicElement} from '../../models/element.model';
import {ElementService} from '../../services/element.service';
import {Observable} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';


@Component({
  selector: 'app-element-mantainer',
  templateUrl: './elementmantainer.component.html',
  styleUrls: ['./elementmantainer.component.sass']
})
export class ElementMantainerComponent implements OnInit, OnDestroy {

  constructor(private logger: NGXLogger,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private elementService: ElementService,
              private changeDetectorRefs: ChangeDetectorRef) {

    this.elementService.getCountElements().pipe(
      concatMap(result => {
        this.length = result;
        this.pageIndex = 0;
        this.pageSize = 5;
        return elementService.getElementsPagination(5, 0);
      })
    ).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(response);
      }, err => {
        this.logger.error(err);
      });

  }

  displayedColumns: string[] = ['select', 'number', 'name', 'weight', 'symbol', 'actions'];

  length: any;
  pageIndex: any;
  pageSize: any;
  pageEvent: any;

  selection = new SelectionModel<PeriodicElement>(true, []);


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource: MatTableDataSource<PeriodicElement>;

  public current$: Observable<any> = null;

  getServerData(event) {
    this.logger.info(`${this.getServerData.name} `, event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.elementService.getElementsPagination(event.pageSize, event.pageIndex).subscribe(response => {
      this.dataSource = new MatTableDataSource<PeriodicElement>(response);
    }, err => {
      this.logger.error(this.getServerData.name + ' ', err);
    });
  }

  isAllSelected() {
    if (!this.dataSource === undefined) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.number + 1}`;
  }

  ngOnInit() {
  }

  onNoClick(): void {

  }

  edit(element) {
    this.logger.info(this.edit.name + 'edit');
    const dialogRef = this.dialog.open(EditElementComponent, {
      data: {
        title: 'Elemento',
        data: element,
      },
      panelClass: 'my-class'
    });

    dialogRef.afterClosed().subscribe((bar) => {
      if (bar.response) {

        this.elementService.updateElements(bar.data)
          .pipe(
            tap(
              response => {
                this.logger.info(this.edit.name + ' ', response);
              }, err => {
                this.logger.error(this.edit.name + ' ', err);
              }
            ),
            concatMap((res) => {
              this.logger.info('update ta', res);
              if (res) {
                return this.elementService.getElementsPagination(this.pageSize, this.pageIndex);
              }
            }),
          ).subscribe(response2 => {
            this.dataSource = new MatTableDataSource<PeriodicElement>(response2);
          }, err => {
            this.logger.error(this.edit.name + ' ', err);
          }
        );

        const a = document.createElement('a');
        a.click();
        a.remove();

        this.snackBar.open('Edited element', 'Close', {
          duration: 2000,
        });
      }
    });
  }


  openDialogNewElement() {
    const dialogRef = this.dialog.open(NewElementComponent, {
      data: {
        title: 'Elemento',
        datasource: this.dataSource,
      },
      panelClass: 'my-class'
    });

    dialogRef.afterClosed().subscribe((bar) => {
      if (bar.response) {
        this.elementService.createElements(bar.data)
          .pipe(
            tap(
              response => {
                this.logger.info(this.openDialogNewElement.name + ' add element ', response);
              }, err => {
                this.logger.error(this.openDialogNewElement.name + ' ', err);
              }
            ),
            /*concatMap((res) => this.elementService.getElementsPagination(this.pageSize, this.pageIndex)),
            tap(
              response => {
                this.dataSource = new MatTableDataSource<PeriodicElement>(response);
              }, err => {
                this.logger.error(this.openDialogNewElement.name + ' ', err);
              }
            ),*/
            concatMap((res) => this.elementService.getCountElements()),
            tap(
              response => {
                this.length = response;
              }, err => {
                this.logger.error(this.openDialogNewElement.name + ' ', err);
              }
            )
          ).subscribe(res => this.logger.info('Latest result', res));

        this.refreshTable();

        const a = document.createElement('a');
        a.click();
        a.remove();

        this.snackBar.open('New element added', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  delete(element) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      },
      panelClass: 'my-panel'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

        this.elementService.deleteElement({id: element.number}).pipe(
          concatMap(result => {
            if (result) {
              const filteredItems = this.dataSource.data.filter(item => item !== element);
              this.dataSource.data = filteredItems;
            }
            return this.elementService.getCountElements();
          })
        ).subscribe(
          response => {
            this.length = response;
          }, err => {
            this.logger.error(this.delete.name + ' ', err);
          });

        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Element erased', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  openAlertDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  }

  public ngOnDestroy(): void {

  }

  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  getTotalRows() {
    if (!this.dataSource === undefined) {
      return this.dataSource.data.length;
    }
  }
}
