import { Component, AfterViewInit, HostListener, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Steps, StepType, StepContent } from '../../common/shared.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    public onboardingForm!: FormGroup;
    public loading = true;
    stepOneComplete = false;
    stepTwoComplete = false;
    stepThreeComplete = false;

    // allows us to track the current step when browser back / forward is pressed
    @HostListener('window:popstate', ['$event'])
    onPopState() {
        switch (window.location.pathname) {
            case '/register':
                this.currentStepBs.next('register');
                break;
            case '/register/step-one':
                this.currentStepBs.next('stepOne');
                break;
            case '/register/step-two':
                this.currentStepBs.next('stepTwo');
                break;
            case '/register/step-three':
                this.currentStepBs.next('stepThree');
                break;
            case '/register/confirm':
                this.currentStepBs.next('confirm');
                break;
            default:
                this.currentStepBs.next('register');
        }
    }

    steps = StepContent;

    constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private route: Router) {}

    private currentStepBs: BehaviorSubject<StepType> = new BehaviorSubject<StepType>('register');
    public currentStep$: Observable<StepType> = this.currentStepBs.asObservable();

    ngOnInit(): void {
        this.onboardingForm = this.fb.group({
            stepOne: null,
            stepTwo: null,
            stepThree: null,
        });
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    changeStep(step: StepType, direction: string) {
        switch (step) {
            case 'register':
                if (direction === 'next') {
                    this.currentStepBs.next('stepOne');
                    break;
                }
                break;
            case 'stepOne':
                if (direction === 'prev') {
                    this.currentStepBs.next('register');
                    break;
                }
                if (direction === 'next') {
                    this.currentStepBs.next('stepTwo');
                    break;
                }
                break;
            case 'stepTwo':
                if (direction === 'prev') {
                    this.currentStepBs.next('stepOne');
                    break;
                }
                if (direction === 'next') {
                    this.currentStepBs.next('stepThree');
                    break;
                }
                break;
            case 'stepThree':
                if (direction === 'prev') {
                    this.currentStepBs.next('stepTwo');
                    break;
                }
                if (direction === 'next') {
                    this.currentStepBs.next('confirm');
                    break;
                }
                break;
            case 'confirm':
                if (direction === 'prev') {
                    this.currentStepBs.next('stepThree');
                    break;
                }
                break;
        }
    }

    initForm(name: string, group: FormGroup) {
        this.onboardingForm.setControl(name, group);
    }

    patchValue(key: string, form: FormGroup) {
        switch (key) {
            case 'stepOne':
                this.stepOneComplete = true;
                break;
            case 'stepTwo':
                this.stepTwoComplete = true;
                break;
            case 'stepThree':
                this.stepThreeComplete = true;
                break;
        }
        this.onboardingForm.patchValue({ [key]: form });
    }

    onSubmit() {
        // unused for now
        console.log('Submitted!');
    }
}
