import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "./auth.service";
import { LoginStatus } from "../../model/user.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  login() {
    const status: LoginStatus = this.authService.login(this.form.value.username, this.form.value.password);
    if (status === LoginStatus.SUCCESSFUL) {
      this.router.navigateByUrl('/feed').then();
    }
  }

}
