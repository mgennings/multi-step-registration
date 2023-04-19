# MultiStepRegistration

This project is a multi-step registration form built with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5. It demonstrates best practices for creating a seamless user experience while collecting user information through multiple form sections. The project showcases form validation, custom directives, and state management in Angular without using third-party libraries or UI components.

[Preview in AWS Amplify](https://master.dupcls2wz9f8r.amplifyapp.com/ "Preview this repo here")

## Features

1. The registration form contains three steps for data entry and one final step for previewing the entered data before submission.
2. Steps:
    - **First step:** Collects personal details (name, company, age)
    - **Second step:** Collects contact details (phone, email, LinkedIn)
    - **Third step:** Collects address details (street, unit, city, state, zip)
    - **Final step:** Previews all the steps and provides the user with an option to submit if the form is valid
3. Implementation Highlights:
    - Robust validation and pattern matching for all fields
    - Autocomplete functionality for the 'state' field
    - Navigation between steps using browser back and forward buttons or previous and next buttons on the form
    - Retains previously entered values when navigating back
    - No third-party or open-source libraries (e.g., Angular Material) were used for the form fields
4. Comprehensive test suite with 100% code coverage using Jest as the testing framework


## Installation
***
If you would like to install this repo on your local machine for testing, follow these steps in Terminal (Mac user) 
```
mkdir -p ~/Developer
cd ~/Developer
git clone https://github.com/mgennings/multi-step-registration.git
cd multi-step-registration
npm install && ng serve
```
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests with Jest

The project uses [Jest](https://jestjs.io/docs/getting-started) for running unit tests and ensuring 100% code coverage. To execute the unit tests, run `npm test`. The test results will be displayed in the terminal, and a code coverage report will be generated in the [coverage/](coverage/lcov-report/index.html) directory.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
