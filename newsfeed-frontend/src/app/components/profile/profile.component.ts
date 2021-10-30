import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Profile } from "../../model/profile.model";
import { ProfileService } from "../../services/profile.service";
import { MatDialog } from "@angular/material/dialog";
import { ProfileCreationDialogComponent } from "./profile-creation-dialog/profile-creation-dialog.component";
import { AuthService } from "../../services/auth.service";
import { ProfileUpdateDialogComponent } from "./profile-update-dialog/profile-update-dialog.component";
import { DeleteDialogComponent } from "../shared/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  profile!: Profile;
  editEnabled = false;

  constructor(public dialog: MatDialog,
              public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId') as string;
    this.editEnabled = userId === this.authService.loggedInUser?.userId;
    this.addEventListeners();
    this.profileService.loadProfile(userId).subscribe(profile => {
      this.profile = profile
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ProfileCreationDialogComponent, {
      width: '70rem',
      height: '30rem'
    });
    dialogRef.afterClosed().subscribe((createdProfile: Profile) => {
      if (createdProfile) {
        this.profileService.createProfile(createdProfile);
      }
    });
  }

  openUpdateDialog() {
    const dialogRef = this.dialog.open(ProfileUpdateDialogComponent, {
      width: '70rem',
      height: '30rem',
      data: this.profile
    });
    dialogRef.afterClosed().subscribe((updateProfile: Profile) => {
      if (updateProfile) {
        this.profileService.updateProfile(updateProfile);
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '21rem',
      height: '9rem',
      autoFocus: false,
      data: { type: 'profile' }
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation && this.profile.userId) {
        this.profileService.deleteProfile(this.profile.userId);
      }
    });
  }

  private addEventListeners() {
    this.profileService.addCreateEventListener().subscribe(profile => {
      this.profile = profile;
    })
    this.profileService.addUpdateEventListener().subscribe(profile => {
      this.profile = profile;
    });
    this.profileService.addNotFoundEventListener().subscribe(() => {
      this.router.navigateByUrl('/feed');
    });
  }
}
