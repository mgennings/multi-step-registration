import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Steps, States } from '../../common/shared.model';

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
            this.form = this.fb.group({
                stepOne: this.fb.group({
                    name: this.fb.group({
                        first: ['', Validators.required],
                        last: ['', Validators.required],
                    }),
                    company: ['', Validators.required],
                    age: ['', Validators.required],
                }),
                stepTwo: this.fb.group({
                    email: ['', [Validators.required, Validators.email]],
                    phone: ['', Validators.required],
                    linkedin: [''],
                }),
                stepThree: this.fb.group({
                    street: ['', Validators.required],
                    unit: [''],
                    city: ['', Validators.required],
                    state: ['', Validators.required],
                    zip: ['', Validators.required],
                }),
            });
        }
    }

    submitForm() {
        this.formComplete.emit(this.form);
    }

    doChangeStep(direction: 'next' | 'prev') {
        this.changeStep.emit(direction);
    }
}
