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
import {concatMap, first, tap} from 'rxjs/operators';


@Component({
  selector: 'app-element-mantainer',
  templateUrl: './elementmantainer.component.html',
  styleUrls: ['./elementmantainer.component.sass']
})
export class ElementMantainerComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
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
        //this.changeDetectorRefs.detectChanges();
      }, err => {
        console.error(err);
      });

  }

  displayedColumns: string[] = ['select', 'number', 'name', 'weight', 'symbol', 'actions'];

  length: any;
  pageIndex: any;
  pageSize: any;
  pageEvent: any;
  lele: any;

  selection = new SelectionModel<PeriodicElement>(true, []);


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource: MatTableDataSource<PeriodicElement>;

  public current$: Observable<any> = null;

  getServerData(event) {
    console.log('clicked');
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.elementService.getElementsPagination(event.pageSize, event.pageIndex).subscribe(response => {
      this.dataSource = new MatTableDataSource<PeriodicElement>(response);
    }, err => {
      console.error(err);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
    console.log('edit');
    console.log(element);
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
                console.log(response);
              }, err => {
                console.error(err);
              }
            ),
            concatMap((res) => {
              console.log('update tap');
              console.log(res);
              if (res) {
                return this.elementService.getElementsPagination(this.pageSize, this.pageIndex);
              }
            }),
          ).subscribe(response2 => {
            this.dataSource = new MatTableDataSource<PeriodicElement>(response2);
          }, err => {
            console.error(err);
          }
        );

        //this.dataSource._renderChangesSubscription;
        //const filteredItems = this.dataSource.data.filter(item => item !== element);

        //this.dataSource.data = filteredItems;
        //snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();

        //snack.dismiss();
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
    /*const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });*/
    //const snack = this.snackBar.open('Snack bar open before dialog');


    console.log('Page size: ' + this.pageSize);

    dialogRef.afterClosed().subscribe((bar) => {
      console.log('revisar');
      console.log(bar);
      if (bar.response) {
        console.log('antes de la llamada');
        this.elementService.createElements(bar.data)
          .pipe(
            tap(
              response => {
                console.log('añadir elemento');
                console.log(response);
              }, err => {
                console.error(err);
              }
            ),
            concatMap((res) => this.elementService.getElementsPagination(this.pageSize, this.pageIndex)),
            tap(
              response => {
                this.dataSource = new MatTableDataSource<PeriodicElement>(response);
              }, err => {
                console.error(err);
              }
            ),
            concatMap((res) => this.elementService.getCountElements()),
            tap(
              response => {
                this.length = response;
              }, err => {
                console.error(err);
              }
            )
          ).subscribe(res => console.log('Latest result', res));

        /* this.elementService.createElements(bar.data).pipe(
           concatMap(response => {
             console.log(response);
             this.dataSource.data.push(bar.data);
             const newData: PeriodicElement[] = this.dataSource.data;
             this.dataSource = new MatTableDataSource<PeriodicElement>(newData);
             return this.elementService.getCountElements();
           })
         ).subscribe(
           response => {
             this.length = response;
             //this.changeDetectorRefs.detectChanges();
           }, err => {
             console.error(err);
           });*/

        /*this.elementService.createElements(bar.data).subscribe(response => {
          console.log(response);
          this.dataSource.data.push(bar.data);
          const newData: PeriodicElement[] = this.dataSource.data;
          this.dataSource = new MatTableDataSource<PeriodicElement>(newData);
        }, err => {
          console.error(err);
        });*/
        const a = document.createElement('a');
        a.click();
        a.remove();


        //snack.dismiss();
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
    /*const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });*/
    //const snack = this.snackBar.open('Snack bar open before dialog');

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
            //this.changeDetectorRefs.detectChanges();
          }, err => {
            console.error(err);
          });


        /*this.elementService.deleteElement({id: element.number}).subscribe(response => {
          if (response) {
            const filteredItems = this.dataSource.data.filter(item => item !== element);
            this.dataSource.data = filteredItems;
          }
        }, err => {
          console.error(err);
        });*/


        //snack.dismiss();


        const a = document.createElement('a');
        a.click();
        a.remove();
        //snack.dismiss();
        this.snackBar.open('Element erased', 'Close', {
          duration: 2000,
        });
        /*this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });*/
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

  getTotalRows() {
    return this.dataSource.data.length;
  }
}
