import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.css'],
})
export class RegisterBookComponent implements OnInit {
  registerData: any;
  message: string = '';
  positionHorizontal: MatSnackBarHorizontalPosition = 'right';
  positionVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
  }

  registerBook() {
    if (
      !this.registerData.isbn ||
      !this.registerData.author ||
      !this.registerData.name ||
      !this.registerData.names ||
      this.registerData.pages === 0 ||
      this.registerData.price === 0
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      this._taskService.registerBook(this.registerData).subscribe({
        next: () => {
          this._router.navigate(['/listBook']);
          this.message = 'Successful register book';
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
      verticalPosition: this.positionVertical,
      duration: 1500,
      panelClass: ['snackBarSuccesful'],
    });
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
