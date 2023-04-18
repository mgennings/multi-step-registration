import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StepThreeComponent } from './step-three.component';
import { FormBuilder, Validators } from '@angular/forms';

describe('StepThreeComponent', () => {
    let component: StepThreeComponent;
    let fixture: ComponentFixture<StepThreeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
            declarations: [StepThreeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StepThreeComponent);
        component = fixture.componentInstance;
        component.startingForm = undefined;
        component.step = {
            title: 'Step Three',
            content: 'Step three content',
            progress: 100,
            route: '/step-three',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form', () => {
        expect(component.form).toBeDefined();
        expect(component.form.get('street')).toBeDefined();
        expect(component.form.get('unit')).toBeDefined();
        expect(component.form.get('city')).toBeDefined();
        expect(component.form.get('state')).toBeDefined();
        expect(component.form.get('zip')).toBeDefined();
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
            street: ['123 Test Street', Validators.required],
            unit: [''],
            city: ['Test City', Validators.required],
            state: ['Test State', Validators.required],
            zip: ['78702', Validators.required],
        });

        component.startingForm = startingForm;
        component.ngOnInit();
        expect(component.form).toEqual(startingForm);
    });
});
