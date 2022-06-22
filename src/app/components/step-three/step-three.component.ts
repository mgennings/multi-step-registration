import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Steps, States, zipRegex } from '../../common/shared.model';
import { customMatchValidator } from '../../common/custom-validation.directive';

@Component({
    selector: 'app-step-three',
    templateUrl: './step-three.component.html',
    styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent implements OnInit {
    states = States;

    @Input() startingForm?: FormGroup;
    @Input() step!: Steps;

    @Output() formInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
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
                street: ['', Validators.required],
                unit: [''],
                city: ['', Validators.required],
                state: ['', Validators.required],
                zip: ['', [Validators.required, customMatchValidator(zipRegex)]],
            });
        }
        this.formInitialized.emit(this.form);
    }

    submitSubform() {
        this.formComplete.emit(this.form);
    }

    doChangeStep(direction: 'next' | 'prev') {
        this.changeStep.emit(direction);
    }
}
