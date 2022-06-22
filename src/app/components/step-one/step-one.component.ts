import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Steps } from '../../common/shared.model';

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
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
                name: this.fb.group({
                    first: ['', Validators.required],
                    last: ['', Validators.required],
                }),
                company: [''],
                age: ['', Validators.required],
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
