import { Component } from '@angular/core';
import { IdentityService, UserIdentity } from './services/identity.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  template: `
    <div class="container">
      <mat-card class="card">
        <h1 class="title">User Identity</h1>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>User ID</mat-label>
          <input matInput type="number" [(ngModel)]="userId" placeholder="Enter user ID" />
        </mat-form-field>

        <button mat-raised-button color="primary" class="full-width" (click)="loadUser()">Load User</button>

        <div *ngIf="user" class="form-section">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Full Name</mat-label>
            <input matInput [(ngModel)]="user.fullName" (ngModelChange)="clearMessage()" />
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="user.email" (ngModelChange)="clearMessage()" />
          </mat-form-field>

          <button mat-raised-button color="accent" class="full-width" (click)="updateUser()" [disabled]="!user">Update User</button>
        </div>

        <p *ngIf="message" class="message">{{ message }}</p>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
      padding: 20px;
    }
    .card {
      width: 400px;
      padding: 20px;
      box-sizing: border-box;
    }
    .title {
      text-align: center;
      margin-bottom: 20px;
      font-weight: 600;
      color: #3f51b5; /* Indigo */
    }
    .full-width {
      width: 100%;
    }
    .form-section {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .message {
      margin-top: 15px;
      text-align: center;
      color: red;
      font-weight: 500;
    }
  `]
})
export class AppComponent {
  userId: number = 1;
  user: UserIdentity | null = null;
  message = '';

  constructor(private identityService: IdentityService, private snackBar: MatSnackBar) {}

  loadUser() {
    this.message = '';
    this.identityService.getUser(this.userId).subscribe({
      next: (data: UserIdentity) => {
        this.user = data;
      },
      error: () => {
        this.openSnackBar('User not Found.', 'Close');
        this.user = null;
      }
    });
  }

  updateUser() {
  if (!this.user) return;

  this.identityService.updateUser(this.user.id, {
    fullName: this.user.fullName,
    email: this.user.email
  }).subscribe({
    next: (updatedUser: UserIdentity) => {
      this.user = null;
      this.userId = 0;
      this.openSnackBar('User updated successfully!', 'Close');
    },
    error: () => {
      this.openSnackBar('Error updating user.', 'Close');
    }
  });
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 3000,               // Show for 3 seconds
    horizontalPosition: 'center', // Center horizontally
    verticalPosition: 'top'       // Position at top or you can set 'bottom'
  });
}

  clearMessage() {
    this.message = '';
  }
}
