import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CustomValidationDirective, forbiddenInputValidator } from './custom-validation.directive';

@Component({
    template: `
        <form>
            <input type="text" name="inputValue" appCustomValidation [ngModel]="inputValue" [ngModelOptions]="{ standalone: true }" />
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
        component.forbiddenInput = 'bar'; // Update this line
        fixture.detectChanges();
        const directive = inputEl.injector.get(CustomValidationDirective) as CustomValidationDirective;
        const validator = forbiddenInputValidator(/bar/);
        const error = validator(new FormControl(component.inputValue));
        expect(error).toEqual({ forbiddenInput: { value: 'foo' } });
    });
    
    it('should validate matching input', () => {
        component.inputValue = 'foo';
        component.forbiddenInput = 'foo'; // Update this line
        fixture.detectChanges();
        const directive = inputEl.injector.get(CustomValidationDirective) as CustomValidationDirective;
        const validator = forbiddenInputValidator(/foo/);
        const error = validator(new FormControl(component.inputValue));
        expect(error).toBeNull();
    });
});
