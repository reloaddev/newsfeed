import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from "./components/feed/feed.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { AuthGuard } from "./components/auth/login/auth.guard";
import { RegisterComponent } from './components/auth/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'feed',
    canActivate: [AuthGuard],
    component: FeedComponent
  },
  {
    path: 'profile/:userId',
    canActivate: [AuthGuard],
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
