import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { PostCreationDialogComponent } from './components/feed/post-creation-dialog/post-creation-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PostCommentDialogComponent } from './components/feed/post-comment-dialog/post-comment-dialog.component';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DateSortPipe } from './pipes/date-sort.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { RouteReuseStrategy } from "@angular/router";
import { CustomReuseStrategy } from "./reuse-strategy";

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostCreationDialogComponent,
    PostCommentDialogComponent,
    DateSortPipe,
    ProfileComponent
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
    MatIconModule
  ],
  providers: [
    DateSortPipe,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
