import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { passwordsMatchValidator } from '../../../shared/passwords-match-validator';
import { ErrorStateMatcher } from '@angular/material/core';
import { PasswordsMatchErrorStateMatcher } from '../../../shared/passwords-match-error-state-matcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  errorStateMatcher: ErrorStateMatcher = new PasswordsMatchErrorStateMatcher();

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['']
    }, {validators: passwordsMatchValidator})
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordRepeat() {
    return this.form.get('password-repeat');
  }

  register() {
    if (this.form.invalid) {
      return;
    }
    this.authService.register({
      email: this.form.value.email,
      password: this.form.value.password
    }).then(() => this.router.navigate(['/login']))
      .catch((e) => console.log(e.message));
  }

  async navigateToLoginPage() {
    await this.router.navigate(['/login']);
  }
}
