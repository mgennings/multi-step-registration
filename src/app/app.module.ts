import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import { StepThreeComponent } from './components/step-three/step-three.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';

@NgModule({
    declarations: [
        AppComponent,
        StepOneComponent,
        StepTwoComponent,
        StepThreeComponent,
        RegisterComponent,
        ConfirmComponent,
    ],
    imports: [CommonModule, BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
