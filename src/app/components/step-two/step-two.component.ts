import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Steps } from '../../common/shared.model';

@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {
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
                email: ['', [Validators.required, Validators.email]],
                phone: ['', Validators.required],
                linkedin: [''],
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
