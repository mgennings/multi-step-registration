import { Component, OnInit } from '@angular/core';

export interface Steps {
    title: string;
    link: string;
    content: string;
    progress: number;
    active: boolean;
}
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
    steps: Steps[] = [
        {
            title: 'Step 1',
            link: 'step-one',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            progress: 33,
            active: true,
        },
        {
            title: 'Step 2',
            link: 'step-two',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            progress: 66,
            active: false,
        },
        {
            title: 'Step 3',
            link: 'step-three',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            progress: 100,
            active: false,
        }
    ]

    constructor() {}

    // isActive if current step is selected
    isActive(step: number) {
        console.log(step);
        return '/goto/' + step;
    }

    // isValid - check if all steps are completed
    isValid(step: number) {
        return step;
    }

    // goTo(i) - go to next or previous step when clicked
    goTo(step: number) {
        console.log(step);
        return step
    }

    ngOnInit(): void {}
}
