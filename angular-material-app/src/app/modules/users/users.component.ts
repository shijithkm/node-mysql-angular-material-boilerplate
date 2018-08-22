import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { AddUserComponent } from './add-user/add-user.component';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'edit'];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  users: User[];
  loading: boolean;
  messageObj = {
    status: false,
    type: '',
    message: ''
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {

    this.loadUsers();

  }

  ngOnInit() {

  }

  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      });
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
      console.log(`Dialog result: ${result}`);
    });
  }

  editRow(e) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '400px',
      width: '600px',
      data: e
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteRows() {

    const ids = [];
    this.selection.selected.forEach((e, i) => {
      ids.push(e.id);
    });

    console.log(ids);

    this.userService.deleteUsers(ids).subscribe((result) => {

      if (result.affectedRows > 0) {

        this.messageObj.status = true;
        this.messageObj.type = 'success';
        this.messageObj.message = result.affectedRows + ' users has been deleted successfully!';

        this.loading = false;

        this.loadUsers();

      } else {

        this.messageObj.status = true;
        this.messageObj.type = 'error';
        this.messageObj.message = 'Selected users cannot be deleted this time ';

        this.loading = false;

      }

      

      /** Reset Form */
      setTimeout(() => {

        this.messageObj.status = false;
        this.messageObj.type = null;
        this.messageObj.message = null;

      }, 3000);

    });


  }


  /** Whether the number of selected elements matches the total number of rows. */
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


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
