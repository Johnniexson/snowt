import { Component, OnInit, Inject, NgZone } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../../models/contact';
import { User } from '../../../../models/user';
import { AuthService } from '../../../../services/auth.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  private contact: Contact;
  userData: User = null;
  contactForm: FormGroup;
  categories: Category[] = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private zone: NgZone,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    public contactService: ContactService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.authService.getCurrentUser().subscribe(data => {
      this.userData = data;
    });
  }

  ngOnInit() {
    // this.getLabels()
    this.createForm();
    this.setContactToForm();
  }
  onSubmit() {
    // user wants to update contact
    if (this.contact) {
      this.contactService.updateContact(this.contact._id, this.contactForm.value).subscribe(
        data => {
          this.snackBar.open('Contact Updated', 'Success', {
            duration: 2000
          });
          this.dialogRef.close();
          this.reloadPage();
        },
        // calling the snackbar errorhandler
        err => this.errorHandler(err, 'Failed to update contact')
      );
    }
    else{
      this.contactService.createContact(this.contactForm.value).subscribe(
        data => {
          this.snackBar.open('Contact created', 'Success', {
            duration: 2000
          });
          this.dialogRef.close();
          this.reloadPage();
          console.log(data);
        },
        // calling the snackbar errorhandler
        err => this.errorHandler(err, 'Failed to create contact')
      );
    }
  }
  // getLabels() {
  //   this.contactService.getLabels(this.userData._id).subscribe(category => {
  //     this.categories = category;
  //     console.log(category);
  //   })
  // }
  private setContactToForm(){
      if(!this.data){
        return;
      }
      let id = this.data.id;
      this.contactService.getContact(id).subscribe(contact => {
        this.contact = contact;
        this.contactForm.patchValue(this.contact);
      },
      // calling the snackbar errorhandler
      err => this.errorHandler(err, 'Failed to get contact'));
  } 
  // form builder model
  private createForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      category: '',
      location: ''
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
