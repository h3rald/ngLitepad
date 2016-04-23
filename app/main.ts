import {bootstrap} from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import {MATERIAL_BROWSER_PROVIDERS} from "ng2-material/all";
import {AppComponent} from './app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS, MATERIAL_BROWSER_PROVIDERS]);