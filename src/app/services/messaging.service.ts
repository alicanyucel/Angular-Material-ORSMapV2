import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string): void {
    this.snackBar.open(message, null, { duration: 2000 });
  }
}
