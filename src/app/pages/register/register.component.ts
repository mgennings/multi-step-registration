import { Component, AfterViewInit, HostListener, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Steps, StepType } from '../../common/shared.model';

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
                this.currentStepBs.next('step-one');
                break;
            case '/register/step-two':
                this.currentStepBs.next('step-two');
                break;
            case '/register/step-three':
                this.currentStepBs.next('step-three');
                break;
            case '/register/confirm':
                this.currentStepBs.next('confirm');
                break;
            default:
                this.currentStepBs.next('register');
        }
    }

    steps: Steps[] = [
        {
            title: 'Register',
            route: 'register',
            content: 'Begin your journey with us by entering your information.',
            progress: 0,
        },
        {
            title: 'Step 1: Basic Information',
            route: 'step-one',
            content: 'Enter your name, company, and age range below.',
            progress: 0,
        },
        {
            title: 'Step 2: Contact Information',
            route: 'step-two',
            content: 'Enter your contact information below.',
            progress: 33,
        },
        {
            title: 'Step 3: Account Information',
            route: 'step-three',
            content: 'Enter your address details below.',
            progress: 66,
        },
        {
            title: 'Complete!',
            route: 'confirm',
            content: "That's it! You're all set to go!",
            progress: 100,
        },
    ];

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
                    this.currentStepBs.next('step-one');
                    break;
                }
                break;
            case 'step-one':
                if (direction === 'prev') {
                    this.currentStepBs.next('register');
                    break;
                }
                if (direction === 'next') {
                    this.currentStepBs.next('step-two');
                    break;
                }
                break;
            case 'step-two':
                if (direction === 'prev') {
                    this.currentStepBs.next('step-one');
                    break;
                }
                if (direction === 'next') {
                    this.currentStepBs.next('step-three');
                    break;
                }
                break;
            case 'step-three':
                if (direction === 'prev') {
                    this.currentStepBs.next('step-two');
                    break;
                }
                if (direction === 'next') {
                    this.currentStepBs.next('confirm');
                    break;
                }
                break;
            case 'confirm':
                if (direction === 'prev') {
                    this.currentStepBs.next('step-three');
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
