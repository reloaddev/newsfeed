import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from "@angular/router";
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostCommentDialogComponent } from './components/feed/post-comment-dialog/post-comment-dialog.component';
import { PostCreationDialogComponent } from './components/feed/post-creation-dialog/post-creation-dialog.component';
import { PostUpdateDialogComponent } from './components/feed/post-update-dialog/post-update-dialog.component';
import {
  ProfileCreationDialogComponent
} from './components/profile/profile-creation-dialog/profile-creation-dialog.component';
import {
  ProfileUpdateDialogComponent
} from './components/profile/profile-update-dialog/profile-update-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DeleteDialogComponent } from './components/shared/delete-dialog/delete-dialog.component';
import { DateSortPipe } from './pipes/date-sort.pipe';
import { CustomReuseStrategy } from "./reuse-strategy";


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
        FlexModule,
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
        provideFirestore(() => getFirestore())
    ],
  providers: [
    DateSortPipe,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
