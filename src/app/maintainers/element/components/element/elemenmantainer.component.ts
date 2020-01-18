import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

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


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Argon', weight: 20.1797, symbol: 'Arg'},
];


@Component({
  selector: 'app-element-mantainer',
  templateUrl: './elementmantainer.component.html',
  styleUrls: ['./elementmantainer.component.sass']
})
export class ElementMantainerComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    const bar: PeriodicElement = {position: 1, name: 'Lelele', weight: 1.0079, symbol: 'H'};
    this.dataSource.data.push(bar);
    this.changeDetectorRefs.detectChanges();
  }

  onNoClick(): void {
  }

  openEditDialog(element, index) {
    const dialogRef = this.dialog.open(EditElementComponent, {
      data: {
        title: 'Elemento',
        data: element,
        indexRow: index
      },
      panelClass: 'my-class'
    });

    dialogRef.afterClosed().subscribe((bar: PeriodicElement) => {
      if (bar != null) {
        this.dataSource.data.push(bar);
        const newData = this.dataSource.data;
        //this.dataSource._renderChangesSubscription;
        console.log(bar);


        const filteredItems = this.dataSource.data.filter(item => item !== element);
        this.dataSource = new MatTableDataSource<PeriodicElement>(newData);
        //this.dataSource.data = filteredItems;
        //snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();

        //snack.dismiss();
        /*this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });*/
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
        this.dataSource.data.push(bar.data);
        const newData: PeriodicElement[] = this.dataSource.data;
        //this.dataSource._renderChangesSubscription;
        console.log(bar);
        this.dataSource = new MatTableDataSource<PeriodicElement>(newData);
        //const filteredItems = this.dataSource.data.filter(item => item !== element);
        //this.dataSource.data = filteredItems;
        //snack.dismiss();
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

  openDialog(element) {
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
        const filteredItems = this.dataSource.data.filter(item => item !== element);
        this.dataSource.data = filteredItems;
        //snack.dismiss();


        const a = document.createElement('a');
        a.click();
        a.remove();
        //snack.dismiss();
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

  getTotalRows() {
    //console.log('data');
    //console.log(this.paginator.length);
    //console.log(this.paginator.pageSize);
    return this.dataSource.data.length;
  }
}
