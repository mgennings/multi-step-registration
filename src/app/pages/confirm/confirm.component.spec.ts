import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmComponent } from './confirm.component';
import { Steps, States, emailRegex, phoneRegex, zipRegex } from '../../common/shared.model';
import { FormBuilder, Validators } from '@angular/forms';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    component.startingForm = undefined;
    component.step = { title: 'Step', content: 'Step content', progress: 0, route: 'step' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit stepReady', () => {
    jest.spyOn(component.stepReady, 'emit');
    component.ngOnInit();
    expect(component.stepReady.emit).toHaveBeenCalledWith(true);
  });

  it('should emit formComplete when form is submitted', () => {
    jest.spyOn(component.formComplete, 'emit');
    component.submitForm();
    expect(component.formComplete.emit).toHaveBeenCalledWith(component.form);
  });

  it('should emit changeStep when doChangeStep is called', () => {
    jest.spyOn(component.changeStep, 'emit');
    component.doChangeStep('prev');
    expect(component.changeStep.emit).toHaveBeenCalledWith('prev');
  });

  it('should have valid email, phone, and zip validators', () => {
    const emailControl = component.form.get('stepTwo.email');
    const phoneControl = component.form.get('stepTwo.phone');
    const zipControl = component.form.get('stepThree.zip');

    emailControl?.setValue('test@example.com');
    phoneControl?.setValue('123-456-7890');
    zipControl?.setValue('12345');

    expect(emailControl?.errors).toBeNull();
    expect(phoneControl?.errors).toBeNull();
    expect(zipControl?.errors).toBeNull();
  });

  it('should have invalid email, phone, and zip validators', () => {
    const emailControl = component.form.get('stepTwo.email');
    const phoneControl = component.form.get('stepTwo.phone');
    const zipControl = component.form.get('stepThree.zip');

    emailControl?.setValue('invalid-email');
    phoneControl?.setValue('invalid-phone');
    zipControl?.setValue('1234');

    expect(emailControl?.errors).not.toBeNull();
    expect(phoneControl?.errors).not.toBeNull();
    expect(zipControl?.errors).not.toBeNull();
  });

  it('should have the correct number of states in the state dropdown', () => {
    const compiled = fixture.nativeElement;
    const select = compiled.querySelector('#input_state');
    expect(select.children.length).toEqual(States.length);
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
        email: ['test@gmail.com', Validators.required],
        phone: ['123-456-7890', Validators.required],
        linkedin: ['https://www.linkedin.com/in/test'],
        street: ['123 Test St'],
        unit: [''],
        city: ['Test City', Validators.required],
        state: ['TX', Validators.required],
        zip: ['12345', Validators.required],
    });

    component.startingForm = startingForm;
    component.ngOnInit();
    expect(component.form).toEqual(startingForm);
});

});
