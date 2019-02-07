import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  valid: Boolean = true;
  isBusiness: Boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
  }
  onSubmit() {
    if (this.isBusiness == false) {
      this.authService.loginUser(this.userForm.value).subscribe(
        data => {
          console.log(data);
          // storing the generated token
          localStorage.setItem('token', data.token);
          this.router.navigate(['dashboard']);
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              this.userForm.controls['password'].reset();
              this.valid = false;
              console.log(err);
            } else {
              // calling the snackbar errorhandler
              this.errorHandler(err, 'Login failed');
            }
          }
        }
      );
    } else if (this.isBusiness == true) {
      // login for Business
    this.authService.loginBusiness(this.userForm.value).subscribe(
      data => {
        console.log(data);
        // storing the generated token
        localStorage.setItem('token', data.token);
        this.router.navigate(['dashboard']);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            this.userForm.controls['password'].reset();
            this.valid = false;
            console.log(err);
          } else {
            // calling the snackbar errorhandler
            this.errorHandler(err, 'Login failed');
          }
        }
      }
    );
    }
    return
  }
  createForm() {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
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
