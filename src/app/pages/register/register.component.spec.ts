import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, RouterTestingModule],
            declarations: [RegisterComponent],
            providers: [FormBuilder],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an initial step of "register"', () => {
        const currentStep$ = (component as any).currentStepBs as BehaviorSubject<string>;
        expect(currentStep$.getValue()).toEqual('register');
    });

    it('should initialize onboardingForm with null values', () => {
        const onboardingForm = component.onboardingForm.value;
        expect(onboardingForm).toEqual({
            stepOne: null,
            stepTwo: null,
            stepThree: null,
        });
    });

    it('should emit the correct current step when changeStep is called', () => {
        component.currentStep$.subscribe((currentStep) => {
            expect(currentStep).toEqual('register');
        });
        component.changeStep('register', 'next');
        component.currentStep$.subscribe((currentStep) => {
            expect(currentStep).toEqual('stepOne');
        });
        component.changeStep('stepOne', 'prev');
        component.currentStep$.subscribe((currentStep) => {
            expect(currentStep).toEqual('register');
        });
    });

    it('should initialize step completion flags to false', () => {
        expect(component.stepOneComplete).toBe(false);
        expect(component.stepTwoComplete).toBe(false);
        expect(component.stepThreeComplete).toBe(false);
    });
    
    it('should not submit the form when onSubmit() is called', () => {
        jest.spyOn(console, 'log');
        component.onSubmit();
        expect(console.log).toHaveBeenCalledWith('Submitted!');
    });
    
    it('should set the control for the given form name in initForm()', () => {
        const formGroup = new FormBuilder().group({
            field: [''],
        });
        component.initForm('stepOne', formGroup);
        expect(component.onboardingForm.get('stepOne')).toBe(formGroup);
    });
    
    it('should navigate between steps in changeStep()', () => {
        const currentStep$ = (component as any).currentStepBs as BehaviorSubject<string>;
        component.changeStep('register', 'next');
        expect(currentStep$.getValue()).toEqual('stepOne');
        component.changeStep('stepOne', 'next');
        expect(currentStep$.getValue()).toEqual('stepTwo');
        component.changeStep('stepTwo', 'next');
        expect(currentStep$.getValue()).toEqual('stepThree');
        component.changeStep('stepThree', 'next');
        expect(currentStep$.getValue()).toEqual('confirm');
        component.changeStep('confirm', 'prev');
        expect(currentStep$.getValue()).toEqual('stepThree');
        component.changeStep('stepThree', 'prev');
        expect(currentStep$.getValue()).toEqual('stepTwo');
        component.changeStep('stepTwo', 'prev');
        expect(currentStep$.getValue()).toEqual('stepOne');
        component.changeStep('stepOne', 'prev');
        expect(currentStep$.getValue()).toEqual('register');
        component.changeStep('register', 'invalidDirection');
        expect(currentStep$.getValue()).toEqual('register');
    });
    

    describe('changeStep', () => {
        it('should navigate to the next step', () => {
            const currentStep$ = (component as any).currentStepBs as BehaviorSubject<string>;
            component.changeStep('register', 'next');
            expect(currentStep$.getValue()).toEqual('stepOne');
          });


          it('should navigate to the previous step', () => {
            const currentStep$ = (component as any).currentStepBs as BehaviorSubject<string>;
            component.changeStep('stepTwo', 'prev');
            expect(currentStep$.getValue()).toEqual('stepOne');
          });

        it('should not navigate if direction is not valid', () => {
            jest.spyOn(router, 'navigate');
            component.changeStep('stepTwo', 'invalidDirection');
            expect(router.navigate).not.toHaveBeenCalled();
        });
    });

    describe('initForm', () => {
        it('should set the control for the given form name', () => {
            const formGroup = new FormBuilder().group({
                field: [''],
            });
            component.initForm('stepOne', formGroup);
            expect(component.onboardingForm.get('stepOne')).toBe(formGroup);
        });
    });

    describe('patchValue', () => {
        it('should set the form value for the given key and update the corresponding completion status', () => {
            const formGroup = new FormBuilder().group({
              field: ['test'],
            });
            component.patchValue('stepOne', formGroup);
            expect(component.stepOneComplete).toBe(true);
            expect(component.onboardingForm.get('stepOne')?.value).toEqual(formGroup);
          });
    });
    
});
