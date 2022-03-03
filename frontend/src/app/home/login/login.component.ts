import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: any;
  message: string = '';
  positionHorizontal: MatSnackBarHorizontalPosition = 'right';
  positionVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginData = {};
  }

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
      this.loginData = {};
    } else {
      console.log(this.loginData);

      this._userService.login(this.loginData).subscribe({
        next: (v) => {
          localStorage.setItem('token', v.token);
          this._router.navigate(['/listBook']);
        },
        error: (err) => {
          this.message = err.error.message;
          this.openSnackBarError();
        },
      });
    }
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.positionHorizontal,
      verticalPosition: this.positionVertical,
      duration: 1500,
      panelClass: ['snackBarError'],
    });
  }

  ngOnInit(): void {}
}
