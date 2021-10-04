import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Profile } from "../../model/profile.model";
import { ProfileService } from "../../services/profile.service";
import { MatDialog } from "@angular/material/dialog";
import { ProfileCreationDialogComponent } from "./profile-creation-dialog/profile-creation-dialog.component";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ ProfileService ]
})
export class ProfileComponent implements OnInit {

  profile!: Profile;
  editEnabled = false;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private profileService: ProfileService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId') as string;
    this.editEnabled = userId === this.authService.loggedInUser?.userId;
    this.profileService.connect(userId).subscribe(
      profile => {
        if (profile) {
          this.profile = profile
        } else {
          if (this.editEnabled) {
            this.openProfileCreator();
          }
        }
      }
    );
  }

  openProfileCreator() {
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

}
