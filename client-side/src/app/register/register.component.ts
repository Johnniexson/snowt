import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  businessForm: FormGroup;
  sexs = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'}
  ];
  types = [
    "Technology",
    "Beauty&Fashion",
    "Food&Beverages",
    "Health",
    "Education",
    "Agro"
  ];
  states = [
    "Abia",
    "Adamawa",
    "Anambra",
    "Akwa Ibom",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Enugu",
    "Edo",
    "Ekiti",
    "FCT - Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createUserForm();
    this.createBusinessForm();
  }
  userOnSubmit() {
    this.authService.createUser(this.userForm.value).subscribe(
      data => {
        this.snackBar.open('Registered Successfully', 'Success', {
          duration: 2000
        });
        this.router.navigate(['login']);
        // storing the generated token
        // localStorage.setItem('token', data.token);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 406) {
            console.log(err);
          } else {
            // calling the snackbar errorhandler
            this.errorHandler(err, 'Registration failed')
          }
        }
      }
    );
  }
  businessOnSubmit() {
    this.authService.createBusiness(this.businessForm.value).subscribe(
      data => {
        this.snackBar.open('Registered Successfully', 'Success', {
          duration: 2000
        });
        this.router.navigate(['login']);
        // storing the generated token
        // localStorage.setItem('token', data.token);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 406) {
            console.log(err);
          } else {
            // calling the snackbar errorhandler
            this.errorHandler(err, 'Registration failed')
          }
        }
      }
    );
  }
  createUserForm() {
    this.userForm = this.fb.group({
      image: '',
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      sex: ['', Validators.required],
      dob: ['', Validators.required],
      location: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      oath: [false, Validators.requiredTrue]
    });
  }
  createBusinessForm() {
    this.businessForm = this.fb.group({
      image: '',
      company: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      oath: [false, Validators.requiredTrue]
    });
  }
  // error handling with snackbar
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
