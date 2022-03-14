import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css'],
})
export class ListBookComponent implements OnInit {
  bookData: any;
  message: string = '';
  positionHorizontal: MatSnackBarHorizontalPosition = 'right';
  positionVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _bookService: BookService,
    private _snackBar: MatSnackBar
  ) {
    this.bookData = {};
  }

  ngOnInit(): void {
    this._bookService.listBook().subscribe({
      next: (v) => {
        this.bookData = v.books;
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });
  }

  deleteBook(book: any) {
    this._bookService.deleteBook(book).subscribe({
      next: (v) => {
        this.message = v.message;
        this.openSnackBarSuccesful();
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });
  }

  updateBook(book: any) {
    this._bookService.updateBook(book).subscribe({
      next: (v) => {
        this.message = v.message;
        this.openSnackBarSuccesful();
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });
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
}
