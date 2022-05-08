import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { PostCreationDialogComponent } from './components/feed/post-creation-dialog/post-creation-dialog.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PostCommentDialogComponent } from './components/feed/post-comment-dialog/post-comment-dialog.component';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DateSortPipe } from './pipes/date-sort.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { RouteReuseStrategy } from "@angular/router";
import { CustomReuseStrategy } from "./reuse-strategy";
import {
  ProfileCreationDialogComponent
} from './components/profile/profile-creation-dialog/profile-creation-dialog.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CookieService } from "ngx-cookie-service";
import { MatTabsModule } from "@angular/material/tabs";
import { DeleteDialogComponent } from './components/shared/delete-dialog/delete-dialog.component';
import { PostUpdateDialogComponent } from './components/feed/post-update-dialog/post-update-dialog.component';
import {
  ProfileUpdateDialogComponent
} from './components/profile/profile-update-dialog/profile-update-dialog.component';
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { RegisterComponent } from './components/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostCreationDialogComponent,
    PostCommentDialogComponent,
    DateSortPipe,
    ProfileComponent,
    ProfileCreationDialogComponent,
    LoginComponent,
    DeleteDialogComponent,
    PostUpdateDialogComponent,
    ProfileUpdateDialogComponent,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase())
    ],
  providers: [
    DateSortPipe,
    CookieService,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
