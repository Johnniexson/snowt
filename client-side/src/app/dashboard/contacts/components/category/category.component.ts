import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { remove } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Category } from '../../models/category';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  userData: User = null;
  constructor(
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public contactService: ContactService,
    public authService: AuthService
  ) {}
  displayedColumns: string[] = ['category', 'action'];
  dataSource: Category[] = [];

  saveBtnHandler(){
    this.dialog.open(CategoryFormComponent);
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(data => {
      this.userData = data;
      // getLabels based on userId
    this.contactService.getLabels(this.userData._id).subscribe(
      data => {
        this.dataSource = data;
        console.log(data);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          } else {
            // calling the snackbar errorhandler
            this.errorHandler(err, 'Failed to load labels');
          }
        }
      }
    );
    })
  }

  // open dialog to edit
  editBtnHandler(_id){
    this.dialog.open(CategoryFormComponent, {
      data: { id: _id },
    });
  }

  deleteBtnHandler(id) {
    this.contactService.deleteLabel(id).subscribe(
      data => {
        // implementing lodash to update datasource
        const removedItems = remove(this.dataSource, name => {
          return name._id === data._id;
        });
        this.dataSource = [...this.dataSource];
        // snackBar
        this.snackBar.open('Label deleted', 'Success', {
          duration: 2000
        });
      },
      // calling the snackbar errorhandler
      err => this.errorHandler(err, 'Failed to delete label')
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

// category form
@Component({
  selector: 'app-category-form',
  styles: [`
  
  `],
  template: `
  <form class="form-container" [formGroup]="categoryForm" novalidate (ngSubmit)="onSubmit()">
    <mat-form-field color="primary">
      <input matInput placeholder="Label" formControlName="label">
    </mat-form-field>
    <div>
      <button mat-raised-button [disabled]="!categoryForm.valid" type="submit" color="primary">Save</button>
      <button mat-raised-button type="reset" mat-dialog-close>Cancel</button>
    </div>
  </form>
  `,
})
export class CategoryFormComponent {
  private category: Category;
  categoryForm: FormGroup;
  userId: String;

  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private fb: FormBuilder,
    public contactService: ContactService,
    public authService: AuthService,
    ) {}

    ngOnInit() {
      this.getUser();
      this.createForm();
      this.setLabelToForm();
    }
    getUser() {
      this.authService.getCurrentUser().subscribe(
        data => {
          console.log(data);
          this.userId = data._id;
        }
      )
    }
    onSubmit() {
      // user wants to update contact
      if (this.category) {
        this.contactService.updateLabel(this.category._id, this.categoryForm.value).subscribe(
          data => {
            this.snackBar.open('Label Updated', 'Success', {
              duration: 2000
            });
            this.dialogRef.close();
            this.reloadPage();
          },
          // calling the snackbar errorhandler
          err => this.errorHandler(err, 'Failed to update label')
        );
      }
      else{
        console.log(this.categoryForm.value);
        this.contactService.createLabel(this.categoryForm.value).subscribe(
          data => {
            this.snackBar.open('Label created', 'Success', {
              duration: 2000
            });
            this.dialogRef.close();
            this.reloadPage();
            console.log(data);
          },
          // calling the snackbar errorhandler
          err => this.errorHandler(err, 'Failed to create label')
        );
      }
    }
    private setLabelToForm(){
        if(!this.data){
          return;
        }
        let id = this.data.id;
        this.contactService.getLabel(id).subscribe(category => {
          this.category = category;
          this.categoryForm.patchValue(this.category);
        },
        // calling the snackbar errorhandler
        err => this.errorHandler(err, 'Failed to get label'));
    } 
    // form builder model
    private createForm() {
      this.categoryForm = this.fb.group({
        userId: this.userId,
        label: ['', Validators.required],
      });
    }
    // error handling with snackbar
    private errorHandler(error, message) {
      console.error(error);
      this.snackBar.open(message, 'Error', {
        duration: 2000
      });
    }
    // reload page
    reloadPage() {
      this.zone.runOutsideAngular(() => {
          location.reload();
      });
  }

}
