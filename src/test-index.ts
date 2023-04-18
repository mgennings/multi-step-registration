import 'zone.js/dist/zone-testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

platformBrowserDynamicTesting();

// Add your test files here
import './app/app.component.spec';
import './app/app.module.spec';
import './app/app-routing.module.spec';
import './app/common/custom-validation.directive.spec';
import './app/components/step-one/step-one.component.spec';
import './app/components/step-two/step-two.component.spec';
import './app/components/step-three/step-three.component.spec';
import './app/pages/confirm/confirm.component.spec';
import './app/pages/register/register.component.spec';
// ...
