import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Converter } from './converter/converter';

export const routes: Routes = [
	{ path: '', component: Home },
	{ path: 'converter', component: Converter },
	{ path: '**', redirectTo: '' }
];
