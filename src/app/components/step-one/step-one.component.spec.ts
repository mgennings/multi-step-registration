import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StepOneComponent } from './step-one.component';
import { FormBuilder, Validators } from '@angular/forms';

describe('StepOneComponent', () => {
    let component: StepOneComponent;
    let fixture: ComponentFixture<StepOneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
            declarations: [StepOneComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StepOneComponent);
        component = fixture.componentInstance;
        component.startingForm = undefined;
        component.step = {
            title: 'Step One',
            content: 'Step one content',
            progress: 33,
            route: '/step-one',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form', () => {
        expect(component.form).toBeDefined();
        expect(component.form.get('name')).toBeDefined();
        expect(component.form.get('company')).toBeDefined();
        expect(component.form.get('age')).toBeDefined();
    });

    it('should emit formInitialized on init', () => {
        const formInitializedSpy = jest.spyOn(component.formInitialized, 'emit');
        component.ngOnInit();
        expect(formInitializedSpy).toHaveBeenCalledWith(component.form);
    });

    it('should emit formComplete on submitSubform', () => {
        const formCompleteSpy = jest.spyOn(component.formComplete, 'emit');
        component.submitSubform();
        expect(formCompleteSpy).toHaveBeenCalledWith(component.form);
    });

    it('should emit changeStep on doChangeStep', () => {
        const changeStepSpy = jest.spyOn(component.changeStep, 'emit');
        component.doChangeStep('next');
        expect(changeStepSpy).toHaveBeenCalledWith('next');
    });

    it('should use startingForm when provided', () => {
        const testFormBuilder = new FormBuilder();
        const startingForm = testFormBuilder.group({
            name: testFormBuilder.group({
                first: ['John', Validators.required],
                last: ['Doe', Validators.required],
            }),
            company: ['Test Company'],
            age: ['30', Validators.required],
        });
    
        component.startingForm = startingForm;
        component.ngOnInit();
        expect(component.form).toEqual(startingForm);
    });

    it('should emit stepReady on init', () => {
        const stepReadySpy = jest.spyOn(component.stepReady, 'emit');
        component.ngOnInit();
        expect(stepReadySpy).toHaveBeenCalled();
    });
    
    
});
