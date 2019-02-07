import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { Router } from '@angular/router';
import { MatPaginator, MatSnackBar, MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { remove } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-listing',
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.scss']
})
export class ContactListingComponent implements OnInit {
  constructor(private contactService: ContactService,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog
            ) {}
  displayedColumns: string[] = ['name', 'category','action'];
  dataSource: MatTableDataSource<Contact>;
  length: number;

  autoBtnHandler(){
    this.router.navigate(['dashboard', 'auto-contact']);
  }
  saveBtnHandler(){
    this.dialog.open(ContactFormComponent, {
      height: '500px',
      width: '600px',
    });
  }
  catBtnHandler(){
    this.router.navigate(['dashboard', 'categories']);
  }

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.length = data.length;
        console.log(data);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
          } else {
            // calling the snackbar errorhandler
          this.errorHandler(err, 'Failed to load contacts')
          }
        }
      }
    );
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  
  // filtering table data
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
   // open dialog to edit
   editBtnHandler(_id){
    this.dialog.open(ContactFormComponent, {
      data: { id: _id },
    });
  }
  
  deleteBtnHandler(id){
    this.contactService.deleteContact(id).subscribe(
      data => {
      //  // implementing lodash to update datasource
      //   const removedItems = remove(this.dataSource, (name) => {
      //     return name._id === data._id
      //   })
      //   this.dataSource = [...this.dataSource];
      //   // snackBar
      //   this.snackBar.open('Contact deleted', 'Success', {
      //     duration: 2000
      //   });
      },
       // calling the snackbar errorhandler
      err => this.errorHandler(err, 'Failed to delete contact')
    );
  }
  // error handling with snackbar
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
