# MultiStepRegistration

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

# Details

1. This is a basic registration form containing three steps to enter data and one final step where we can preview all three steps at once
2. Steps
    * First step: collects personal details (name, company, age)
    * Second step: collects contact details (phone, email, linkedin)
    * Third step: collects address details (street, unit, city, state, zip)
    * Final step: previews all of the steps then gives user option to submit if form is valid
3. Caveats:
    - Made sure to add required validation and pattern matching for all fields
    - One of the fields has autocomplete from a list of options (state)
    - Users are able to go and back forth between each step, through the browser back and forward buttons. Also added previous and next buttons to do the same
    - When the user goes back, all the previously entered fields, should retain the values, in them.
4. **NOTE:** did not use any third-party or open-source libraries (angular material, etc) for any of the form fields.

[Preview in AWS Amplify](https://master.dupcls2wz9f8r.amplifyapp.com/ "Preview this repo here")

## Installation
***
If you would like to install this repo on your local machine for testing, do the following in Terminal (Mac user) 
```
mkdir -p ~/Developer && cd ~/Developer && git clone https://github.com/m3digital/multi-step-registration.git && cd multi-step-registration && npm install && npm start
```
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
