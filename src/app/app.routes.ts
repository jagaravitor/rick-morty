import { Routes } from '@angular/router';

export const routes: Routes = [
{
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full'  
},
{
    path: 'characters',
    loadComponent: () => import('./pages/components/character-list/character-list').then(m => m.CharacterList)
}
];