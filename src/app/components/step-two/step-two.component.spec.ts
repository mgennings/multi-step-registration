import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StepTwoComponent } from './step-two.component';
import { FormBuilder, Validators } from '@angular/forms';

describe('StepTwoComponent', () => {
    let component: StepTwoComponent;
    let fixture: ComponentFixture<StepTwoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
            declarations: [StepTwoComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StepTwoComponent);
        component = fixture.componentInstance;
        component.startingForm = undefined;
        component.step = {
            title: 'Step Two',
            content: 'Step two content',
            progress: 66,
            route: '/step-two',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form', () => {
        expect(component.form).toBeDefined();
        expect(component.form.get('email')).toBeDefined();
        expect(component.form.get('phone')).toBeDefined();
        expect(component.form.get('linkedin')).toBeDefined();
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
            email: ['test@gmail.com', Validators.required],
            phone: ['888-888-8888', Validators.required],
            linkedin: ['mgennings'],
        });

        component.startingForm = startingForm;
        component.ngOnInit();
        expect(component.form).toEqual(startingForm);
    });
});
