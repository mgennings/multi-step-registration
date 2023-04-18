import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { routes } from './app-routing.module';
import { RegisterComponent } from './pages/register/register.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            providers: [FormBuilder],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Multi-Step Registration WizardBuild'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Multi-Step Registration WizardBuild');
    });
});

describe('AppRoutingModule', () => {
    let router: Router;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes)],
            declarations: [RegisterComponent, AppComponent],
            providers: [FormBuilder],
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });

    it('should redirect to "register" route when navigate to empty route', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        await router.navigate(['']);
        expect(location.path()).toBe('/register');
    });

    it('should navigate to "register" route', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        await router.navigate(['/register']);
        expect(location.path()).toBe('/register');
    });
});
