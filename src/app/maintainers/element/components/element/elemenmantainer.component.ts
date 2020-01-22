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
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-element-mantainer',
  templateUrl: './elementmantainer.component.html',
  styleUrls: ['./elementmantainer.component.sass']
})
export class ElementMantainerComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['select', 'number', 'name', 'weight', 'symbol', 'actions'];

  selection = new SelectionModel<PeriodicElement>(true, []);


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private dataSource: MatTableDataSource<PeriodicElement>;

  public current$: Observable<any> = null;

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

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private elementService: ElementService,
              private changeDetectorRefs: ChangeDetectorRef) {

    this.elementService.getElements().pipe(
      /*map(
      (data) => {
        console.log('inside of pipe');
        console.log(data);
        return data;
      }*/
      first(
      )
    ).subscribe(
      response => {
        console.log('inside subcribe');
        this.dataSource = new MatTableDataSource<PeriodicElement>(response);
        console.log(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.changeDetectorRefs.detectChanges();
      }, err => {
        console.error(err);
      });
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
        this.elementService.updateElements(bar.data).subscribe(response => {
          if (response) {
            this.elementService.getElements().subscribe(response2 => {
              this.dataSource = new MatTableDataSource<PeriodicElement>(response2);
            }, err => {
              console.error(err);
            });
          }

        }, err => {
          console.error(err);
        });

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


    dialogRef.afterClosed().subscribe((bar) => {
      console.log('revisar');
      console.log(bar);
      if (bar.response) {
        this.elementService.createElements(bar.data).subscribe(response => {
          console.log(response);
          this.dataSource.data.push(bar.data);
          const newData: PeriodicElement[] = this.dataSource.data;
          this.dataSource = new MatTableDataSource<PeriodicElement>(newData);
        }, err => {
          console.error(err);
        });
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
        this.elementService.deleteElement({id: element.number}).subscribe(response => {
          if (response) {
            const filteredItems = this.dataSource.data.filter(item => item !== element);
            this.dataSource.data = filteredItems;
          }
        }, err => {
          console.error(err);
        });


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
    //console.log('data');
    //console.log(this.paginator.length);
    //console.log(this.paginator.pageSize);
    return this.dataSource.data.length;
  }
}
