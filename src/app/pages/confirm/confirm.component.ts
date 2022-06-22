import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Steps, States, emailRegex, phoneRegex, zipRegex } from '../../common/shared.model';
import { customMatchValidator } from '../../common/custom-validation.directive';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
    states = States;

    @Input() startingForm?: FormGroup;
    @Input() step!: Steps;

    @Output() changeStep: EventEmitter<string> = new EventEmitter();
    @Output() stepReady = new EventEmitter();
    @Output() formComplete: EventEmitter<FormGroup> = new EventEmitter();

    public form!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.stepReady.emit(true);
        if (this.startingForm) {
            this.form = this.startingForm;
        } else {
            // this will never actually be used, but it's here for reference
            this.form = this.fb.group({
                stepOne: this.fb.group({
                    name: this.fb.group({
                        first: ['', Validators.required],
                        last: ['', Validators.required],
                    }),
                    company: [''],
                    age: ['', Validators.required],
                }),
                stepTwo: this.fb.group({
                    email: ['', [Validators.required, customMatchValidator(emailRegex)]],
                    phone: ['', [Validators.required, customMatchValidator(phoneRegex)]],
                    linkedin: [''],
                }),
                stepThree: this.fb.group({
                    street: ['', Validators.required],
                    unit: [''],
                    city: ['', Validators.required],
                    state: ['', Validators.required],
                    zip: ['', [Validators.required, customMatchValidator(zipRegex)]],
                }),
            });
        }
    }

    submitForm() {
        console.log('form submitted');
        // use this output to tie in to larger application for later use
        this.formComplete.emit(this.form);
    }

    doChangeStep(direction: 'next' | 'prev') {
        this.changeStep.emit(direction);
    }
}
