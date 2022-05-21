import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordRepeat = control.get('passwordRepeat');
  return password?.value === passwordRepeat?.value
    ? null
    : {passwordsDontMatch: true};
};
