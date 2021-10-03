import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Profile } from "../../model/profile.model";
import { ProfileService } from "../../services/profile.service";
import { MatDialog } from "@angular/material/dialog";
import { ProfileCreationDialogComponent } from "./profile-creation-dialog/profile-creation-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile!: Profile;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
    const userId: string = this.route.snapshot.paramMap.get('userId') as string;
    this.profileService.connect(userId).subscribe(
      profile => {
        if (profile) {
          this.profile = profile
        } else {
          this.openProfileCreator();
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
