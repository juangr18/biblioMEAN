import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerData: any;
  message: string = '';
  positionHorizontal: MatSnackBarHorizontalPosition = 'right';
  positionVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
  }

  registerUser() {
    if (
      !this.registerData.id_document ||
      !this.registerData.name ||
      !this.registerData.last ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      console.log(this.registerData);

      this._userService.registerUser(this.registerData).subscribe({
        next: (v) => {
          localStorage.setItem('token', v.token);
          this._router.navigate(['/']);
          this.message = 'Successful register';
          this.openSnackBarSuccesful();
        },
        error: (err) => {
          this.message = err.error.message;
          this.openSnackBarError();
        },
      });
    }
  }

  openSnackBarSuccesful() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.positionHorizontal,
      verticalPosition:this.positionVertical,
      duration: 900,
      panelClass: ['snackBarSuccesful'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.positionHorizontal,
      verticalPosition:this.positionVertical,
      duration: 900,
      panelClass: ['snackBarError'],
    });
  }

  ngOnInit(): void {}
}
