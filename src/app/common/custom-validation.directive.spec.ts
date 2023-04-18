import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CustomValidationDirective, forbiddenInputValidator } from './custom-validation.directive';

@Component({
    template: `
        <form>
            <input type="text" name="inputValue" [appCustomValidation]="forbiddenInput" [ngModel]="inputValue" [ngModelOptions]="{ standalone: true }" />
        </form>
    `
})
class TestComponent {
    inputValue = '';
    forbiddenInput = '';
}

describe('CustomValidationDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let inputEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [CustomValidationDirective, TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input'));
    });

    it('should create the directive', () => {
        expect(component).toBeTruthy();
    });

    it('should validate forbidden input', () => {
        component.inputValue = 'foo';
        component.forbiddenInput = 'bar';
        fixture.detectChanges();
        const directive = inputEl.injector.get(CustomValidationDirective) as CustomValidationDirective;
        const validationResult = directive.validate(new FormControl(component.inputValue));
        expect(validationResult).toEqual({ forbiddenInput: { value: 'foo' } });
      });      

    it('should not validate when forbiddenInput is falsy', () => {
        component.inputValue = 'foo';
        component.forbiddenInput = ''; // Set to an empty string (falsy value)
        fixture.detectChanges();
        const directive = inputEl.injector.get(CustomValidationDirective) as CustomValidationDirective;
        const validationResult = directive.validate(new FormControl(component.inputValue));
        expect(validationResult).toBeNull();
      });
      
    
      it('should validate matching input', () => {
        component.inputValue = 'foo';
        component.forbiddenInput = 'foo';
        fixture.detectChanges();
        const directive = inputEl.injector.get(CustomValidationDirective) as CustomValidationDirective;
        const validationResult = directive.validate(new FormControl(component.inputValue));
        expect(validationResult).toBeNull();
      });
});
