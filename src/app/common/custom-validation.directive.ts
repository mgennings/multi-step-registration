import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function forbiddenInputValidator(customReg: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = customReg.test(control.value);
        return forbidden ? { forbiddenInput: { value: control.value } } : null;
    };
}

export function customMatchValidator(customReg: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passes = customReg.test(control.value);
        return passes ? null : { forbiddenInput: { value: control.value } };
    };
}

@Directive({
    selector: '[appCustomValidation]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CustomValidationDirective, multi: true }],
})
export class CustomValidationDirective implements Validator {
    @Input('appCustomValidation') forbiddenInput = '';

    validate(control: AbstractControl): ValidationErrors | null {
        return this.forbiddenInput ? forbiddenInputValidator(new RegExp(this.forbiddenInput, 'm'))(control) : null;
    }
}
