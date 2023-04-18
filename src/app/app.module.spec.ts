import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('AppModule', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
        }).compileComponents();
    });

    it('should create the AppModule', () => {
        const appModule = TestBed.inject(AppModule);
        expect(appModule).toBeTruthy();
    });
});
