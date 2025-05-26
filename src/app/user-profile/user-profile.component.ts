import { Component, OnInit } from '@angular/core';
import { UserIdentity, UserIdentityService } from '../services/user-identity.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user?: UserIdentity;
  isEditing = false;
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserIdentityService) { }

  ngOnInit(): void {
    this.loadUser(1);  // Load user with ID 1 as example
  }

  loadUser(id: number) {
    this.userService.getUserIdentity(id).subscribe({
      next: data => this.user = data,
      error: err => this.errorMessage = 'Error loading user profile'
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.successMessage = '';
    this.errorMessage = '';
  }

  save() {
    if (!this.user) return;

    const updateData = {
      fullName: this.user.fullName,
      email: this.user.email
    };

    this.userService.updateUserIdentity(this.user.id, updateData).subscribe({
      next: updated => {
        this.user = updated;
        this.successMessage = 'Profile updated successfully!';
        this.isEditing = false;
      },
      error: err => this.errorMessage = 'Failed to update profile'
    });
  }
}
