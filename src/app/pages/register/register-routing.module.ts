import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { StepOneComponent } from '../../components/step-one/step-one.component';
import { StepTwoComponent } from '../../components/step-two/step-two.component';
import { StepThreeComponent } from '../../components/step-three/step-three.component';
import { ConfirmComponent } from '../confirm/confirm.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RegisterComponent,
                children: [
                    { path: 'step-one', component: StepOneComponent },
                    { path: 'step-two', component: StepTwoComponent },
                    { path: 'step-three', component: StepThreeComponent },
                    { path: 'confirm', component: ConfirmComponent },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class RegisterRoutingModule {}
