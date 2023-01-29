import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    this.authService.login({
      email: this.form.value.username,
      password: this.form.value.password
    }).then(() => this.router.navigate(['/feed']))
      .catch(() => this.form.setErrors({loginFailed: true}));
  }

  async navigateToRegisterPage() {
    await this.router.navigate(['/register']);
  }
}
